import React from "react";
import { Menu, Icon, Dropdown, Descriptions, Badge } from "antd";
import "./submit.css";

export default class Submit extends React.Component {
  onClick = ({ key }) => {
    console.log(key);
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
      // <div>
        <div className="submitBox">
          <Dropdown overlay={this.menu}>
            <a className="ant-dropdown-link" href="#">
              菜单 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        {/* <div className="submit-content">
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Product">
              Cloud Database
            </Descriptions.Item>
            <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
            <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
            <Descriptions.Item label="Order time">
              2018-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Usage Time" span={2}>
              2019-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="Negotiated Amount">
              $80.00
            </Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official Receipts">
              $60.00
            </Descriptions.Item>
            <Descriptions.Item label="Config Info">
              Data disk type: MongoDB
              <br />
              Database version: 3.4
              <br />
              Package: dds.mongo.mid
              <br />
              Storage space: 10 GB
              <br />
              Replication factor: 3
              <br />
              Region: East China 1<br />
            </Descriptions.Item>
          </Descriptions>
          ,
        </div>
      </div> */}
    );
  }
}
