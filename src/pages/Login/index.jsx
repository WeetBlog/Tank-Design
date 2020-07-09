import React, { Component } from 'react'
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import PropTypes from 'prop-types'
import {getUser} from '../../redux/actions'
import './index.css'
import Password from 'antd/es/input/Password';

export default class Ligon extends Component {
    static propTypes = {
		store : PropTypes.object.isRequired
	}
    onFinish = values => {
        console.log('Success:', values);
        console.log(this.props.store);
        
        this.props.store.dispatch(getUser(values.account,values.password))
    }
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }
    render() {
        return (
            <div className="login">
                <div className="login-box">
                    <h2>登入后台管理</h2>
                    <Form
                        className="login-form"
                        labelCol={{ span: 5 }}
                        wrapperCol= {{ span: 19 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="账号"
                            name="account"
                            rules={[{ required: true, message: '请输入您的账号' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入您的密码' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                登入
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
