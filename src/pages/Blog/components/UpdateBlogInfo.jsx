import React, { Component } from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Upload from 'antd/es/upload'
import Modal from 'antd/es/modal'
import message from 'antd/es/message'
import Alert from 'antd/es/alert'
import notification from 'antd/es/notification'

import '../css/index.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { reqGetBlogInfoById, reqUpdateBlogContent, reqDeleteBlogImage } from '../../../api/blog'


export default class UpdateBlogInfo extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        blog: {},
        content: [],
        img: [],
        uploadIndex: "",
    };

    getBlogInfo = async (id) => {
        let blog = await reqGetBlogInfoById(id)
        let content = blog.blogcontent.map(item => {
            return item.content
        })
        let img = blog.blogcontent.map(item => {
            return item.img
        })
        this.setState({
            blog, content, img
        })

    }
    componentDidMount() {
        this.getBlogInfo(this.props.match.params.id)

    }



    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    // 上传结果的promise
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // 图片上传前验证
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
        if (!isJpgOrPng) {
            message.error('抱歉，只支持上传 JPG/PNG/webp 的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片不能超过 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    changeUploadIndex = (index) => {
        this.setState({
            uploadIndex: index
        })
    }

    // 图片上传
    stateUpload = (info) => {
        let { blog, uploadIndex } = this.state
        if (info.file.status === 'uploading') {
            setTimeout(()=>{
                this.getBlogInfo(this.props.match.params.id)
            },1000)
        }
        if (info.file.status === 'done') {
            message.success("图片上传成功");
            this.getBlogInfo(this.props.match.params.id)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        } else if (info.file.status === "removed") {
            reqDeleteBlogImage(blog._id, uploadIndex, info.file.uid).then(res => {
                if (res === 1) {
                    message.success("删除成功")
                    this.getBlogInfo(this.props.match.params.id)
                } else {
                    message.error("删除失败")
                }
            }).catch(err => {
                message.error(err)
            })
        }
    }

    // 表单
    onFinish = async values => {
        console.log('Success:', values);
        let { blog } = this.state
        let img = blog.blogcontent.map(item => {
            return item.img
        })
        let uid = sessionStorage.getItem('token')
        let arr = []
        if (values.blogcontent.length < img.length && img[img.length - 1].length === 0) {
            img = img[img.length - 1].length - 1
        } else if(values.blogcontent.length < img.length) {
            notification['error']({
                message: '修改失败',
                description:
                    '您无法删除还存在图片的段落，请先删除图片再删除该段落',
            });
            return 
        }
        for (let i = 0; i < values.blogcontent.length; i++) {
            arr.push({
                content: values.blogcontent[i],
                img: img[i] ? img[i] : []
            })
        }
        let obj = {
            blogmessage: values.blogmessage,
            blogcontent: arr
        }
        console.log(obj)
        let result = await reqUpdateBlogContent(uid, blog._id, obj)
        if (result === "修改成功") {
            message.success("修改成功")
            this.getBlogInfo(this.props.match.params.id)
        } else {
            message.error("修改失败，请稍后再试")
        }
    };
    render() {
        const { TextArea } = Input;
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
        // 上传图片
        const { previewVisible, previewImage, previewTitle, blog, content, img, uploadIndex } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text" onClick={this.getUploadIndex}>Upload</div>
            </div>
        );
        return (
            <>
                <Row gutter={16}>
                    <Col span="12">
                        {
                            content.length !== 0 ?
                                <Form
                                    name="basic"
                                    onFinish={this.onFinish}
                                    initialValues={
                                        {
                                            blogTitle: blog.blogtitle,
                                            blogmessage: blog.blogmessage,
                                            blogcontent: content
                                        }
                                    }
                                >
                                    <Form.Item
                                        name="blogTitle"
                                    >
                                        <Input size="large" disabled placeholder="博客标题" ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        name="blogmessage"
                                        rules={[{ required: true, message: '请简单描述这篇博客......', },]}
                                    >
                                        <TextArea placeholder="博客的描述内容" row={4} autoSize={{ minRows: 2, maxRows: 3 }} />
                                    </Form.Item>
                                    {/* 段落 */}
                                    <Form.List name="blogcontent">
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
                                                            {fields.length > img.length - 1 ? (
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
                                            修改博客
                                </Button>
                                    </Form.Item>
                                </Form>
                                :
                                null
                        }
                    </Col>
                    <Col span="12">
                        <div className="clearfix">
                            {
                                img ?
                                    img.map((item, num) => (
                                        <div key={num}>
                                            <Alert
                                                onClick={() => this.changeUploadIndex(num)} message={`选择第 ${(num + 1)}段`}
                                                type={uploadIndex === num ? "info" : "error"} style={{ margin: "10px 0", cursor: "pointer" }} />
                                            <Upload
                                                action="http://180.76.238.89:8080/tank/fileUploadBlogImage"
                                                listType="picture-card"
                                                data={{
                                                    bid: blog._id,
                                                    index: num
                                                }}
                                                fileList={
                                                    item ?
                                                        item.map((item, index) => {
                                                            return {
                                                                uid: -index,
                                                                name: 'image.png',
                                                                status: 'done',
                                                                url: item,
                                                            }
                                                        }) : null
                                                }
                                                onChange={this.stateUpload}
                                                beforeUpload={this.beforeUpload}
                                                onPreview={this.handlePreview}
                                                disabled={uploadIndex === num ? false : true}
                                            >
                                                {!item ? uploadButton : item.length >= 5 ? null : uploadButton}

                                            </Upload>
                                        </div>
                                    )) :
                                    null
                            }







                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={this.handleCancel}
                            >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}
