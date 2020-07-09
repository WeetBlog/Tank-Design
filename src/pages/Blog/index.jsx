import React, { Component } from 'react'
import Table from 'antd/es/table';
import Button from 'antd/es/button';
import './index.css'
import {
    EditOutlined,DeleteOutlined
  } from '@ant-design/icons';
export default class Blog extends Component {

    render() {
        const columns = [
            {
                title: '博客日期',
                width: 100,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
            },

            {
                title: '博客标题',
                dataIndex: 'address',
                key: '3',
                fixed: 'left',
                width: 400,
            },

            { title: '博客描述', dataIndex: 'address', key: '8' },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 200,
                align: "center",
                render: () => (
                    <>
                        <Button type="primary" className="blog-button" size="small" icon={<EditOutlined />}>
                           修改
                        </Button>
                        <Button type="danger"  size="small" icon={<DeleteOutlined />}>
                          删除
                        </Button>
                    </>
                ),
            },

        ];

        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
            });
        }

        return (
            <>
                <Table columns={columns} dataSource={data} scroll={{ x: 1350 }} />
            </>
        )
    }
}
