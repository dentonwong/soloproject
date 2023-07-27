/**
 * ************************************
 *
 * @module  Market
 * @author
 * @date
 * @description presentation component that renders a single box for each market
 *
 * ************************************
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../slice";

const CreateList = (props) => {
  const dispatch = useDispatch();
  const useInput = (init) => {
    const [value, setValue] = useState(init);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    // return the value with the onChange function instead of setValue function
    return [value, onChange];
  };

  const [sale_date, dateOnChange] = useInput("");
  const [store_name, storenameOnChange] = useInput("");
  const [item_name, itemnameOnChange] = useInput("");
  const [quantity, quantityOnChange] = useInput("");
  const [price, priceOnChange] = useInput("");
  // const [species, setSpecies] = useState(speciesData[0].name);
  // const [species_id, setSpeciesId] = useState(speciesData[0]._id);
  // const [homeworld, setHomeworld] = useState(planetsData[0].name);
  // const [homeworld_id, setHomeworldId] = useState(planetsData[0]._id);
  // const [filmSet, setFilmSet] = useState({});
  const [nameError, setNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [itemError, setItemError] = useState(null);
  // const [heightError, setHeightError] = useState(null);

  const saveList = () => {
    // check if name is empty
    if (store_name === "") {
      setNameError("required");
    }
    if (sale_date === "") {
      setDateError("Enter a Date in YYYY-MM-DD format");
    }
    if (item_name === "") {
      setItemError("required");
    }

    const body = {
      sale_date,
      store_name,
      item_name,
      quantity,
      price,
    };
    fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
      // .then(() => {
      //   props.history.push("/");
      // })
      .then(dispatch(refresh()))
      .catch((err) =>
        console.log("CreateCharacter fetch /api/character: ERROR: ", err)
      );
  };

  useEffect(() => {
    setNameError(null);
  }, [store_name]);

  useEffect(() => {
    setDateError(null);
  }, [sale_date]);

  useEffect(() => {
    setItemError(null);
  }, [item_name]);

  return (
    <section className="mainSection formBox">
      <header className="pageHeader">
        <h2>Grocery List Creator</h2>
      </header>
      <article className="card createChar">
        <h3>Enter your grocery details</h3>
        <div className="createCharFields">
          <label htmlFor="name">
            Sale Date <br />
            (YYYY-MM-DD - default today):{" "}
          </label>
          <input
            name="date"
            placeholder={new Date().toISOString().split("T")[0]}
            value={sale_date}
            onChange={dateOnChange}
          />
          {nameError ? <span className="errorMsg">{nameError}</span> : null}
        </div>
        <div className="formFields">
          <label htmlFor="store_name">Store Name: </label>
          <input
            name="store_name"
            placeholder="Albertsons"
            value={store_name}
            onChange={storenameOnChange}
          />
          {dateError ? <span className="errorMsg">{dateError}</span> : null}
        </div>
        <div className="formFields">
          <label htmlFor="item_name">Item Name: </label>
          <input
            name="store_name"
            placeholder="Apples"
            value={item_name}
            onChange={itemnameOnChange}
          />
          {itemError ? <span className="errorMsg">{itemError}</span> : null}
        </div>
        <div className="formFields">
          <label htmlFor="quantity">Quantity: </label>
          <input
            name="quantity"
            placeholder="3"
            value={quantity}
            onChange={quantityOnChange}
          />
        </div>
        <div className="formFields">
          <label htmlFor="price">Price (USD): </label>
          <input
            name="price"
            placeholder="4.00"
            value={price === null ? "" : price}
            onChange={priceOnChange}
          />
        </div>
        <div className="createCharButtonContainer">
          {/* <Link to="/" className="backLink">
            <button type="button" className="btnSecondary">
              Cancel
            </button>
          </Link> */}
          <button type="button" className="btnMain" onClick={saveList}>
            Save
          </button>
        </div>
      </article>
    </section>
  );
};

export default CreateList;
