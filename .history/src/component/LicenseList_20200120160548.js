import React from "react";
import {
  Button,
  Table,
  Divider,
  Popconfirm,
  Input,
  Modal,
  Form,
  InputNumber,
  TimePicker,
  DatePicker,
  notification,
  Icon
  // ConfigProvider
} from "antd";
import moment from "moment";
// import "moment/locale/zh-cn";
// import zhCN from "antd/es/locale/zh_CN";
import Axios from "axios";
import "./LicenseList.css";

const { Search } = Input;
// moment.locale("zh-cn");
const dateFormat = "YYYY-MM-DD";
// const format = "HH:mm";

class LicenseList extends React.Component {
  state = {
    collapsed: false,
    visible: false,
    modalTitle: "",
    isAdd: true,
    inputValue: {
      consumerAmount: 1,
      consumerType: "user"
    },
    ListData: [] // 列表数据
  };

  // 页面初始化  加载数据
  componentDidMount() {
    this.getData();
  }

  // 获取数据
  getData = () => {
    const { data: d } = this.state;
    Axios.get("/license/getServerInfos").then(({ code, data }) => {
      if (code === 0) {
        this.setState({
          ListData: [...d, ...data]
        });
      }
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

  // 搜索
  search = e => {
    var html = "";
    var value = "";
    // 将输入的字符串与列表data匹配，若包含 则显示搜索内容
    value = this.ListData.find(item => {
      return item === e;
    });
    // 有结果
    if (!!value) {
      html += `
              <div>
              <ul>
              <li className='showSearch'>+${value}</li></ul>
              </div>
             `;
    } else {
      html += '<div class="no-data">暂时无法找到此选项~</div>';
    }
    document.querySelector(".search").html(html);
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
              this.props.form.resetFields();
              this.setState({ visible: false });
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
    });
  };

  // 取消
  handleCancel = e => {
    this.props.form.resetFields();
    this.setState({ visible: false });
  };

  render() {
    const { visible, modalTitle, inputValue, ListData } = this.state;
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
        key: 1,
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
        key: 2,
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
      <div>
        <div className="action">
          <Button type="primary" className="add" onClick={this.add}>
            新增
          </Button>
          <div className="search">
            <Search
              placeholder="请输入关键字"
              onSearch={value => this.search(value)}
            />
            {/* <Button className="download">
              <Icon type="down-circle" theme="twoTone" />
              下载
            </Button> */}
            <Button shape="circle" icon="search"></Button>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
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
                    required: true,
                    message: "该选项为必填项"
                  }
                ],
                initialValue: inputValue.consumerAmount
              })(<InputNumber min={0} />)}
            </Form.Item>
            <Form.Item label="用户类型">
              {getFieldDecorator("consumerType", {
                rules: [
                  {
                    required: true,
                    message: "该选项为必填项"
                  }
                ],
                initialValue: inputValue.consumerType
              })(<Input />)}
            </Form.Item>
            <Form.Item label="描述信息">
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true,
                    message: "该信息不能为空!"
                  }
                ],
                initialValue: inputValue.description
              })(<Input.TextArea rows={4} placeholder="一般为服务器名称" />)}
            </Form.Item>
            <Form.Item label="校验信息">
              {getFieldDecorator("licenseCheck", {
                rules: [
                  {
                    required: true,
                    message: "该信息不能为空!"
                  }
                ],
                initialValue: inputValue.licenseCheck
              })(<Input.TextArea rows={4} placeholder="服务器硬件校验信息" />)}
            </Form.Item>
            <Form.Item label="证书生效时间">
              {getFieldDecorator("issuedTime", {
                rules: [
                  {
                    required: true,
                    message: "时间不能为空!"
                  }
                ],
                initialValue: moment(inputValue.issuedTime)
              })(
                // <div className="time-box">
                // {/* <ConfigProvider locale={zhCN}> */}
                <DatePicker format={dateFormat} />
                // {/* <TimePicker
                //   defaultValue={moment("00:00", format)}
                //   format={format}
                //   style={{ marginLeft: "10px" }}
                // // /> */}
                // {/* </ConfigProvider> */}
                // {/* </div> */}
              )}
            </Form.Item>
            <Form.Item label="证书失效时间">
              {getFieldDecorator("expiryTime", {
                rules: [
                  {
                    required: true,
                    message: "时间不能为空!"
                  }
                ],
                initialValue: moment(inputValue.expiryTime)
              })(<DatePicker format={dateFormat} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create({ name: "normal_submit" })(LicenseList);
