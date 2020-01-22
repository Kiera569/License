import React from "react";
import { Menu, Icon, Button } from "antd";
import { Dropdown, message } from "antd";
import "./submit.css";

export default class Submit extends React.Component {
 state = {
    subStatus:0
  }
  onClick = ({ key }) => {
    console.log(key);
    this.setState(){
      subStatus:key,
    }
     
    
    // message.info(`Click on item ${key}`);
  };

  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key="1">第一项</Menu.Item>
      <Menu.Item key="2">第二项</Menu.Item>
      <Menu.Item key="3">第三项</Menu.Item>
    </Menu>
  );
  render() {
    return (
      <div>
        <div className="submitBox">
          <Dropdown overlay={this.menu}>
            <a className="ant-dropdown-link" href="#">
              菜单 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div className="submit-content"></div>
      </div>
    );
  }
}
