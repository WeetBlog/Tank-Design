import React, { Component } from 'react'
import Table from 'antd/es/table';
import Button from 'antd/es/button';
import PubSub from 'pubsub-js'
import Tooltip from 'antd/es/tooltip';
import Space from 'antd/es/space';
import Tag from 'antd/es/tag';
import Input from 'antd/es/input';
import Modal from 'antd/es/modal';
import message from 'antd/es/message';
import Radio from 'antd/es/radio';
import './index.css'
import {
    EditOutlined, DeleteOutlined, EyeTwoTone, TagOutlined, PlusOutlined, SyncOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux'
import { getAllBlog } from '../redux/actions'
import { reqUpdateBlogTags ,reqUpdateRulesById} from '../../../api/blog'

@connect(
    (state) => ({
        blogs: state.blogs,
    }),
    { getAllBlog }
)
class Blog extends Component {
    state = {
        recordKey: "",
        tags: [],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
        visible: false,
        blogId: "",
        blogTitle: "",
        value:1
    }

    componentDidMount() {
        this.props.getAllBlog(2, sessionStorage.getItem('token'))
    }

    //切换组件
    handleTable = (text, record, index) => {
        PubSub.publish('changeComponent', {
            address: `/blog/updateblog/info/${index}`,
            componentName: {
                firstName: "我的博客",
                secondName: "管理博客",
                lastName: "修改博客",
            }
        })
    }

    // 权限弹窗
    showModal = (text) => {
        this.setState({
            visible: true,
            recordKey: "",
            blogId:text._id,
            blogTitle: text.blogtitle
        });
    };

    onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    handleOk = async () => {
        let {blogId,value} = this.state
        let rule = {}
        if(value === 1){
            rule= {
                blogseeadmin:true,
                blogseevip:true,
                blogseeall:true
            }
        }else if(value === 2){
            rule= {
                blogseeadmin:true,
                blogseevip:true,
                blogseeall:false
            }
        }else if(value === 3){
            rule= {
                blogseeadmin:true,
                blogseevip:false,
                blogseeall:false
            }
        }
        let result = await reqUpdateRulesById(blogId,sessionStorage.getItem('token'),rule)
        if(result === "设置成功"){
            message.success("设置成功")
        }else{
            message.error("设置失败，请稍后再试")
        }
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    // 标签编辑
    handleEdit = (record, blog) => {
        this.setState({
            recordKey: record,
            tags: blog.blogtags
        })
    }
    // 编辑标签发送请求
    updateBlogTags = async (blog) => {
        let flag = false;
        if (blog.blogtags.length === this.state.tags.length) {
            for (let i = 0; i < blog.blogtags.length; i++) {
                console.log("blog", blog.blogtags[i])
                console.log("state", this.state.tags[i])
                if (blog.blogtags[i] !== this.state.tags[i]) {
                    flag = true
                }
            }
        } else {
            flag = true
        }

        if (flag) {
            let result = await reqUpdateBlogTags(blog._id, this.state.tags)
            if (result === "修改成功") {
                message.success("修改成功")
                this.props.getAllBlog(2, sessionStorage.getItem('token'))
            } else {
                message.error("修改失败")
            }
        } else {
            message.warning("未做任何修改")
        }

        this.setState({ recordKey: "" })
    }


    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {

        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        console.log(1)
        this.setState(({ tags, editInputIndex, editInputValue }) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };

    saveInputRef = input => {
        this.input = input;
    };

    saveEditInputRef = input => {
        this.editInput = input;
    };

    render() {
        let { recordKey, tags, inputVisible, inputValue, editInputIndex, editInputValue, blogTitle } = this.state
        const columns = [
            {
                title: '博客日期',
                width: 120,
                align: "center",
                dataIndex: 'blogtime',
                key: '0',
                fixed: 'left',
            },
            {
                title: '标签',
                key: '1',
                fixed: 'left',
                align: "center",
                width: 250,
                render: (text, record, index) => (
                    recordKey === text.key ?
                        <>
                            {tags.map((tag, index) => {
                                if (editInputIndex === index) {
                                    return (
                                        <Input
                                            ref={this.saveEditInputRef}
                                            key={tag}
                                            size="small"
                                            className="tag-input"
                                            value={editInputValue}
                                            onChange={this.handleEditInputChange}
                                            onBlur={this.handleEditInputConfirm}
                                            onPressEnter={this.handleEditInputConfirm}
                                        />
                                    );
                                }

                                const isLongTag = tag.length > 5;

                                const tagElem = (
                                    <Tag
                                        color="magenta"
                                        className="edit-tag"
                                        key={tag}
                                        closable={index !== 0}
                                        onClose={() => this.handleClose(tag)}
                                    >
                                        <span
                                            onDoubleClick={e => {
                                                if (index !== 0) {
                                                    this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                                        this.editInput.focus();
                                                    });
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                        </span>
                                    </Tag>
                                );
                                return isLongTag ? (
                                    <Tooltip title={tag} key={tag}>
                                        {tagElem}
                                    </Tooltip>
                                ) : (
                                        tagElem
                                    );
                            })}
                            {inputVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    className="tag-input"
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Tag className="site-tag-plus" onClick={this.showInput}>
                                    <PlusOutlined /> New Tag
                                </Tag>
                            )}
                        </>
                        : <>
                            {text.blogtags.map((item, index) => (
                                <Tag color="volcano" key={index}>{item}</Tag>
                            ))}

                        </>
                )
            },
            {
                title: '博客标题',
                dataIndex: 'blogtitle',
                key: '2',
                fixed: 'left',
                width: 300,
            },
            {
                title: '博客描述',
                dataIndex: 'blogmessage',
                key: '4'
            },
            {
                title: '操作',
                key: '5',
                fixed: 'right',
                width: 250,
                align: "center",
                render: (text, record, index) => (
                    <>
                        <Space size="middle">
                            <Button onClick={() => this.handleTable(text, record, index)} type="primary" className="blog-button" size="small" icon={<EditOutlined />}>
                                编辑
                            </Button>
                            {
                                recordKey === text.key ?
                                    <>
                                        <Tooltip placement="top" title="完成">
                                            <Button type="default" onClick={() => this.updateBlogTags(text)} shape="circle" icon={<SyncOutlined spin />}></Button>
                                        </Tooltip>
                                    </> :
                                    <>
                                        <Tooltip placement="bottom" title="标签">
                                            <Button onClick={() => this.handleEdit(text.key, text)} size="middle" type="text" shape="circle" icon={<TagOutlined />}></Button>
                                        </Tooltip>
                                    </>
                            }

                            <Tooltip placement="bottom" title="权限">
                                <Button size="small" onClick={() => this.showModal(text)} type="default" shape="circle" icon={<EyeTwoTone twoToneColor="#CE9178" />}></Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="删除">
                                <Button type="danger" onClick={() => this.setState({ recordKey: "" })} size="small" shape="circle" icon={<DeleteOutlined />}></Button>
                            </Tooltip>
                        </Space>
                        <Modal
                            title={`对《${blogTitle}》设置权限`}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
                                <Radio value={1}>所有人课件</Radio>
                                <Radio value={2}>vip课件</Radio>
                                <Radio value={3}>仅管理员可见</Radio>
                            </Radio.Group>
                        </Modal>
                    </>
                ),
            },

        ];

        let arr = this.props.blogs.map(item => {
            item.key = item._id
            return item
        })
        return (
            <>
                <Table columns={columns} dataSource={arr} scroll={{ x: 1350 }} />
            </>
        )
    }
}

export default Blog
