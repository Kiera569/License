import React from "react";
import { Menu, Icon, Switch } from "antd";
import "./submit.css";

export default class Submit extends React.Component {
  render() {
    return (
      <div className="submitBox">
        <Menu
          style={{
            width: 185,
            height: 600,
            backgroundColor: "fff"
          }}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1">第一项</Menu.Item>
          <Menu.Item key="2">第一项</Menu.Item>
          <Menu.Item key="3">第一项</Menu.Item>
          <Menu.Item key="4">第一项</Menu.Item>
          <Menu.Item key="5">第一项</Menu.Item>
          <Menu.Item key="6">第一项</Menu.Item>
        </Menu>
      </div>
    );
  }
}
