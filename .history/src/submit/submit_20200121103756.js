import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Button } from "antd";
import Axios from "axios";
import LicenseList from "../component/LicenseList";
import routes from "../router";
import "./submit.css";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

class Submit extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 111);
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
    Axios.get("/license/getServerInfos").then(({ code, data }) => {
      if (code === 0) {
        this.setState({
          data: [...d, ...data]
        });
      }
    });
  };
  e;

  handleClick = e => {
    // console.log(e);
    // this.props.history.push("/submit/licenseList");
  };

  // 跳转
  goThird = (e, type, needLogin) => {
    const { history } = this.props;
    if (needLogin && !sessionStorage.getItem("isLogin")) {
      history.push("/login");
      return false;
    }
    if (type === "push") {
      history.push(e);
    }
    return false;
  };

  // 退出登录
  exist = () => {
    sessionStorage.setItem("isLogin", "");
    this.props.history.push("/login");
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
            <SubMenu key="sub1" title={<span>服务授权证书</span>}>
              <Menu.Item
                key="1"
                onClick={() => {
                  this.goThird("/submit/licenseList", "push");
                }}
              >
                授权管理
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  this.goThird("/submit/userManage", "push");
                }}
              >
                项目管理
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  this.goThird("/submit/projectManage", "push");
                }}
              >
                用户管理
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: 0
            }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <Button onClick={this.exist} className="exist-login">
              退出登录
            </Button>
          </Header>
          <div className="right-container">
            {this.props.children}
            <Switch>
              <Route path="/submit/licenseList" component={LicenseList}></Route>

              <Route path="/submit/licenseList" component={LicenseList}></Route>

              {/* {routes.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  render={props => (
                    <Route.Component {...props} routes={route.routes} />
                  )}
                ></Route>
              ))} */}
            </Switch>
          </div>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(Submit);
