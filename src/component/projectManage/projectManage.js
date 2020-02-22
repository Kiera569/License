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
import "../LicenseList/LicenseList.css";

const { Search } = Input;
// moment.locale("zh-cn");
const dateFormat = "YYYY-MM-DD";
// const format = "HH:mm";

class ProjectManage extends React.Component {
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
  // search = e => {
  //   var html = "";
  //   var value = "";
  //   // 将输入的字符串与列表data匹配，若包含 则显示搜索内容
  //   value = this.ListData.find(item => {
  //     return item === e;
  //   });
  //   // 有结果
  //   if (!!value) {
  //     html += `
  //             <div>
  //             <ul>
  //             <li className='showSearch'>+${value}</li></ul>
  //             </div>
  //            `;
  //   } else {
  //     html += '<div class="no-data">暂时无法找到此选项~</div>';
  //   }
  //   document.querySelector(".search").html(html);
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
        Axios.post("/project/add", values)
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
        dataIndex: "ID",
        key: "ID"
      },
      {
        title: "项目名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "项目信息",
        dataIndex: "info",
        key: "info"
      },
      {
        title: "负责人",
        dataIndex: "principal",
        key: "principal"
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span className="operate">
            <span onClick={() => this.edit(record)}>修改</span>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除该数据"
              onConfirm={this.confirm}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
            >
              <span className="delete">删除</span>
            </Popconfirm>
          </span>
        )
      }
    ];
    const data = [
      {
        ID:1,
        name: "项目一",
        info:'项目信息',
        principal:'张三',
        remark:'sss'
      },
      {
        ID:2,
        name: "项目2",
        info:'项目信息',
        principal:'张三san',
        remark:'ssssyyy'
      },
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
          {/* 项目ID */}
          <Form.Item label="项目ID">
              {getFieldDecorator("ID", {
                initialValue: inputValue.ID
              })(<InputNumber min={0} />)}
               </Form.Item>
          {/* 项目信息 */}
          <Form.Item label="项目信息">
              {getFieldDecorator("info", {
              
                initialValue: inputValue.info 
              })(<Input.TextArea rows={4} />)}
            </Form.Item>
          {/* 名称 */}
          <Form.Item label="项目名称">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "该选项为必填项"
                  }
                ],
                initialValue: inputValue.name 
              })(<Input />)}
            </Form.Item>
          {/* 负责人 */}
          <Form.Item label="项目负责人">
              {getFieldDecorator("principal", {
                initialValue: inputValue.principal  
              })(<Input />)}
            </Form.Item>
          {/* 备注 */}
          <Form.Item label="备注">
              {getFieldDecorator("remark ", {
                initialValue: inputValue.remark  
              })(<Input.TextArea rows={4} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create({ name: "normal_projectManage" })(ProjectManage);
