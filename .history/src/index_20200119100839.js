import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Router from "./router";
import LicenseList from "./component/LicenseList";

ReactDOM.render(<Router />, document.getElementById("root"));
ReactDOM.render(<LicenseList />, document.getElementById("licenseModel"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
