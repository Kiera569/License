import React from "react";
import {Button,Search,Table} from 'antd'

export default class LicenseList extends React.Component {
  render() {
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
      </div>
    );
  }
}
