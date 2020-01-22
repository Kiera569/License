import React from "react";
import {
  Layout,
  Menu,
  Icon,
  Form,
  Input,
  Select,
  TextArea,
  Button,
  InputNumber,
  Table,
  Divider,
  Tag,
  Modal
} from "antd";
import "./submit.css";

const { Header, Sider } = Layout;

export default class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  state = {
    collapsed: false,
    visible: false,
    modalTitle: "新增",
    isAdd: true
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
  add() {
    this.setState({ visible: true, isAdd: true, modalTitle: "新增" });
  }
  handleCancel = () => {
    this.setState({ visible: false });

  };
  handleEdit = () => {
    const value = 
      // Axios.post("aaaaa", values)
        //   .then(res => {
        //     if (res === "success") {
        //       sessionStorage.setItem("isLogin", true);
        //       this.props.history.push("/submit");
        //     }
        //   })
        //   .catch(result => {
        //     notification.error({
        //       message: "登录失败",
        //       placement: "topRight",
        //       top: 50,
        //       duration: 3
        //     });
        //   });
    this.setState({ visible: false });
  };

  edit(value) {
    this.setState({ visible: true, isAdd: false, modalTitle: "修改" });
  }
  // 删除当前记录
  delete = ({ key }) => {
    console.log(key);
  };

  render() {
    const columns = [
      {
        title: "CPU序列号",
        dataIndex: "index",
        key: "index",
        render: text => <a>{text}</a>
      },
      {
        title: "IP地址",
        dataIndex: "ipAddress",
        key: "ipAddress"
      },
      {
        title: "mac地址",
        dataIndex: "macAddress",
        key: "address"
      },
      {
        title: "主板序列号",
        key: "mainIndex",
        dataIndex: "mainIndex"
        // render: mainIndex => (
        //   <span>
        //     {mainIndex.map(mainIndex => {
        //       let color = tag.length > 5 ? "geekblue" : "green";
        //       if (tag === "loser") {
        //         color = "volcano";
        //       }
        //       return (
        //         <Tag color={color} key={tag}>
        //           {tag.toUpperCase()}
        //         </Tag>
        //       );
        //     })}
        //   </span>
        // )
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a>查看</a>
            <Divider type="vertical" />
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
        index: "Joindexhn Brown",
        ipAddress: "192.164.3.21",
        macAddress: "255.255.255.0",
        mainIndex: 21
      },
      {
        key: "2",
        index: "Jim Green",
        ipAddress: "192.164.3.21",
        macAddress: "255.255.255.0",
        mainIndex: 22
      }
    ];
    const Add = props => {
      return (
        <Button type="primary" onClick={this.handleAdd}>
          确定
        </Button>
      );
    };
    const Edit = props => {
      return (
        <div>
          <Button type="primary" onClick={() => this.handleCancel()}>
            取消
          </Button>
          <Button type="primary" onClick={() => this.handleEdit()}>
            确定
          </Button>
        </div>
      );
    };
    const { visible, modalTitle } = this.state;
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
            <Button
              type="primary"
              className="add"
              onClick={this.add.bind(this)}
            >
              新增
            </Button>

            <Table columns={columns} dataSource={data} />
          </div>
        </Layout>
        <Modal
          visible={visible}
          title={modalTitle}
          onCancel={this.handleCancel}
          footer={this.isAdd ? <Add /> : <Edit />}
        >
          <Form {...this.formItemLayout}>
            <Form.Item label="用户数量" validateStatus="warning">
              <InputNumber
                min={0}
                defaultValue={1}
                placeholder="user"
                onChange={this.onChange}
                id="warning"
              />
            </Form.Item>
            <Form.Item label="用户类型">
              <Input defaultValue="user" id="warning" />
            </Form.Item>
            <Form.Item label="描述信息">
              <Input.TextArea rows={4} />
              <Input placeholder="一般为服务器名称" id="warning" />
            </Form.Item>
            <Form.Item label="证书失效时间">
              <Input id="warning" />
            </Form.Item>
            <Form.Item label="证书生效时间">
              <Input id="warning" />
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    );
  }
}
