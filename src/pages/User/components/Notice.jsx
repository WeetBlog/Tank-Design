import React, { Component } from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Alert from 'antd/es/alert'
import Space from 'antd/es/space'
import Transfer from 'antd/es/transfer';
import message from 'antd/es/message';
import { SoundOutlined } from '@ant-design/icons';
import Switch from 'antd/es/switch'
import './index.css'
import {reqAddMessageManyPeople} from '../../../api/user'
import {connect} from 'react-redux'
import {getAllUser} from '../redux/actions' 
@connect(
    (state)=>({
        users:state.user
    }),
    {getAllUser}
)
class Notice extends Component {
    state = {
        targetKeys: [],
        custom : true ,
        people :[]
    }
    // 获取actions所有用户信息
    getAllUserInfo = async () => {
        let result = await this.props.getAllUser()
        result = result.map(item=>{
            item.key = item.uid
            return item
        })
        let ids = result.map(item=>{
            item.key = item.uid
            return item.uid
        })
        this.setState({
            people: result,
            targetKeys : ids
        })
    }

    componentDidMount() {
        this.getAllUserInfo()
    }

    onFinish = values => {
        console.log('Success:', values);
        if(this.state.targetKeys.length===0){
            message.error("抱歉，您未选择用户")
        }else{
            reqAddMessageManyPeople(this.state.targetKeys,values.value).then(res=>{
                if(res === 1){
                    message.success("发布成功")
                }else{
                    message.error("未能发布成功，请稍后再试")
                }
            }).catch(err=>{
                message.error(err)
            })
        }
    }

    checkCustom = (checked,event) =>{
        
        if(!checked){
            this.setState({
                targetKeys: []
            })
        }else{
            let ids = this.state.people.map(item=>{
                item.key = item.uid
                return item.uid
            })
            this.setState({
                targetKeys : ids
            })
        }
        this.setState({
            custom : checked
        })
    }

    filterOption = (inputValue, option) => option.uname.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        message.info(`已选择 ${targetKeys.length} 位用户`)
        this.setState({ targetKeys });
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
                                    name="value"
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
                                dataSource={this.state.people}
                                showSearch
                                disabled={custom}
                                listStyle={{width:"100%",minHeight:450}}
                                filterOption={this.filterOption}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                titles={["未选择用户","已选用户"]}
                                operations={["添加","退回"]}
                                render={item => item.uname}
                            /></Col>
                    </Row>
                </Space>
            </>
        )
    }
}

export default  Notice
