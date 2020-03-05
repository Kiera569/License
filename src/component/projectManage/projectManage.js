import React from "react";
import {
  Button,
  Table,
  Divider,
  // Popconfirm,
  Input,
  Modal,
  Form,
  InputNumber,
  // TimePicker,
  // DatePicker,
   notification,
  // Icon
  // ConfigProvider
} from "antd";
// import moment from "moment";
// import "moment/locale/zh-cn";
// import zhCN from "antd/es/locale/zh_CN";
import Axios from "axios";
import "../LicenseList/LicenseList.css";

const { Search } = Input;
// moment.locale("zh-cn");
// const dateFormat = "YYYY-MM-DD";
// const format = "HH:mm";

class ProjectManage extends React.Component {
  state = {
    collapsed: false,
    visible: false,
    isDestory:false,
    modalTitle: "",
    isAdd: true,
    inputValue: {
      consumerAmount: 1,
      consumerType: "user"
    },
    ListData: [
      // {
      //   ID:1,
      //   name: "项目一",
      //   info:'项目信息',
      //   principal:'张三',
      //   remark:'sss'
      // },
      // {
      //   ID:2,
      //   name: "项目2",
      //   info:'项目信息',
      //   principal:'张三san',
      //   remark:'ssssyyy'
      // },
    ] // 列表数据
  };

  // 页面初始化  加载数据
  componentDidMount() {
    this.getData();
  }

  // 获取数据
  getData = () => {
    console.log(11111)
    const { ListData} = this.state;
    Axios.post("http://13281031219.iask.in/project/listByPage",{
      page:0,
      pageSize:5,
    }).then(({ code, data }) => {
      if (data.code === 0) {
        this.setState({
          ListData: [...ListData, ...data.data.content]
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
    Axios.get(`http://13281031219.iask.in/project/details/${e}`).then(res=>{
      if(res.status===200){
        var arr = [];
        arr.push(res.data.data);
        this.setState({
          ListData:arr
        })
      }
    }).catch(result=>{
        notification.error({
          message: "暂时无法找到该项目",
          placement: "topRight",
          top: 50,
          duration: 2
        });
    })
  };

  // 新增
  add = val => {
    this.props.form.resetFields();
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
  // delete = key => {
  //   console.log("删除");
  //   // Axios.post("ccccc", key)
  //   //   .then((code, data) => {
  //   //     if (code === 0) {
  //   //       this.getData();
  //   //     }
  //   //   })
  //   //   .catch(res => {
  //   //     notification.error({
  //   //       message: "删除失败",
  //   //       placement: "topRight",
  //   //       top: 50,
  //   //       duration: 3
  //   //     });
  //   //   });
  // };

  // 查看当前项目授权码
  code = (record)=>{
     this.props.history.push(`/submit/licenseList/${record.id}`)
  }

  // // 确认删除
  // confirm = e => {
  //   console.log(e,89898);
  //   this.delete();
  // };

  // 确定
  handleOk = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      var subValue = JSON.stringify(values);
      if (!err) {
        if(this.state.modalTitle === '新增'){
          Axios.post("http://13281031219.iask.in/project/add", {subValue})
          .then(res => {
            if (res.status === 200) {
                notification.success({
                  message: "添加成功",
                  placement: "topRight",
                  top: 50,
                  duration: 3
                });
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
        } else if(this.state.modalTitle === '修改'){
          Axios.post("http://13281031219.iask.in/project/edit", {values})
          .then(res => {
            if (res.code === 0) {
              notification.success({
                message: res.message,
                placement: "topRight",
                top: 50,
                duration: 3
              });
              this.getData();
            }
          })
          .catch(result => {
            notification.error({
              message: '修改失败',
              placement: "topRight",
              top: 50,
              duration: 3
            });
          });
        }
        this.props.form.resetFields();
        this.setState({ visible: false });
        }
    });
    this.props.form.resetFields();
    this.setState({ visible: false });
  };

  // 取消
  handleCancel = e => {
    this.props.form.resetFields();
    this.setState({ 
      visible: false,
      inputValue:''
      });
  };

  render() {
    const { visible, modalTitle, inputValue, ListData } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: "项目ID",
        dataIndex: "id",
        key: "id"
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
              <span onClick={() => this.code(record)}>查看授权码</span>
              <Divider type="vertical" />
            <span onClick={() => this.edit(record)}>修改</span>
            {/* <Divider type="vertical" /> */}
            {/* <Popconfirm
              title="确定删除该数据"
              onConfirm={this.confirm}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
            >
              <span className="delete">删除</span>
            </Popconfirm> */}
          </span>
        )
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
              placeholder="请输入项目ID"
              onSearch={value => this.search(value)}
              id="search"
            />
          </div>
        </div>
        <Table columns={columns} dataSource={ListData} rowKey={ListData=>ListData.id}/>
        <Modal
          visible={visible}
          title={modalTitle}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
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
              {getFieldDecorator("id", {
                initialValue: inputValue.id
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
