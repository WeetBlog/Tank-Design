import React, { Component } from 'react'
import { Statistic, Row, Col, Card, List, Button, Avatar, Divider } from 'antd';
import './index.css'

import { reqGetUserCount, reqGetUserLastOnline } from '../../api/user'
import { reqGetBlogCount } from '../../api/blog'
import { reqGetMessageCount } from '../../api/message'
import { reqGetNewDynamic, reqGetDynamicCount } from '../../api/dynamic'

const { Meta } = Card;
export default class Backend extends Component {
    state = {
        userCount: 0,
        blogCount: 0,
        messageCount: 0,
        dynamic: {
            arr: [],
            time: [],
            sum: 0
        },
        page: 1,
        user: [],
        listLoad : true,
    }
    getUserCount = async () => {
        let result = await reqGetUserCount()
        this.setState({
            userCount: result
        })
    }
    getUserLastOnline = async () => {
        let result = await reqGetUserLastOnline()
        this.setState({
            user: result
        })
    }
    getBlogCount = async () => {
        let result = await reqGetBlogCount()
        this.setState({
            blogCount: result
        })
    }
    getMessageCount = async () => {
        let result = await reqGetMessageCount()
        this.setState({
            messageCount: result
        })
    }
    getNewDynamic = async () => {
        const { page } = this.state
        let sum = await reqGetDynamicCount()
        let result = await reqGetNewDynamic(page, 10)
        let arr = result.map(item => item.dvalue)
        let time = result.map(item => item.dtime)
        this.setState({
            dynamic: { arr, time, sum },
            listLoad : false
        })
    }
    getMoreDynamic = async () => {
        this.setState({listLoad : true})
        const { page, dynamic } = this.state
        let num = page + 1
        let result = await reqGetNewDynamic(num, 10)
        let arr1 = result.map(item => item.dvalue)
        let time1 = result.map(item => item.dtime)
        let arr = [...dynamic.arr, ...arr1]
        let time = [...dynamic.time, ...time1]
        this.setState({
            dynamic: { arr, time, sum: dynamic.sum },
            page: num,
            listLoad : false
        })
    }

    componentDidMount() {
        this.getTimeNow = setInterval(() => {
            let date = new Date()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours()
            let min = date.getMinutes()
            let sc = date.getSeconds()
            this.setState({
                date: `${month} 月 ${day} 日 `,
                time: `${hour} 时 ${min} 分 ${sc} 秒`
            })
        }, 1000)
        this.getUserCount()
        this.getBlogCount()
        this.getMessageCount()
        this.getNewDynamic()
        this.getUserLastOnline()
    }

    componentWillUnmount(){
        clearInterval(this.getTimeNow)
    }


    render() {
        const { userCount, blogCount, messageCount, dynamic, page, user,listLoad } = this.state
        return (
            <div>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic title="博客总数" value={blogCount} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="总用户数量" value={userCount} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="累计评论" value={messageCount} />
                        </Card>
                    </Col>
                    <Col span={6} >
                        <Card>
                            <Statistic title={this.state.date} value={this.state.time} />
                        </Card>
                    </Col>
                </Row>
                <div style={{ height: "16px" }}></div>
                <Row gutter={16}>
                    <Col span={12}>
                        <List
                            loading={listLoad}
                            size="small"
                            header={<div className="listHeader">最新动态</div>}
                            footer={
                                page * 10 < dynamic.sum ? <Button type="link" onClick={this.getMoreDynamic}>查看更多 . . .</Button> : <Button type="link">没有跟多了.....</Button>


                            }
                            bordered
                            dataSource={dynamic.arr}
                            renderItem={(item, index) =>
                                <List.Item actions={
                                    [<span key="list-loadmore-edit">{dynamic.time[index]}</span>]}>{item}
                                </List.Item>
                            }
                        />
                    </Col>
                    <Col span={12} className="shadowBox">
                        <h2 className="usersTitle">最近访客</h2>
                        <Divider />
                        <Row gutter={16}>
                            {
                                user.map(item => (

                                    <Col span={6} key={item._id}>
                                        <Card
                                            
                                            align="center"
                                            bordered={false}
                                            size="small"
                                            cover={
                                                <Avatar size={65} src={item.uimg} />
                                            }
                                        >
                                            <Meta className="usersMessage" title={item.uname} description={item.lastonlinetime} />
                                        </Card>
                                    </Col>

                                )
                                )
                            }



                        </Row>


                    </Col>
                </Row>
            </div>
        )
    }
}
