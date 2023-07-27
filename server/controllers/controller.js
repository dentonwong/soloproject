const db = require("../pools/pools");
const fetch = require("node-fetch");
//const cache = require('memory-cache');

const controller = {};

controller.getFoodInfo = (req, res, next) => {
  // write code here
  const sqlStr =
    "SELECT item_id, DATE(sale_date) as sale_date, store_name, item_name, quantity, price FROM grocery_items ORDER BY sale_date asc;";
  db.query(sqlStr)
    .then((data) => (res.locals.foodInfo = data.rows))
    .then(() => next())
    .catch((err) => {
      return next({
        log: `controller.getFoodInfo ERROR: ${err}`,
        message: { err: "controller.getFoodInfo query fail" },
      });
    });
};

controller.postFoodInfo = (req, res, next) => {
  // write code here
  console.log(req.body);
  const { sale_date, store_name, item_name, quantity, price } = req.body;
  const sqlStr =
    "INSERT INTO grocery_items (sale_date, store_name, item_name, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  db.query(sqlStr, [sale_date, store_name, item_name, quantity, price])
    .then((data) => (res.locals.postFoodInfo = data.rows[0]))
    .then(() => next())
    .catch((err) => {
      return next({
        log: `controller.postFoodInfo ERROR: ${err}`,
        message: { err: "controller.postFoodInfo query fail" },
      });
    });
};

controller.putFoodInfo = (req, res, next) => {
  // write code here
  console.log(req.body);
  const filter = req.params.filter.split(",");
  console.log(filter);
  //req.params.ids.split(',')
  const { sale_date, store_name, item_name, quantity, price } = req.body;
  const sqlStr =
    "UPDATE grocery_items SET sale_date = $1, store_name = $2, item_name = $3, quantity = $4, price = $5 WHERE sale_date = $6 AND store_name = $7 AND item_name = $8 RETURNING *";
  db.query(sqlStr, [
    sale_date,
    store_name,
    item_name,
    quantity,
    price,
    filter[0],
    filter[1],
    filter[2],
  ])
    //.then(data => res.locals.putFoodInfo = data.rows[0])
    .then((data) => {
      if (data.rows.length === 0)
        return next({
          log: `controller.postFoodInfo ERROR`,
          message: {
            err: "controller.postFoodInfo. Query failed. Check whether the sale date, store name, and item name exist in the database",
          },
        });
      return (res.locals.putFoodInfo = data.rows[0]);
    })
    .then(() => next())
    .catch((err) => {
      return next({
        log: `controller.putFoodInfo ERROR: ${err}`,
        message: { err: "controller.putFoodInfo query fail" },
      });
    });
};

controller.delFoodInfo = (req, res, next) => {
  const filter = req.params.filter.split(",");
  console.log(filter);
  const sqlStr =
    "DELETE FROM grocery_items WHERE sale_date = $1 AND store_name = $2 AND item_name = $3 RETURNING *";
  db.query(sqlStr, [filter[0], filter[1], filter[2]])
    .then((data) => (res.locals.deleted = data.rows[0]))
    .then(() => next())
    .catch((err) => {
      return next({
        log: `controller.delFoodInfo ERROR: ${err}`,
        message: { err: "controller.delFoodInfo query fail" },
      });
    });
};

controller.recallFoodInfo = (req, res, next) => {
  // write code here
  // const filter = req.params.filter.split(",");
  // let newStr = filter.join("");
  const sqlStr =
    "SELECT DISTINCT ARRAY_AGG (item_name ORDER By item_name asc) FROM grocery_items;";
  db.query(sqlStr)
    .then((data) => {
      const concatSearch = data.rows[0].array_agg.join("+OR+");
      const today = new Date();
      const todayDate = today.toISOString().split("T")[0];
      const adjustedDay = new Date(today);
      adjustedDay.setDate(today.getDate() - 180);
      const adjustedDate = adjustedDay.toISOString().split("T")[0];
      console.log(adjustedDate);
      fetch(
        `https://api.fda.gov/food/enforcement.json?search=product_description:(${concatSearch})+AND+distribution_pattern:(%22CA%22+OR+%22California%22)+AND+report_date:[${adjustedDate}+TO+${todayDate}]&limit=50&sort=report_date:desc`
      )
        .then((fdaData) => fdaData.json())
        .then((parsedData) => {
          const arrOfFDA = [];
          for (const obj of parsedData.results) {
            arrOfFDA.push({
              status: obj.status,
              class: obj.classification,
              company: obj.recalling_firm,
              voluntary: obj.voluntary_mandated,
              desc: obj.product_description,
              reason: obj.reason_for_recall,
              code_info: obj.code_info,
            });
          }
          res.locals.recallFoodInfo = arrOfFDA;
          // console.log(res.locals.recallFoodInfo)
        })
        .then(() => next())
        // .then((data)=> {
        //   res.locals.characterData = data;
        //   return next();
        // })
        .catch((err) => {
          return next({
            log: `fetch problem controller.recallFoodInfo: ${err}`,
            message: { err: "fetch problem controller.recallFoodInfo" },
          });
        });
    })
    .catch((err) => {
      return next({
        log: `controller.recallFoodInfo ERROR: ${err}`,
        message: { err: "controller.recallFoodInfo query fail" },
      });
    });
};

module.exports = controller;
