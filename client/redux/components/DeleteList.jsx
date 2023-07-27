import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh, deleteAni } from "../slice";

const DeleteList = ({ setHighlight }) => {
  const { selected } = useSelector((state) => state.groceryList);
  const dispatch = useDispatch();
  let body = {};
  useEffect(() => {
    if (selected[0] !== undefined) {
      body = {
        sale_date: new Date(selected[1]).toISOString().split("T")[0],
        store_name: selected[0].store_name,
        item_name: selected[0].item_name,
      };
    }
  }, [selected]);

  function deleter() {
    dispatch(deleteAni(selected[2]));
    const fetchAdd = `/api/${body.sale_date},${body.store_name},${body.item_name}`;
    fetch(fetchAdd, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("deleted info", data);
      })
      .then(() => {
        // Introduce a delay of 500 milliseconds (adjust the duration as needed)
        const delayDuration = 500;
        setTimeout(() => {
          dispatch(refresh());
        }, delayDuration);
      })
      .then(() => setHighlight(""))
      // .then(() => {
      //   props.history.push("/");
      // })
      .catch((err) =>
        console.log("Delete List fetch /api/:filter: ERROR: ", err)
      );
  }
  return (
    <button
      type="button"
      className="btnSecondary"
      onClick={() => (body.sale_date ? deleter() : "")}
    >
      Delete
    </button>
  );
};
export default DeleteList;
