import React, { Component} from 'react'
import './home.css'
import Menu from 'antd/es/menu';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png'


const { SubMenu } = Menu;
export default class home extends Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };
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
                    <div>
                        <img src={logo} style={{ width: 256 }} alt="" />
                    </div>
                    <SubMenu className="mailTitle"
                        key="sub1"
                        title={
                            <span>
                                <MailOutlined/>
                                <span>权限管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">用户管理</Menu.Item>
                        <Menu.Item key="2">添加角色</Menu.Item>
                        <Menu.Item key="3">用户动态</Menu.Item>
                    </SubMenu>
                    <SubMenu className="mailTitle" key="sub2" icon={<AppstoreOutlined />} title="博客管理">
                        <Menu.Item key="5">所有博客</Menu.Item>
                        <Menu.Item key="6">分类管理</Menu.Item>
                        <Menu.Item key="4">新增博客</Menu.Item>
                    </SubMenu>
                    <SubMenu className="mailTitle" key="sub4" icon={<SettingOutlined />} title="记录管理">
                        <Menu.Item key="9">评论管理</Menu.Item>
                        <Menu.Item key="7">新增记录</Menu.Item>
                        <Menu.Item key="8">记录管理</Menu.Item>
                    </SubMenu>
                </Menu>
                
            </>
        );
    }
}
