import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh, deleteAni, getRecall } from "../slice";

const RecallList = (props) => {
  const { recall } = useSelector((state) => state.groceryList);
  const [recallDisplay, setRecallDisplay] = useState([]);
  const dispatch = useDispatch();
  let body = [];

  function recallData() {
    fetch("/api/recall")
      .then((res) => res.json())
      .then((text) => {
        body = text;
        console.log(body);
        return dispatch(getRecall(body));
      })
      .catch((err) => console.log("fetch: ERROR: ", err));
  }
  useEffect(recallData, []);
  useEffect(() => {
    const newArr = [];
    for (let i in recall) {
      newArr.push(
        <div key={i} className="recallEntry">
          <h3>
            Seriousness: <u>{recall[i].class}</u>
          </h3>

          <p>
            <span className="recallentrydetails">
              <strong>Company: </strong>
              {`${recall[i].company}`}
              <br />
            </span>
            <br />
            <span className="recallentrydetails">
              <strong>Description: </strong>
              {`${recall[i].desc}`}
              <br />
            </span>
            <br />
            <span className="recallentrydetails">
              <strong>Reason for Recall: </strong>
              {` ${recall[i].reason}`}
              <br />
            </span>
            <br />
            <span className="recallentrydetails">
              <strong>Status: </strong>
              {`${recall[i].status}`}
              <br />
            </span>
            <br />
            <span className="recallentrydetails">
              <strong>Voluntary or Mandated?: </strong>
              {` ${recall[i].voluntary}`}
            </span>
          </p>
        </div>
      );
    }
    setRecallDisplay(newArr);
    console.log("recall text", recall);
  }, [recall]);
  console.log("recalldisplay", recallDisplay);
  return (
    <div id="recallcontainer">
      <h2>Recall List </h2>
      <a href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts">
        Please visit the FDA site for further details and pictures.
      </a>
      {recall.length > 0 && recallDisplay}
    </div>
  );
};
export default RecallList;
