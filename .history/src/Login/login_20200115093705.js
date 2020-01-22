import React from "react";
import { Form, Input, Icon, Button, Checkbox, Result } from "antd";
import "./login.css";
import Axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (values) {
        //   Axios.post("aaaaa", values)
        //     .then(res => {
        //       if (res === "success") {
        //         this.props.history.push("/submit");
        //       }
        //     })
        //     .catch(result => {
        //       // alert("登录失败，请重新登录");

        //     });

        return (
          <Result
            icon={<Icon type="smile" theme="twoTone" />}
            title="Great, we have done all the operations!"
            extra={<Button type="primary">Next</Button>}
          />
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
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
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
