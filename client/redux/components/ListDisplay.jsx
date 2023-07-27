import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../slice";
import FoodList from "./FoodList";
import DeleteList from "./DeleteList";

const ListDisplay = (props) => {
  const { entries, update } = useSelector((state) => state.groceryList);
  const dispatch = useDispatch();
  useEffect(() => {
    // When the component mounts, dispatch the getList action to fetch data
    fetch("/api/")
      .then((res) => res.json())
      .then((text) => {
        // if (!Array.isArray(characters)) characters = [];
        // return this.setState({
        //   characters,
        //   fetchedChars: true,
        // });
        return dispatch(getList(text));
      })
      .catch((err) => console.log("fetch: ERROR: ", err));
  }, [update]);
  // useEffect(() => {
  //   console.log(entries);
  // }, [entries]);

  return (
    <div className="displayBox">
      {entries.length > 0 && <FoodList entries={entries} />}
    </div>
  );
};

export default ListDisplay;
