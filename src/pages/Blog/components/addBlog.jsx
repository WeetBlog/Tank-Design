import React, { Component } from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Tag from 'antd/es/tag'
import Card from 'antd/es/card'
import Tooltip from 'antd/es/tooltip'
import Modal from 'antd/es/modal'
import Divider from 'antd/es/divider'
import Select from 'antd/es/select'
import message from 'antd/es/message'
import { reqAddBlog } from '../../../api/blog'
import { MinusCircleOutlined, PlusOutlined, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import notification from 'antd/es/notification'
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import './index.css'
const { Option } = Select;



@connect(
    (state) => ({
        user: state.user
    })
)
class addBlog extends Component {
    state = {
        tags: ['个人博客'],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
        blogTitle: "",
        blogMessage: "",
        blogContent: "",
        blogType: 1
    };
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

    // 博客类型
    handleChange = (value) => {
        this.setState({
            blogType: value
        })
    }

    // 表单
    onFinish = values => {
        const { confirm } = Modal;
        if (!values.blogContent) {
            notification['error']({
                message: '发布博客失败',
                description:
                    '检测发现您没有添加任何段落，请至少添加一段段落内容才可发布博客',
            })
        } else {
            let { blogTitle, blogMessage, blogContent, blogType, tags } = this.state
            blogContent = blogContent.map(item => {
                let obj = {
                    content: item,
                    img: []
                }
                return obj
            })
            let { uid, uname, uimg, udescription } = this.props.user
            let blog = {
                blogtype: blogType,
                blogtitle: blogTitle,
                blogmessage: blogMessage,
                blogtags: tags,
                blogcontent: blogContent
            }
            let user = {
                uid, uname, uimg, udescription
            }
            reqAddBlog(blog, user).then(res => {
                if (res) {
                    message.success("博客发布成功")
                    console.log(res);
                    confirm({
                        title: '是否要为博客添加图片?',
                        icon: <ExclamationCircleOutlined />,
                        content: '添加图片可以让博客看上去整体更加美观',
                        onOk() {
                            PubSub.publish('changeComponent', {
                                address: `/blog/addblog/image/${res._id}`,
                                componentName: {
                                    firstName: "我的博客",
                                    secondName: "编写博客",
                                    lastName: "添加博客图片",
                                }
                            })
                        },
                        onCancel() {
                            PubSub.publish('changeComponent', {
                                address: `/blog/allblog`,
                                componentName: {
                                    firstName: "我的博客",
                                    secondName: "所有博客",
                                    lastName: "",
                                }
                            })
                        },
                    })
                } else {
                    message.error("博客未年发布成功，请稍后再试")
                }
            }).catch(err => {
                message.error(err)
            })

        }
    };

    componentDidMount() {
        let date = new Date()
        this.dateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    }

    handleBlogState = (e, a) => {
        this.setState({
            blogTitle: a[0].value,
            blogMessage: a[1].value,
            blogContent: a[2].value
        })
    }

    render() {
        const { TextArea } = Input;
        const { tags, inputVisible, inputValue, editInputIndex, editInputValue, blogContent, blogMessage, blogTitle } = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        return (
            <>
                <Row gutter="50">
                    <Col span={12}>
                        <Form
                            onFieldsChange={this.handleBlogState}
                            name="basic"
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="blogTitle"
                                rules={[{ required: true, message: '博客标题未填写', },]}
                            >
                                <Input size="large" placeholder="博客标题" prefix={<EditFilled />} />
                            </Form.Item>

                            <Form.Item
                                name="blogBrief"
                                rules={[{ required: true, message: '请简单描述这篇博客......', },]}
                            >
                                <TextArea placeholder="博客的描述内容" row={4} autoSize={{ minRows: 2, maxRows: 3 }} />
                            </Form.Item>

                            {/* 标签 */}
                            <Form.Item>
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
                                                {isLongTag ? `${tag.slice(0, 5)}...` : tag}
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
                                        style={{ width: 100 }}
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        maxLength="5"
                                        className="tag-input"
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag className="site-tag-plus" onClick={this.showInput}>
                                        <PlusOutlined /> 新标签
                                    </Tag>
                                )}
                            </Form.Item>

                            {/* 博客类型   1学习技巧，2，精选摘要，3，生活记录，4，其他*/}
                            <Form.Item>
                                <Select defaultValue={1} onChange={this.handleChange}>
                                    <Option value="" disabled>博客类型选择</Option>
                                    <Option value={1}>学习技巧</Option>
                                    <Option value={2}>精选摘要</Option>
                                    <Option value={3}>生活记录</Option>
                                    <Option value={4}>其他</Option>
                                </Select>
                            </Form.Item>


                            {/* 段落 */}
                            <Form.List name="blogContent">
                                {(fields, { add, remove }) => {
                                    return (
                                        <div>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? '段落内容' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "段落内容不能为空",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <TextArea placeholder="write here ....." autoSize={{ minRows: 4, maxRows: 7 }} />
                                                    </Form.Item>
                                                    {fields.length > 1 ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            style={{ margin: '0 8px' }}
                                                            onClick={() => {
                                                                remove(field.name);
                                                            }}
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => {
                                                        add();
                                                    }}
                                                    style={{ width: '60%' }}
                                                >
                                                    <PlusOutlined /> 新增一段
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    );
                                }}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    发布博客
                                </Button>
                            </Form.Item>
                        </Form>





                    </Col>
                    <Col span={12}>
                        <Card title={blogTitle} headStyle={{ fontSize: "20px" }}>
                            {
                                tags.map(item => (
                                    <Tag color="magenta" key={item}>{item}</Tag>
                                ))
                            }


                            <p className="blogMessage">
                                {blogMessage}
                            </p>
                            <Divider style={{ color: "#999" }}>{this.dateTime}</Divider>
                            {
                                blogContent ?
                                    blogContent.map((item, index) => (
                                        <p className="blogContent" key={index}>
                                            {item}
                                        </p>
                                    )) : ""
                            }

                        </Card>
                    </Col>
                </Row>
            </>
        )
    }
}

export default addBlog
