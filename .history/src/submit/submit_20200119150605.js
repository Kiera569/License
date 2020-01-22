import React, { Component } from "react";
import { Route, Switch, Router, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Form } from "antd";
import Axios from "axios";
import LicenseList from "../component/LicenseList";
import "./submit.css";

const { Header, Sider } = Layout;

class Submit extends React.Component {
  constructor(props) {
    super(props);
  }

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
    console.log(this.props, 111);
    this.props.history.push("/Submit/LicenseList");
  };
  render() {
    console.log(this.props);
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            onClick={this.handleClick}
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">
              <span>注册文件列表</span>
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
          <div className="showIn
              </Switch>
            </div>
          </div>
        </Layout>fo">
            <div className="right-container">
              <Switch>
                <Route path="/Submit/LicenseList" component={LicenseList}>
                  <LicenseList />
                </Route>
      </Layout>
    );
  }
}
export default withRouter(Submit);
