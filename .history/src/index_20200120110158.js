import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Router from "./router";

ReactDOM.render(
  <ConfigProvider locale={zhCN} csp="code">
<Router />,
</ConfigProvider>
document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
