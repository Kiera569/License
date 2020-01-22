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
  DatePicker,
  Popconfirm
} from "antd";
import Axios from "axios";
import moment from "moment";
import "moment/locale/zh-cn";
import "./submit.css";

const { Search } = Input;
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
    console.log(e);
    // 点击对应菜单 搜索过滤列表中该地区的数据

    // 重新赋值给列表的data  渲染列表
  };
  render() {
    const { visible, modalTitle, inputValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: "项目ID",
        dataIndex: "programId",
        key: "programId"
      },
      {
        title: "项目名称",
        dataIndex: "programName",
        key: "programName"
      },
      {
        title: "用户名",
        dataIndex: "consumerType",
        key: "consumerType"
      },
      {
        title: "用户数量",
        dataIndex: "consumerAmount",
        key: "consumerAmount"
      },

      {
        title: "mac地址",
        dataIndex: "macAddress",
        key: "macAddress"
      },
      {
        title: "项目归属地",
        dataIndex: "proAddress",
        key: "proAddress"
      },

      {
        title: "描述(服务器名称)",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "校验信息",
        dataIndex: "licenseCheck",
        key: "licenseCheck"
      },

      {
        title: "证书生效时间",
        dataIndex: "issuedTime",
        key: "issuedTime"
      },
      {
        title: "证书失效时间",
        dataIndex: "expiryTime",
        key: "expiryTime"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a onClick={() => this.edit(record)} href="#">
              修改
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除该数据"
              onConfirm={this.confirm}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    const data = [
      {
        programId: 1,
        programName: "项目一",
        consumerAmount: 5,
        consumerType: "Joindexhn Brown",
        macAddress: "255.255.255.3",
        proAddress: "成都",
        description: "1111111",
        licenseCheck: "xxxxx",
        expiryTime: "2020-01-17",
        issuedTime: "2020-01-14"
      },
      {
        programId: 2,
        programName: "项目二",
        consumerAmount: 6,
        consumerType: "Jim Green",
        macAddress: "255.255.255.3",
        proAddress: "西昌",
        description: "bbbbbb",
        licenseCheck: "ttttttttt",
        expiryTime: "2020-01-17",
        issuedTime: "2020-01-12"
      }
    ];

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
              <span>成都</span>
            </Menu.Item>
            <Menu.Item key="2">
              <span>重庆</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span>西昌</span>
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
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              // style={{ width: 220 ,marginLeft:20}}
            />
          </Header>
          <div className="showInfo">
            <Button type="primary" className="add" onClick={this.add}>
              新增
            </Button>

            <Table
              rowkey={data.consumerAmount}
              columns={columns}
              dataSource={data}
            />
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
