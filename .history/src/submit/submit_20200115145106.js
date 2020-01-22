import React from "react";
import { Menu, Icon, Button } from "antd";
import { Dropdown, message } from 'antd';
import "./submit.css";


export default class Submit extends React.Component {
 onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
  menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd memu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  render() {
    
    <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      Hover me, Click menu item <Icon type="down" />
    </a>
  </Dropdown>,
  }
}
