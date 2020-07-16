import React, { Component } from 'react'
import Comment from 'antd/es/comment';
import Tooltip from 'antd/es/tooltip';
import List from 'antd/es/list';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Space from 'antd/es/space';
import Popconfirm from 'antd/es/popconfirm';
import moment from 'moment';
import { LikeTwoTone, DislikeTwoTone, DeleteFilled } from '@ant-design/icons';
import '../css/index.css'
import { reqGetComments, reqCountComment, reqDeleteComment} from '../../../api/comment'
import { message } from 'antd';

export default class MessageInfo extends Component {
    state = {
        page: 1,
        pageSize: 10,
        comment: [],
        total: 0
    }
    getComments = async () => {
        let { page, pageSize } = this.state
        let comment = await reqGetComments(page, pageSize)
        let total = await reqCountComment()
        this.setState({ comment, total })
    }
    componentDidMount() {
        this.getComments()
    }

    //删除评论
    deleteComment = async (id)=>{
        let {comment,page} = this.state
        if(comment.length===1&&page>1){
            let num = page
            num--
            this.setState({
                page:num
            })
        }
        let resule  = await reqDeleteComment(id)
        if(resule === 1){
            message.success("删除成功")
            this.getComments()
        }else{
            message.error("删除失败，请稍后再试")
        }
    }
    render() {
        const { comment, pageSize, total } = this.state
        const data = comment.map(item => (
            {
                actions: [<><LikeTwoTone />{item.best} </>, <><span style={{ padding: "0 10px" }}></span></>, <><DislikeTwoTone /> {item.bad}</>],
                author: item.uname,
                avatar: item.uimg,
                content: (<p>{item.cvalue}</p>),
                datetime: (
                    <Tooltip title={moment(item.ctime).format('YYYY-MM-DD HH:mm:ss')} >
                        <span>
                            {moment(item.ctime, "YYYY-MM-DD HH:mm:ss").fromNow()}
                        </span>
                    </Tooltip>
                ),
                key:item._id
            }
        ))
        return (
            <>
                <Card bordered={false}>
                    <Space ></Space>
                </Card>
                <List
                    className="comment-list"
                    header={`共 ${total} 条评论`}
                    itemLayout="horizontal"
                    dataSource={data}
                    pagination={{
                        onChange: page => {
                            this.setState({
                                page
                            }, () => {
                                this.getComments()
                            })
                        },
                        pageSize: pageSize,
                        total: total,
                        pageSizeOptions: ['10', '15', '20'],
                        showSizeChanger: true,
                        onShowSizeChange: (current, pageSize) => {
                            this.setState({
                                pageSize
                            }, () => {
                                this.getComments()
                            })

                        }
                    }}
                    renderItem={item => (
                        <>
                            <List.Item className="listItemHover"
                                actions={[
                                    <Popconfirm
                                        placement="bottomRight"
                                        title={`确认删除 ${item.author} 的这条评论吗`}
                                        onConfirm={()=>this.deleteComment(item.key)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    <Button size="small" type="link" danger="false" icon={<DeleteFilled />} key={item._id}>删除</Button>
                                    </Popconfirm>]}
                            >
                                <Comment
                                    actions={item.actions}
                                    author={item.author}
                                    avatar={item.avatar}
                                    content={item.content}
                                    datetime={item.datetime}
                                />
                            </List.Item>
                        </>
                    )}
                />
            </>
        )
    }
}
