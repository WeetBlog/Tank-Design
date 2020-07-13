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


const { Option } = Select;

export default class AllBlog extends Component {
    state = {
        radioValue: true,
        sortValue: true,
        blog: [
            {
                "blogseenum": 4,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-14",
                "blogtimenum": 1594464595349,
                "blogtype": 2,
                "blogtitle": "测试博客标题4",
                "blogmessage": "修改后的描述",
                "key": 1
            },
            {
                "blogseenum": 7,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-11",
                "blogtimenum": 1594464595319,
                "blogtype": 2,
                "blogtitle": "测试博客标题1",
                "blogmessage": "修改后的描述",
                "key": 2
            },
            {
                "blogseenum": 3,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-12",
                "blogtimenum": 1594464595329,
                "blogtype": 2,
                "blogtitle": "测试博客标题2",
                "blogmessage": "修改后的描述",
                "key": 3
            },
            {
                "blogseenum": 6,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-13",
                "blogtimenum": 1594464595339,
                "blogtype": 2,
                "blogtitle": "测试博客标题3",
                "blogmessage": "修改后的描述",
                "key": 4
            },
            {
                "blogseenum": 4,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-14",
                "blogtimenum": 1594464595349,
                "blogtype": 2,
                "blogtitle": "测试博客标题4",
                "blogmessage": "修改后的描述",
                "key": 1
            },
            {
                "blogseenum": 7,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-11",
                "blogtimenum": 1594464595319,
                "blogtype": 2,
                "blogtitle": "测试博客标题1",
                "blogmessage": "修改后的描述",
                "key": 2
            },
            {
                "blogseenum": 3,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-12",
                "blogtimenum": 1594464595329,
                "blogtype": 2,
                "blogtitle": "测试博客标题2",
                "blogmessage": "修改后的描述",
                "key": 3
            },
            {
                "blogseenum": 6,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-13",
                "blogtimenum": 1594464595339,
                "blogtype": 2,
                "blogtitle": "测试博客标题3",
                "blogmessage": "修改后的描述",
                "key": 4
            },
            {
                "blogseenum": 4,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-14",
                "blogtimenum": 1594464595349,
                "blogtype": 2,
                "blogtitle": "测试博客标题4",
                "blogmessage": "修改后的描述",
                "key": 1
            },
            {
                "blogseenum": 7,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-11",
                "blogtimenum": 1594464595319,
                "blogtype": 2,
                "blogtitle": "测试博客标题1",
                "blogmessage": "修改后的描述",
                "key": 2
            },
            {
                "blogseenum": 3,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-12",
                "blogtimenum": 1594464595329,
                "blogtype": 2,
                "blogtitle": "测试博客标题2",
                "blogmessage": "修改后的描述",
                "key": 3
            },
            {
                "blogseenum": 6,
                "_id": "5f0999537b61247f812fbd2e",
                "blogtime": "2020-07-13",
                "blogtimenum": 1594464595339,
                "blogtype": 2,
                "blogtitle": "测试博客标题3",
                "blogmessage": "修改后的描述",
                "key": 4
            }
        ],
        showBlog: []
    };

    componentDidMount() {
        const { radioValue, sortValue } = this.state
        this.changeSortShowBlog(radioValue, sortValue)
    }


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
        const {sortValue } = this.state
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

    // 下拉框
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    // 收藏博客用户
    getUserLike = () => {
        Modal.info({
            content:
                <>
                    <List
                        itemLayout="horizontal"
                        dataSource={[
                            {
                                title: "收藏这篇博客的用户如下",
                            },
                            {
                                title: 'Ant Design Title 1',
                                src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                                desc:"Ant Design, a design language for background applications, is refined by Ant UED Team"
                            },
                            {
                                title: 'Ant Design Title 1',
                                src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                                desc:"Ant Design, a design language for background applications, is refined by Ant UED Team"
                            },
                            {
                                title: 'Ant Design Title 1',
                                src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                                desc:"Ant Design, a design language for background applications, is refined by Ant UED Team"
                            },
                        ]}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={item.src ? <Avatar src={item.src} />:""}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={item.desc ? item.desc:""}
                                />
                            </List.Item>
                        )}
                    />
                </>,
        });
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
                render: () =>
                    <>
                        <Space size="large">
                            <Tooltip placement="bottom" title="收藏家">
                                <Button onClick={this.getUserLike} disabled={false} type="dashed" size="small" shape="circle" icon={<StarFilled />} />
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
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
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
