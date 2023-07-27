import React from "react";
import { render } from "react-dom";
//import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import styles from "./stylesheets/styles.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// uncomment so that webpack can bundle styles
//import styles from './scss/application.scss';
