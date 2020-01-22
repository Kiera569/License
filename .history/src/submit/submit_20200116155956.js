import React from "react";
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
  DatePicker
} from "antd";
import Axios from "axios";
import moment from "moment";
import "moment/locale/zh-cn";
import "./submit.css";

const { Header, Sider } = Layout;
const dateFormat = "YYYY/MM/DD";
moment.locale("zh-cn");

class Submit extends React.Component {
  state = {
    collapsed: false,
    visible: false,
    modalTitle: "新增",
    isAdd: true,
    data: [],
    inputValue: {
      key: 1,
      user: "user"
    }
  };

  // 页面初始化  加载数据
  componentDidMount(){
    this.getData()
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

  // onChange = value => {
  //   console.log("changed", value);
  // };

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
    console.log(key);
  };

  // 确定
  handleOk = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Axios.post("aaaaa", values)
          .then(res => {
            if (res.status === 200) {
              this.setState({ visible: false });
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
    window.Get("bbbbb").then(({ code, data }) => {
      if (code === 0) {
        this.setState({
          data: [...d, ...data]
        });
      }
    });
  };

  render() {
    const { visible, modalTitle, inputValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: "CPU序列号",
        dataIndex: "key",
        key: "key"
        // render: text => <a>{text}</a>
      },
      {
        title: "用户名",
        dataIndex: "user",
        key: "user"
      },
      {
        title: "描述",
        dataIndex: "describe",
        key: "describe"
      },

      {
        title: "证书生效时间",
        dataIndex: "inTime",
        key: "inTime"
      },
      {
        title: "证书失效时间",
        dataIndex: "outTime",
        key: "outTime"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a onClick={() => this.edit(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除</a>
          </span>
        )
      }
    ];
    const data = [
      {
        key: "1",
        user: "Joindexhn Brown",
        describe: "1111111",
        outTime: "2019.2.3",
        inTime: "2012.2.6"
      },
      {
        key: "2",
        user: "Jim Green",
        describe: "bbbbbb",
        outTime: "2036.2.3",
        inTime: "2015.2.1"
      }
    ];

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
          <div className="showInfo">
            <Button type="primary" className="add" onClick={this.add}>
              新增
            </Button>
            <Table columns={columns} dataSource={data} />
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
              {getFieldDecorator("key", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: inputValue.key
              })(<InputNumber min={0} />)}
            </Form.Item>
            <Form.Item label="用户类型">
              {getFieldDecorator("user", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: inputValue.user
              })(<Input />)}
            </Form.Item>
            <Form.Item label="描述信息">
              {getFieldDecorator("describe", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: inputValue.describe
              })(<Input.TextArea rows={4} placeholder="一般为服务器名称" />)}
            </Form.Item>
            <Form.Item label="证书生效时间">
              {getFieldDecorator("outTime", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: moment(inputValue.outTime)
              })(<DatePicker format={dateFormat} />)}
            </Form.Item>
            <Form.Item label="证书失效时间">
              {getFieldDecorator("inTime", {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: moment(inputValue.inTime)
              })(<DatePicker format={dateFormat} />)}
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    );
  }
}
export default Form.create({ name: "normal_submit" })(Submit);
