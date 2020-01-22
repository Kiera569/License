import React, { Component } from "react";
import {
  Route,
  Switch,
  Router,
  withRouter,
  useRouteMatch
} from "react-router-dom";
import { Layout, Menu, Icon, Form } from "antd";
import Axios from "axios";
import LicenseList from "../component/LicenseList";
import "./submit.css";

const { Header, Sider } = Layout;

class Submit extends React.Component {
  state = {
    data: [] // 渲染列表的数据
  };

  // 页面初始化  加载数据
  componentDidMount() {
    this.getData();
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  // 获取数据
  getData = () => {
    const { data: d } = this.state;
    // Axios.get("bbbbb").then(({ code, data }) => {
    //   if (code === 0) {
    //     this.setState({
    //       data: [...d, ...data]
    //     });
    //   }
    // });
  };

  handleClick = () => {
    this.props.history.push("/submit/licenseList");
  };
  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            onClick={this.handleClick}
            mode="inline"
          >
            <Menu.Item key="1">
              <span>注册文件列表</span>
            </Menu.Item>
            <Menu.Item key="2">
              <span>文件信息</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <div className="showInfo">
            <div className="right-container">
              <Switch>
                <Route
                  path="/submit/licenseList"
                  component={LicenseList}
                ></Route>
              </Switch>
            </div>
          </div>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(Submit);
