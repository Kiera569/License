import React from "react";
import Axios from "axios";
import { Form, Input, Icon, Button, notification } from "antd";
import "./login.css";

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        sessionStorage.setItem("isLogin", true);
        this.props.history.push("/submit");
        Axios.post("h't192.168.1.55:8091/sysUser/login", values)
          .then(res => {
            console.log(res, 22222);
            if (res === "success") {
              sessionStorage.setItem("isLogin", true);
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
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginBox">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入账号!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入账号"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create({ name: "normal_login" })(Login);
