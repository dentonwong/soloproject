/**
 * ************************************
 *
 * @module  MarketsDisplay
 * @author
 * @date
 * @description presentation component that renders n Market components
 *
 * ************************************
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../slice";
import FoodList from "./FoodList";

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
      <h4>Grocery Lists</h4>
      {entries.length > 0 && <FoodList entries={entries} />}
      {/* <div className="allMarkets">
        {props.marketList.map((market, idx) => marketMaker(market, idx, props))}
      </div> */}
    </div>
  );
};

// import Market from './Market';

// const percentOfTotal = (cardCount, total) => (
//  cardCount ? ((cardCount / total) * 100).toFixed(2) : 0);

// const marketMaker = (market, idx, props) => (
//   <Market
//     {...market}
//     key={idx}
//     percentage={percentOfTotal(market.cards, props.totalCards)}
//     index={idx}
//     addCard={() => props.addCard(idx)}
//     deleteCard={() => props.deleteCard(idx)}
//   />
// );

// const MarketsDisplay = props => (
//   <div className="displayBox">
//     <h4>Markets</h4>
//     <div className="allMarkets">
//       {props.marketList.map((market, idx) => marketMaker(market, idx, props))}
//     </div>
//   </div>
// );

export default ListDisplay;

// export { percentOfTotal };
