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
              

              <Form.Item label="Warning" validateStatus="warning">
                <Input placeholder="Warning" id="warning" />
              </Form.Item>

             

             

              <Form.Item label="Warning" hasFeedback validateStatus="warning">
                <Input placeholder="Warning" id="warning2" />
              </Form.Item>


             


              <Form.Item
                label="Validating"
                hasFeedback
                validateStatus="validating"
                help="The information is being validated..."
              >
                <Cascader defaultValue={["1"]} options={[]} />
              </Form.Item>

              <Form.Item label="inline" style={{ marginBottom: 0 }}>
                <Form.Item
                  validateStatus="error"
                  help="Please select the correct date"
                  style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                >
                  <DatePicker />
                </Form.Item>
                <span
                  style={{
                    display: "inline-block",
                    width: "24px",
                    textAlign: "center"
                  }}
                >
                  -
                </span>
                <Form.Item
                  style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                >
                  <DatePicker />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Success" hasFeedback validateStatus="success">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Success" hasFeedback validateStatus="success">
                <Input allowClear placeholder="with allowClear" />
              </Form.Item>

              <Form.Item label="Warning" hasFeedback validateStatus="warning">
                <Input.Password placeholder="with input password" />
              </Form.Item>

              <Form.Item label="Error" hasFeedback validateStatus="error">
                <Input.Password
                  allowClear
                  placeholder="with input password and allowClear"
                />
              </Form.Item>
            </Form>
            ,
          </div>
        </Layout>
      </Layout>
    );
  }
}
