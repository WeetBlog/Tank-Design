import React, { Component } from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Alert from 'antd/es/alert'
import Space from 'antd/es/space'
import Transfer from 'antd/es/transfer';
import { SoundOutlined } from '@ant-design/icons';
import Switch from 'antd/es/switch'
import './index.css'
export default class Notice extends Component {
    state = {
        mockData: [
            {
                key: "1",
                title: "aa"
            },
            {
                key: "2",
                title: "bb"
            },
            {
                key: "3",
                title: "cc"
            },
            {
                key: "4",
                title: "aa"
            },
            {
                key: "5",
                title: "bb"
            },
            {
                key: "6",
                title: "cc"
            }
        ],
        targetKeys: [],
        custom : true 
    }
    onFinish = values => {
        console.log('Success:', values);
    }

    checkCustom = (checked,event) =>{
        this.setState({
            custom : checked
        })
    }

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.setState({ targetKeys });
    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };
    render() {
        let {custom} = this.state
        return (
            <>
                <Space direction="vertical" style={{ width: "100%" }} size={10}>
                    <Alert
                        message="消息公告"
                        description="可对所有用户发布重要的消息，用户会在第一时间收到公告的内容！ "
                        type="info"
                        showIcon
                    />
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <Form
                                style={{ width: "95%" }}
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: '不能发布空的信息' }]}
                                >
                                    <Input prefix={<SoundOutlined className="site-form-item-icon" />} placeholder="write here ......" />
                                </Form.Item>
                                <Form.Item>
                                    <Switch onChange={this.checkCustom} checkedChildren="所有人" unCheckedChildren="自定义用户" defaultChecked />   
                                </Form.Item>
                                <Form.Item>
                                    
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        发布
                                </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col className="gutter-row" span={16}>
                            <Transfer
                                dataSource={this.state.mockData}
                                showSearch
                                disabled={custom}
                                listStyle={{width:"100%",minHeight:450}}
                                filterOption={this.filterOption}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                onSearch={this.handleSearch}
                                titles={["未选择用户","已选用户"]}
                                operations={["添加","退回"]}
                                render={item => item.title}
                            /></Col>
                    </Row>
                </Space>
            </>
        )
    }
}
