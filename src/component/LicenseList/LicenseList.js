import React from "react";
import {
  Button,
  Table,
  Divider,
  Popconfirm,
  Select,
  Input,
  Modal,
  Form,
  InputNumber,
  DatePicker,
  notification
} from "antd";
import moment from "moment";
import Axios from "axios";
import "./LicenseList.css";

const { Search } = Input;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD HH:mm";

class LicenseList extends React.Component {
  state = {
    collapsed: false,
    visible: false,
    modalTitle: "",
    isAdd: true,
    inputValue: {
      // consumerAmount: 1,
      // consumerType: "user"
      ipCheck:"true",
      macCheck:"true",
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
    Axios.get("/license/list/1").then(({ code, data }) => {
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

  // // 修改
  // edit = value => {
  //   this.setState({
  //     visible: true,
  //     isAdd: false,
  //     modalTitle: "修改",
  //     inputValue: value
  //   });
  // };

  // // 删除当前记录
  // delete = key => {
  //   Axios.post("ccccc", key)
  //     .then((code, data) => {
  //       if (code === 0) {
  //         this.getData();
  //       }
  //     })
  //     .catch(res => {
  //       notification.error({
  //         message: "删除失败",
  //         placement: "topRight",
  //         top: 50,
  //         duration: 3
  //       });
  //     });
  // };

  // // 确认删除
  // confirm = e => {
  //   this.delete();
  // };

  // 确定
  handleOk = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Axios.post("/license/add", values)
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
        title: "CPU序列号",
        dataIndex: "cpuSerial",
        key: "cpuSerial"
      },
      {
        title: "描述信息（服务器名称）",
        dataIndex: "description",
        key: "description"
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
        title: "IP地址",
        dataIndex: "ipAddress",
        key: "ipAddress"
      },

      {
        title: "授权码文件地址",
        dataIndex: "licenseUrl",
        key: "licenseUrl"
      },

      {
        title: "mac地址",
        dataIndex: "macAddress",
        key: "macAddress"
      },
      {
        title: "主板序列号",
        dataIndex: "mainBoardSerial",
        key: "mainBoardSerial"
      },

      {
        title: "所属项目",
        dataIndex: "projectId",
        key: "projectId"
      },
      // {
      //   title: "操作",
      //   key: "action",
      //   render: (text, record) => (
      //     <span className="operate">
      //       <span onClick={() => this.edit(record)}>修改</span>
      //       <Divider type="vertical" />
      //       <Popconfirm
      //         title="确定删除该数据"
      //         onConfirm={this.confirm}
      //         onCancel={this.handleCancel}
      //         okText="确认"
      //         cancelText="取消"
      //       >
      //         <span className="delete">删除</span>
      //       </Popconfirm>
      //     </span>
      //   )
      // }
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
            <form method="get" action="http(s)://下载文件的后台接口">
              <Button type="primary" shape="round" icon="download">
                下载
              </Button>
            </form>
          </div>
        </div>
        <Table columns={columns} dataSource={ListData} />
        <Modal
        className='modals'
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
              {/* 所属项目 --必填*/}
              <Form.Item label="所属项目">
              {getFieldDecorator("projectId ", {
                rules: [
                  {
                    required: true,
                    message: "该项不能为空!"
                  }
                ],
                initialValue: inputValue.projectId 
              })(<InputNumber min={0} />)}
            </Form.Item>
            {/*  序列号*/}
            <Form.Item label="cpu序列号">
              {getFieldDecorator("cpuSerial", {
                initialValue: inputValue.cpuSerial
              })(<Input />)}
            </Form.Item>
            {/* ipCheck--必填（boolelan) */}
            <Form.Item label="是否开启ip">
             {getFieldDecorator('ipCheck', {
               rules: [
                {
                  required: true,
                  message: "该信息不能为空!"
                }
            ],
            initialValue: inputValue.ipCheck
          })(
            <Select >
              <Option value="true">开启</Option>
              <Option value="false">关闭</Option>
            </Select>,
          )}
        </Form.Item>
            {/* 授权码文件地址licenseUrl  */}
            <Form.Item label="授权码文件地址">
              {getFieldDecorator("licenseUrl", {
                initialValue: inputValue.licenseUrl
              })(<Input />)}
            </Form.Item>
            {/* mac地址--必填 */}
            <Form.Item label="mac地址">
              {getFieldDecorator("macAddress", {
                initialValue: inputValue.macAddress
              })(<Input />)}
            </Form.Item>
            {/* macCheck */}
            <Form.Item label="是否开启mac">
          {getFieldDecorator('macCheck', {
            initialValue: inputValue.macCheck
          })(
            <Select>
              <Option value="true">开启</Option>
              <Option value="false">关闭</Option>
            </Select>
          )}
        </Form.Item>
            {/* IPAddress--必填 */}
            <Form.Item label="可被允许的IP地址">
              {getFieldDecorator("ipAddress", {
                rules: [
                  {
                    required: true,
                    message: "该项不能为空!"
                  }
                ],
                initialValue: inputValue.ipAddress
              })(<Input />)}
            </Form.Item>
            {/* 主板序列号 mainBoardSerial  */}
            <Form.Item label="cpu序列号">
              {getFieldDecorator("cpuSerial", {
                initialValue: inputValue.cpuSerial
              })(<Input />)}
            </Form.Item>
            {/* 失效时间--必填 */}
            <Form.Item label="证书失效时间">
              {getFieldDecorator("expiryTime", {
                rules: [
                  {
                    required: true,
                    message: "该项不能为空!"
                  }
                ],
                initialValue: moment(inputValue.expiryTime)
              })(<DatePicker format={dateFormat} />)}
            </Form.Item>
            {/* 生效时间--必填 */}
            <Form.Item label="证书生效时间">
              {getFieldDecorator("issuedTime", {
                rules: [
                  {
                    required: true,
                    message: "该项不能为空!"
                  }
                ],
                initialValue: moment(inputValue.issuedTime)
              })(<DatePicker format={dateFormat} />)}
            </Form.Item>
             {/* 描述信息--必填 */}
             <Form.Item label="描述信息">
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true,
                    message: "该项不能为空!"
                  }
                ],
                initialValue: inputValue.description
              })(<Input.TextArea rows={4} placeholder="一般为服务器名称" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create({ name: "normal_licenseList" })(LicenseList);
