import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Layout,
  Menu,
  Icon,
  Form,
  Input,
  Button,
  InputNumber,
  Table,
  Divider,
  Modal,
  notification,
  DatePicker,
  Popconfirm
} from "antd";
import Axios from "axios";
import moment from "moment";
import "moment/locale/zh-cn";
import LicenseList from "../component/LicenseList";
import "./submit.css";

const { Header, Sider } = Layout;
const dateFormat = "YYYY-MM-DD HH:mm";
moment.locale("zh-cn");

class Submit extends React.Component {
  state = {
    collapsed: false,
    visible: false,
    modalTitle: "",
    isAdd: true,
    data: [], // 渲染列表的数据
    inputValue: {
      consumerAmount: 1,
      consumerType: "user"
    }
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

  // 新增
  add = val => {
    this.setState({ visible: true, isAdd: true, modalTitle: "新增" });
  };

  // 修改
  edit = value => {
    this.setState({
      visible: true,
      isAdd: false,
      modalTitle: "修改",
      inputValue: value
    });
  };

  // 删除当前记录
  delete = key => {
    Axios.post("ccccc", key)
      .then((code, data) => {
        if (code === 0) {
          this.getData();
        }
      })
      .catch(res => {
        notification.error({
          message: "删除失败",
          placement: "topRight",
          top: 50,
          duration: 3
        });
      });
  };

  // 确认删除
  confirm = e => {
    this.delete();
  };

  // 确定
  handleOk = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Axios.post("/license/generateLicense", values)
          .then(res => {
            if (res.status === 200) {
              this.getData();
            }
          })
          .catch(result => {
            notification.error({
              message: "添加失败",
              placement: "topRight",
              top: 50,
              duration: 3
            });
          });
      }
      this.setState({ visible: false });
      this.props.form.resetFields();
    });
  };

  // 取消
  handleCancel = e => {
    this.props.form.resetFields();
    this.setState({ visible: false });
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

  // 根据地点选择展示项目信息
  handleClick = e => {
    console.log(this.props, 111);
    this.props.history.push("/licenseList");
    console.log(e);
    // 点击对应菜单 搜索过滤列表中该地区的数据

    // 重新赋值给列表的data  渲染列表
  };
  render() {
    const { visible, modalTitle, inputValue } = this.state;
    const { getFieldDecorator } = this.props.form;

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
            {/* <Menu.Item key="2">
              <span>重庆</span>
            </Menu.Item> */}
            {/* <Menu.Item key="3">
              <span>西昌</span>
            </Menu.Item> */}
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
                <Route exact path="/licenseList" component={LicenseList} />
              </Switch>
            </div>
          </div>
        </Layout>
        <Modal
          visible={visible}
          title={modalTitle}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="reset" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确定
            </Button>
          ]}
        >
          <Form
            {...this.formItemLayout}
            labelAlign="left"
            onSubmit={this.handleOk}
          >
            <Form.Item label="用户数量" validateStatus="warning">
              {getFieldDecorator("consumerAmount", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: inputValue.consumerAmount
              })(<InputNumber min={0} />)}
            </Form.Item>
            <Form.Item label="用户类型">
              {getFieldDecorator("consumerType", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: inputValue.consumerType
              })(<Input />)}
            </Form.Item>
            <Form.Item label="描述信息">
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: inputValue.description
              })(<Input.TextArea rows={4} placeholder="一般为服务器名称" />)}
            </Form.Item>
            <Form.Item label="校验信息">
              {getFieldDecorator("licenseCheck", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: inputValue.licenseCheck
              })(<Input.TextArea rows={4} placeholder="服务器硬件校验信息" />)}
            </Form.Item>
            <Form.Item label="证书生效时间">
              {getFieldDecorator("issuedTime", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: moment(inputValue.issuedTime)
              })(<DatePicker format={dateFormat} />)}
            </Form.Item>
            <Form.Item label="证书失效时间">
              {getFieldDecorator("expiryTime", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: moment(inputValue.expiryTime)
              })(<DatePicker format={dateFormat} />)}
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    );
  }
}
export default Form.create({ name: "normal_submit" })(Submit);
