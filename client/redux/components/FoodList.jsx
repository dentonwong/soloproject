/**
 * ************************************
 *
 * @module  FoodList
 * @author
 * @date
 * @description Simple presentation component that shows a bold label next to plain text
 *
 * ************************************
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FoodList = ({ entries }) => {
  console.log(new Date(entries[0].sale_date).toDateString());
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
  //store_name: 'Gourmet Grocers', item_name: 'Cheese', quantity: 2, price: '8.90'
  console.log(groupedByDate);
  const sorted = Object.keys(groupedByDate).sort((a, b) => a - b);
  console.log(sorted);
  for (let y of sorted) {
    for (let i in groupedByDate[y]) {
      outputArr.push(
        <div className="entry">
          <p>Date: {y}</p>
          <p>{`store_name: ${groupedByDate[y][i].store_name}, item_name: ${groupedByDate[y][i].item_name}, quantity: ${groupedByDate[y][i].quantity}, price: ${groupedByDate[y][i].price}`}</p>
        </div>
      );
    }
  }

  return outputArr;
};

export default FoodList;
