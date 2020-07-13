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

import './index.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';



export default class UpdateBlogInfo extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }
        ],
    };
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });
    
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
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/webp';
        if (!isJpgOrPng) {
            message.error('抱歉，只支持上传 JPG/PNG/webp 的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片不能超过 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // 表单
    onFinish = values => {
        // console.log('Success:', values);
        // if (!values.blogContent) {
        //     notification['error']({
        //         message: '发布博客失败',
        //         description:
        //             '检测发现您没有添加任何段落，请至少添加一段段落内容才可发布博客',
        //     })
        // }
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
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <>
                <Row gutter={16}>
                    <Col span="12">
                        <Form
                            name="basic"
                            onFinish={this.onFinish}
                            initialValues={
                                {
                                    blogTitle: "1",
                                    blogBrief: "2",
                                    blogContent: ["1", "2"]
                                }
                            }
                        >
                            <Form.Item
                                name="blogTitle"
                            >
                                <Input size="large" disabled placeholder="博客标题" ></Input>
                            </Form.Item>
                            <Form.Item
                                name="blogBrief"
                                rules={[{ required: true, message: '请简单描述这篇博客......', },]}
                            >
                                <TextArea placeholder="博客的描述内容" row={4} autoSize={{ minRows: 2, maxRows: 3 }} />
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
                    <Col span="12">
                        <div className="clearfix">
                            <Alert message="第1段内容图片" type="info" style={{margin:"10px 0"}} />
                            <Upload
                                action="http://180.76.238.89:8080/tank/fileUploadBlogImage"
                                listType="picture-card"
                                data={{uid:"abcd"}}
                                fileList={fileList}
                                beforeUpload={this.beforeUpload}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>

                            <Alert message="第2段内容图片" type="info" style={{margin:"10px 0"}} />
                            <Upload
                                action="http://180.76.238.89:8080/tank/fileUploadBlogImage"
                                listType="picture-card"
                                data={{uid:"abcd"}}
                                fileList={fileList}
                                beforeUpload={this.beforeUpload}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                progress={null}
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>

                            <Alert message="第3段内容图片" type="info" style={{margin:"10px 0"}} />
                            <Upload
                                action="http://180.76.238.89:8080/tank/fileUploadBlogImage"
                                listType="picture-card"
                                data={{uid:"abcd"}}
                                fileList={fileList}
                                beforeUpload={this.beforeUpload}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                progress={null}
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>
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
