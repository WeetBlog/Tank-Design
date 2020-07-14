import React, { Component } from 'react'
import { DownOutlined, UserOutlined, ManOutlined, WomanOutlined, MessageOutlined } from '@ant-design/icons';
import List from 'antd/es/list';
import Avatar from 'antd/es/avatar';
import Card from 'antd/es/card';
import Button from 'antd/es/button'
import Menu from 'antd/es/menu'
import Dropdown from 'antd/es/dropdown'
import Modal from 'antd/es/modal'
import Input from 'antd/es/input'
import message from 'antd/es/message'
import Popconfirm from 'antd/es/popconfirm'
import './index.css'
import { connect } from "react-redux"
import { getAllUser } from '../redux/actions.js'
import { reqAddMessageByUid, reqDeleteUserById } from '../../../api/user'

@connect(
    (state) => ({
        users: state.users
    }),
    { getAllUser }
)
class SetUser extends Component {
    state = {
        visible: false,
        people: [],
        user: {},
        newValue: ''
    };

    getAllUserInfo = async () => {
        let result = await this.props.getAllUser()
        this.setState({
            people: result
        })
    }

    componentDidMount() {
        this.getAllUserInfo()
    }

    showModal = (uid) => {
        let { people } = this.state
        let obj = people.find(item => { return item.uid === uid })
        this.setState({
            visible: true,
            user: obj
        });
    };
    // 删除用户
    confirm = async (e) => {
        reqDeleteUserById(e).then(res=>{
            if(res === "删除成功"){
                message.success('删除成功');
                this.getAllUserInfo()
            }else{
                message.error('该用户不存在');
            }
        }).catch(err=>{
            message.error(err);
        })
        
    }

    // 为用户发送一条通知
    handleOk = async e => {
        if (this.state.newValue) {
            this.setState({
                visible: false,
            });
            let result = await reqAddMessageByUid(this.state.user.uid, this.state.newValue)
            if (result === 1) {
                message.success("发送成功")
            } else {
                message.warning("发送失败")
            }
        } else {
            message.error('抱歉，不能发送空的信息');
        }

    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    // 分类查看
    handleMenuClick = (e) => {
        let { users } = this.props
        if (e.key === "1") {
            this.setState({
                people: users
            })
        } else if (e.key === "2") {
            let people = users.filter(item => { return item.usex === "boy" })
            this.setState({
                people
            })
        } else if (e.key === "3") {
            let people = users.filter(item => { return item.usex === "girl" })
            this.setState({
                people
            })
        }
    }
    render() {
        let { people, user, newValue } = this.state
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
                    dataSource={people}
                    pagination={{
                        pageSize: 10,
                    }}
                    renderItem={item => (
                        <List.Item actions={
                            [
                                <Button key="list-loadmore-edit3" onClick={() => { this.showModal(item.uid) }} icon={<MessageOutlined />} shape="round" type="primary" size="small" style={{ fontSize: "10px" }}>发送通知</Button>,
                                <Button key="list-loadmore-edit1" size="small" style={{ fontSize: "10px" }}>查看</Button>,
                                <Popconfirm
                                    placement="topLeft"
                                    title={`你确定要删除用户：${item.uname} 吗？`}
                                    onConfirm={()=>{this.confirm(item.uid)}}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button key="list-loadmore-more" type="dashed" danger size="small" style={{ fontSize: "10px" }}>删除</Button>
                                </Popconfirm>
                            ]
                        }>
                            <List.Item.Meta
                                avatar={<Avatar src={item.uimg} />}
                                title={<a href="https://ant.design">{item.uname}</a>}
                                description={item.udescription}
                            />
                        </List.Item>
                    )
                    }
                />
                < Modal
                    title={`通知：${user.uname}`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input
                        value={newValue}
                        onChange={(e) => this.setState({
                            newValue: e.target.value.trim()
                        })}
                        placeholder="编写通知内容"
                        prefix={<MessageOutlined />}
                    />
                </Modal >
            </>
        )
    }
}
export default SetUser