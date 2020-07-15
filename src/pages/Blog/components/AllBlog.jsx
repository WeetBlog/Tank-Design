import React, { Component } from 'react'
import Button from 'antd/es/button'
import Card from 'antd/es/card'
import Radio from 'antd/es/radio'
import Table from 'antd/es/table'
import Select from 'antd/es/select';
import Space from 'antd/es/space';
import Tooltip from 'antd/es/tooltip';
import Modal from 'antd/es/modal';
import List from 'antd/es/list';
import Avatar from 'antd/es/avatar';
import { StarFilled, ReadOutlined } from '@ant-design/icons';
import { getAllBlog } from '../redux/actions'
import { reqGetBlogByType, reqGetUserLikeThisBlog } from '../../../api/blog/index'
import { connect } from 'react-redux'
import { message } from 'antd'

const { Option } = Select;
@connect(
    (state) => ({
        blogs: state.blogs,
    }),
    { getAllBlog }
)
class AllBlog extends Component {
    state = {
        radioValue: true,
        sortValue: true,
        blog: [],
        showBlog: []
    };
    getBlogInfo = async () => {
        let blog = await this.props.getAllBlog((parseInt(sessionStorage.getItem('type'))), sessionStorage.getItem('token'))
        this.setState({ blog })
        const { radioValue, sortValue } = this.state
        this.changeSortShowBlog(radioValue, sortValue)
    }
    componentDidMount() {
        this.getBlogInfo()
    }

    // 排序渲染数据
    changeSortShowBlog = (i, j) => {
        const { blog } = this.state
        let arr = blog.map((item, index) => {
            item.key = index
            return item
        })
        if (i) {
            if (j) {
                let show = arr.sort((a, b) => {
                    return b.blogtimenum - a.blogtimenum
                })
                this.setState({
                    showBlog: show
                })
            } else {
                let show = arr.sort((a, b) => {
                    return a.blogtimenum - b.blogtimenum
                })
                this.setState({
                    showBlog: show
                })
            }
        } else {
            if (j) {
                let show = arr.sort((a, b) => {
                    return b.blogseenum - a.blogseenum
                })
                this.setState({
                    showBlog: show
                })
            } else {
                let show = arr.sort((a, b) => {
                    return a.blogseenum - b.blogseenum
                })
                this.setState({
                    showBlog: show
                })
            }
        }
    }

    // 单选框
    onChangeRadio = e => {
        console.log(e.target.value);
        const { sortValue } = this.state
        this.setState({
            radioValue: e.target.value,
        });
        this.changeSortShowBlog(e.target.value, sortValue)
    };
    onChangeSort = e => {
        const { radioValue } = this.state
        this.setState({
            sortValue: e.target.value,
        });
        this.changeSortShowBlog(radioValue, e.target.value)
    };


    // 下拉框，博客类型
    handleChange = async (value) => {
        let utype = parseInt(sessionStorage.getItem('type'))
        let uid = sessionStorage.getItem('token')
        if (value) {
            let blog = await reqGetBlogByType(value, utype, uid)
            this.setState({ blog })
            const { radioValue, sortValue } = this.state
            this.changeSortShowBlog(radioValue, sortValue)
        } else {
            this.getBlogInfo()
        }
    }

    // 收藏博客用户
    getUserLike = (id) => {
        reqGetUserLikeThisBlog(id).then(res => {
            let list = res.map(item => {
                return {
                    title: item.uname,
                    src: item.uimg,
                    desc: item.udescription
                }
            })
            if(list.length === 0){
                list = [{title:"这篇博客未有任何人收藏"}]
            }else{
                list.unshift({
                    title : "收藏这篇博客的用户如下"
                })
            }
            
            Modal.info({
                content:
                    <>
                        <List
                            itemLayout="horizontal"
                            dataSource={list}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={item.src ? <Avatar src={item.src} /> : ""}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description={item.desc ? item.desc : ""}
                                    />
                                </List.Item>
                            )}
                        />
                    </>,
            });
        }).catch(err => {
            message.error(err)
        })

    }
    render() {
        const { showBlog } = this.state
        const columns = [
            {
                title: '日期',
                width: 150,
                dataIndex: 'blogtime',
                fixed: 'left',
                align: "center"
            },
            {
                title: '浏览量',
                dataIndex: 'blogseenum',
                width: 100,
                fixed: 'left',
                align: "center"
            },
            {
                title: '博客标题',
                width: 250,
                dataIndex: 'blogtitle',
                fixed: 'left',
            },
            {
                title: '博客描述',
                dataIndex: 'blogmessage'
            },
            {
                title: '操作',
                key: 'operation',
                width: 200,
                align: "center",
                fixed: 'right',
                render: (blog) =>
                    <>
                        <Space size="large">
                            <Tooltip placement="bottom" title="收藏家">
                                <Button onClick={() => this.getUserLike(blog._id)} disabled={false} type="dashed" size="small" shape="circle" icon={<StarFilled />} />
                            </Tooltip>
                            <Tooltip placement="bottom" title="阅读">
                                <Button type="primary" size="small" ghost={true} shape="circle" icon={<ReadOutlined />} />
                            </Tooltip>
                        </Space>
                    </>
                ,
            },
        ];
        return (
            <>
                <Card>
                    <Radio.Group onChange={this.onChangeRadio} defaultValue={this.state.radioValue}>
                        <Radio value={true}>按时间查看</Radio>
                        <Radio value={false}>按浏览量查看</Radio>
                    </Radio.Group>
                    <Space size="large">
                        <Radio.Group onChange={this.onChangeSort} value={this.state.sortValue}>
                            <Radio.Button value={true}>降序</Radio.Button>
                            <Radio.Button value={false}>升序</Radio.Button>
                        </Radio.Group>
                        <Select defaultValue="" style={{ width: 200, color: "orangered" }} onChange={this.handleChange}>
                            <Option value="" disabled style={{ color: "orange" }}>博客类型</Option>
                            <Option value={0}>所有博客</Option>
                            <Option value={1}>学习技巧</Option>
                            <Option value={2}>精选摘要</Option>
                            <Option value={3}>生活记录</Option>
                            <Option value={4}>其他</Option>
                        </Select>
                    </Space>
                </Card>
                <Table
                    columns={columns}
                    dataSource={showBlog}
                    scroll={{ x: 1300 }} />
            </>
        )
    }
}
export default AllBlog