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
    return [value, onChange, setValue];
  };

  const [sale_date, dateOnChange, setDate] = useInput("");
  const [store_name, storenameOnChange, setStoreName] = useInput("");
  const [item_name, itemnameOnChange, setItem] = useInput("");
  const [quantity, quantityOnChange, setQuantity] = useInput("");
  const [price, priceOnChange, setPrice] = useInput("");
  const [nameError, setNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [itemError, setItemError] = useState(null);

  const saveList = () => {
    // check if name is empty

    if (store_name === "" || store_name === "-") {
      setNameError("required");
    }
    if (sale_date === "") {
      setDateError("Enter a Date in YYYY-MM-DD format");
    }
    if (item_name === "" || item_name === "-") {
      setItemError("required");
    }

    const body = {
      sale_date,
      store_name,
      item_name,
      quantity,
      price,
    };
    if (body.store_name === "-") return;
    fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("posting info", data);
      })
      .then(() => {
        setStoreName("-");
        setDate(new Date().toISOString().split("T")[0]);
        setItem("-");
        setQuantity("-");
        setPrice("-");
      })
      .then(() => dispatch(refresh()))
      // .then(() => {
      //   props.history.push("/");
      // })
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
      <header className="pageHeader"></header>
      <article className="formFrame createList">
        <h3>Enter your grocery details</h3>
        <div className="formFields">
          <label htmlFor="sale_date">Sale Date:&nbsp;&nbsp;</label>
          <input
            name="date"
            placeholder={new Date().toISOString().split("T")[0]}
            value={sale_date}
            onChange={dateOnChange}
          />
          {dateError ? <span className="errorMsg">{dateError}</span> : null}
        </div>
        <div className="formFields">
          <label htmlFor="store_name">Store Name:&nbsp;&nbsp;</label>
          <input
            name="store_name"
            placeholder="Albertsons"
            value={store_name}
            onChange={storenameOnChange}
          />
          {nameError ? <span className="errorMsg">{nameError}</span> : null}
        </div>
        <div className="formFields">
          <label htmlFor="item_name">Item Name:&nbsp;&nbsp;</label>
          <input
            name="store_name"
            placeholder="Apples"
            value={item_name}
            onChange={itemnameOnChange}
          />
          {itemError ? <span className="errorMsg">{itemError}</span> : null}
        </div>
        <div className="formFields">
          <label htmlFor="quantity">Quantity:&nbsp;&nbsp;</label>
          <input
            name="quantity"
            placeholder="3"
            value={quantity}
            onChange={quantityOnChange}
          />
        </div>
        <div className="formFields">
          <label htmlFor="price">Price ($USD.00):&nbsp;&nbsp;</label>
          <input
            name="price"
            placeholder="4.00"
            value={price === null ? "" : price}
            onChange={priceOnChange}
          />
        </div>
        <div className="createCharButtonContainer">
          <button type="button" className="btnMain" onClick={saveList}>
            Save
          </button>
        </div>
      </article>
    </section>
  );
};

export default CreateList;
