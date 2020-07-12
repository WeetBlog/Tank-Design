import React, { Component } from 'react'
import './home.css'
import Menu from 'antd/es/menu';
import { CoffeeOutlined, UserSwitchOutlined, CommentOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import { connect } from "react-redux"
import { getUserInfo } from '../../redux/actions/user'

import PubSub from 'pubsub-js'

const { SubMenu } = Menu;

@connect(
    (state) => ({}),
    { getUserInfo }
)
class home extends Component {

    componentDidMount() {
        this.props.getUserInfo(sessionStorage.getItem("token"))
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        // openKeys: ['sub1'],
        openKeys: [],
    };


    toRouter = (route) => {
        PubSub.publish('changeComponent', route)
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };



    render() {
        return (
            <>
                <Menu
                    className="home"
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 256 }}
                >
                    <div className="titleLogo" onClick={() => this.toRouter({
                        address: "/backend",
                        componentName: {
                            firstName: "数据统计",
                            secondName: "",
                            lastName: "",
                        }
                    })}>
                        <img src={logo} style={{ width: 256 }} alt="logo" />
                    </div>
                    <SubMenu className="mailTitle"
                        key="sub1"
                        title={
                            <span>
                                <UserSwitchOutlined />
                                <span>用户管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1" onClick={() => this.toRouter({
                            address: "/user/setuser",
                            componentName: {
                                firstName: "用户管理",
                                secondName: "查看用户",
                                lastName: "",
                            }
                        })}>查看用户</Menu.Item>
                        <Menu.Item key="2" onClick={() => this.toRouter({
                            address: "/user/notice",
                            componentName: {
                                firstName: "用户管理",
                                secondName: "发布公告",
                                lastName: "",
                            }
                        })}>发布公告</Menu.Item>
                    </SubMenu>
                    <SubMenu className="mailTitle" key="sub2" icon={<CoffeeOutlined />} title="博客管理">
                        <Menu.Item key="5">所有博客</Menu.Item>
                        <Menu.Item key="6">分类管理</Menu.Item>
                        <Menu.Item key="4">新增博客</Menu.Item>
                    </SubMenu>
                    <SubMenu className="mailTitle" key="sub4" icon={<CommentOutlined />} title="记录管理">
                        <Menu.Item key="9">评论管理</Menu.Item>
                        <Menu.Item key="7">新增记录</Menu.Item>
                        <Menu.Item key="8">记录管理</Menu.Item>
                    </SubMenu>
                </Menu>

            </>
        );
    }
}
export default home
