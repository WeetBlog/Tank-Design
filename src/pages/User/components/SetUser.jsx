import React, { Component } from 'react'
import { DownOutlined, UserOutlined, ManOutlined, WomanOutlined, MessageOutlined } from '@ant-design/icons';
import List from 'antd/es/list';
import Avatar from 'antd/es/avatar';
import Card from 'antd/es/card';
import Button from 'antd/es/button'
import Menu from 'antd/es/menu'
import Dropdown from 'antd/es/dropdown'
import Modal from 'antd/es/modal'
import './index.css'

export default class SetUser extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleMenuClick = (e) => {
        console.log(e)
    }
    render() {
        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
        ];
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" icon={<UserOutlined />}>查看所有</Menu.Item>
                <Menu.Item key="2" className="boy" icon={<WomanOutlined />}>只看男生</Menu.Item>
                <Menu.Item key="3" className="girl" icon={<ManOutlined />}>只看女生</Menu.Item>
            </Menu>
        );
        return (
            <>
                <Card size="small" align="right" className="userChoice">
                    <Dropdown overlay={menu}>
                        <Button>
                            分类查看 <DownOutlined />
                        </Button>
                    </Dropdown>
                </Card>
                <List
                    className="List"
                    itemLayout="horizontal"
                    dataSource={data}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    renderItem={item => (
                        <List.Item actions={
                            [
                                <Button key="list-loadmore-edit3" onClick={this.showModal} icon={<MessageOutlined />} shape="round" type="primary" size="small" style={{ fontSize: "10px" }}>发送通知</Button>,
                                <Button key="list-loadmore-edit1" size="small" style={{ fontSize: "10px" }}>查看</Button>,
                                <Button key="list-loadmore-more" type="dashed" danger size="small" style={{ fontSize: "10px" }}>删除</Button>
                            ]
                        }>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        )
    }
}
