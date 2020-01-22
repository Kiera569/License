import React from "react";
import Axios from "axios";
import { Form, Input, Icon, Button, Checkbox, notification } from "antd";
import "./login.css";

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Axios.post("aaaaa", values)
          .then(res => {
            if (res === "success") {
              this.props.history.push("/submit");
            }
          })
          .catch(result => {
            notification.error({
              message: "登录失败",
              placement: "topRight",
              top: 50,
              duration: 3
            });
          });
      }
      // else {
      //   notification.error({
      //     message: "登录失败",
      //     placement: "topRight",
      //     top: 50,
      //     duration: 3
      //   });
      // }
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
              placeholder="请输入您的账号"
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
              placeholder="请输入密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {/* {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot">Forgot password</a> */}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: "normal_login" })(Login);
