import React from "react";
import { Button, Table, Divider, Popconfirm, Input,Modal,  Form,
 
  Button,
  InputNumber,
  Table,
  Divider,
  Modal,
  notification,
  DatePicker,
  Popconfirm } from "antd";

const { Search } = Input;
export default class LicenseList extends React.Component {
  render() {
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
      <div>
        <Button type="primary" className="add" onClick={this.add}>
          新增
        </Button>
        <Search
          placeholder="请输入关键字"
          onSearch={value => console.log(value)}
        />
        <Table
          rowkey={data.consumerAmount}
          columns={columns}
          dataSource={data}
        />
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
      </div>
    );
  }
}
