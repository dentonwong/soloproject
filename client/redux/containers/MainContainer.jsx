/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders TotalsDisplay and MarketsContainer
 *
 * ************************************
 */

import React from "react";
import ListDisplay from "../components/ListDisplay";
import RecallList from "../components/RecallList";

//import { connect } from "react-redux";
//import TotalsDisplay from "../components/TotalsDisplay";
//import MarketsContainer from "./MarketsContainer";
//import * as actions from "../actions/actions";
import CreateList from "../components/createList";
import DeleteList from "../components/DeleteList";

// const mapStateToProps = ({
//   markets: { totalCards, totalMarkets, synced },
// }) => ({
//   totalCards,
//   totalMarkets,
//   synced,
// });

// const mapDispatchToProps = dispatch => ({
//   syncMarkets: () => dispatch(actions.syncMarkets()),
// });

const MainContainer = (props) => (
  <div className="container">
    <div className="outerBox">
      <ListDisplay />
      <CreateList />
      <RecallList />
    </div>
  </div>
);

export default MainContainer;
