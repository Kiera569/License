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
  Tag
} from "antd";
import "./submit.css";

const { Header, Sider } = Layout;

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
            <a>修改</a>
            <Divider type="vertical" />
            <a>删除</a>
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
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Button type="primary">新增</Button>

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
          {/* <div>      编辑
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
                {/* <Input placeholder="一般为服务器名称" id="warning" /> */}
          {/* </Form.Item>
              <Form.Item label="证书失效时间">
                <Input id="warning" />
              </Form.Item>
              <Form.Item label="证书生效时间">
                <Input id="warning" />
              </Form.Item>
            </Form>
            <Button type="primary" className="submit">
              提交
            </Button>
          </div> */}
          <div className="showInfo">
            <Table columns={columns} dataSource={data} />
          </div>
        </Layout>
      </Layout>
    );
  }
}
