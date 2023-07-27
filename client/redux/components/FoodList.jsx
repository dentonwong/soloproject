import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selector } from "../slice";
import DeleteList from "../components/DeleteList";

const FoodList = ({ entries }, props) => {
  const dispatch = useDispatch();
  const { isDelete } = useSelector((state) => state.groceryList);
  const [highlight, setHighlight] = useState(null);
  const groupedByDate = {};
  const outputArr = [];
  for (let x = 0; x < entries.length; x++) {
    if (groupedByDate[new Date(entries[x].sale_date).toDateString()]) {
      groupedByDate[new Date(entries[x].sale_date).toDateString()].push({
        store_name: entries[x].store_name,
        item_name: entries[x].item_name,
        quantity: entries[x].quantity,
        price: entries[x].price,
      });
    } else {
      groupedByDate[new Date(entries[x].sale_date).toDateString()] = [
        {
          store_name: entries[x].store_name,
          item_name: entries[x].item_name,
          quantity: entries[x].quantity,
          price: entries[x].price,
        },
      ];
    }
  }

  function handleClick(index, box) {
    setHighlight(index);
    dispatch(selector(box));
  }

  const sorted = Object.keys(groupedByDate).sort((a, b) => a - b);
  console.log(sorted);
  for (let y of sorted) {
    for (let i in groupedByDate[y]) {
      let currentItem = groupedByDate[y][i];
      outputArr.push(
        <div
          key={`${y}-${i}`}
          className={`entry ${highlight === `${y}-${i}` ? "highlighted" : ""} ${
            isDelete === `${y}-${i}` ? "fade-out" : ""
          }`}
          onClick={() =>
            handleClick(`${y}-${i}`, [currentItem, y, `${y}-${i}`])
          }
        >
          <h3>
            Date: <u>{y}</u>
          </h3>

          <p>
            <span className="entrydetails">
              <strong>Store Name: </strong>
              {`${currentItem.store_name}`}
            </span>{" "}
            <span className="entrydetails">
              <strong>Item Name: </strong>
              {`${currentItem.item_name}`}
            </span>{" "}
            <span className="entrydetails">
              <strong>Quantity: </strong>
              {` ${currentItem.quantity}`}
            </span>{" "}
            <span className="entrydetails">
              <strong>Price per item: </strong>
              {`$${groupedByDate[y][i].price}`}
            </span>
          </p>
        </div>
      );
    }
  }

  return (
    <>
      {outputArr}
      <DeleteList setHighlight={setHighlight} />
    </>
  );
};

export default FoodList;
