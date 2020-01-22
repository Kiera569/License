import React from "react";
import Axios from "axios";
import { Form, Input, Icon, Button, Checkbox, notification } from "antd";
import "./login.css";

class Login extends React.Component {
  openNotification = () => {
    notification.open({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values.username);
      if (values.username === 1111) {
        this.props.history.push("/submit");
        //   Axios.post("aaaaa", values)
        //     .then(res => {
        //       if (res === "success") {
        //         this.props.history.push("/submit");
        //       }
        //     })
        //     .catch(result => {
        //       // alert("登录失败，请重新登录");
        //     });
      } else {
        return (
          <Button type="primary" onClick={this.openNotification}>
            Open the notification box
          </Button>
        );
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入您的账号!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot">Forgot password</a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: "normal_login" })(Login);
