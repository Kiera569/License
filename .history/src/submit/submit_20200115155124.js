import React from "react";
import { Menu, Icon, Switch } from "antd";
import "./submit.css";

const { SubMenu } = Menu;
export default class Submit extends React.Component {
  state = {
    mode: "inline",
    theme: "light"
  };

  render() {
    return (
      <div>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode={this.state.mode}
          theme={this.state.theme}
        >
          <Menu.Item key="1">Navigation One</Menu.Item>
          <Menu.Item key="2">Navigation Two</Menu.Item>
          <Menu.Item key="3">Navigation Two</Menu.Item>
          <Menu.Item key="4">Navigation Two</Menu.Item>
          <Menu.Item key="5">Navigation Two</Menu.Item>
          <Menu.Item key="6">Navigation Two</Menu.Item>
        </Menu>
      </div>
    );
  }
}
