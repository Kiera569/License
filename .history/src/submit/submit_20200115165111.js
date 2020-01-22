import React from "react";
import {
  Layout,
  Menu,
  Icon,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber
} from "antd";
import "./submit.css";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

export default class Submit extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  };
  onChange = value => {
    console.log("changed", value);
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              {/* <Icon type="user" /> */}
              <span>第一项</span>
            </Menu.Item>
            <Menu.Item key="2">
              {/* <Icon type="video-camera" /> */}
              <span>第一项</span>
            </Menu.Item>
            <Menu.Item key="3">
              {/* <Icon type="upload" /> */}
              <span>第一项</span>
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
          <div>
            <Form {...this.formItemLayout}>
              <InputNumber
                min={0}
                max={10}
                step={1}
                onChange={this.onChange}
              />
              <Form.Item label="Warning" validateStatus="warning">
                <Input placeholder="Warning" id="warning" />
              </Form.Item>
              <Form.Item label="Warning" validateStatus="warning">
                <Input placeholder="Warning" id="warning" />
              </Form.Item>
              <Form.Item label="Warning" validateStatus="warning">
                <Input placeholder="Warning" id="warning" />
              </Form.Item>
              <Form.Item label="Warning" validateStatus="warning">
                <Input placeholder="Warning" id="warning" />
              </Form.Item>
              <Form.Item label="Warning" validateStatus="warning">
                <Input placeholder="Warning" id="warning" />
              </Form.Item>
              <Form.Item label="Warning" validateStatus="warning">
                <Input placeholder="Warning" id="warning" />
              </Form.Item>
            </Form>
            ,
          </div>
        </Layout>
      </Layout>
    );
  }
}
