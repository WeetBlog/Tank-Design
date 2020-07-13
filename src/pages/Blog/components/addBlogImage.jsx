import React, { Component } from 'react'
import Select from 'antd/es/select'
import Card from 'antd/es/card'
import Space from 'antd/es/space'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Button from 'antd/es/button'
import Upload from 'antd/es/upload'
import Modal from 'antd/es/modal'
import Drawer from 'antd/es/drawer'
import message from 'antd/es/message'
import Avatar from 'antd/es/avatar'
import Tag from 'antd/es/tag'
import { PlusOutlined } from '@ant-design/icons';
import Alert from 'antd/es/alert'
const { Option } = Select;
const { Meta } = Card;
export default class addBlogImage extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
            // {
            //     uid: '-1',
            //     name: 'image.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ],
        flagUpload: -1,
        blog: {
            blogtags: [
                "个人",
                "生活记录",
                "其他"
            ],
            blogcontent: [
                {
                    content: "博客的段落内容，第1段",
                    img: ["http://180.76.238.89:8111/boy.png"]
                },
                {
                    content: "博客的段落内容，第2段",
                    img: []
                },
                {
                    content: "博客的段落内容，第3段",
                    img: ["http://180.76.238.89:8111/boy.png"]
                }
            ],
            _id: "5f0999537b61247f812fbd2e",
            blogtime: "2020-07-11",
            blogtype: 1,
            blogtitle: "测试博客标题1",
            blogmessage: "测试博客标题描述信息",
            blogusername: "Tank",
            bloguserimg: "http://180.76.238.89:8111/boy.png",
            bloguserid: "1594452939045"
        },
        visible: false
    };

    // 上传图片
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



    // select选择
    handleChange = (value) => {
        this.setState({
            flagUpload: value
        })
    }

    // 抽屉
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const { previewVisible, previewImage, fileList, previewTitle, flagUpload, blog, visible } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <>
                <Row gutter={20}>
                    <Col span="12">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Card bodyStyle={{ fontSize: "20px", letterSpacing: "3px" }}>
                                {blog.blogtitle}
                            </Card>
                            <Select defaultValue="" style={{ width: 300 }} onChange={this.handleChange}>
                                <Option value="" disabled>选择段落</Option>
                                {blog.blogcontent.map((item, index) => (
                                    <Option value={index} key={index}> 第 {(index + 1)} 段</Option>
                                ))}
                            </Select>
                            <Button type="primary" onClick={this.showDrawer}>
                                浏览博客
                            </Button>
                        </Space>
                    </Col>
                    <Col span="12">
                        <div className="clearfix">

                            {
                                blog.blogcontent.map((item, index) => {

                                    return (
                                        <div key={index}>
                                            <Alert message={`第 ${index + 1} 段内容图片`} type={flagUpload === index ?"info":"error"} style={{ margin: "10px 0" }} />
                                            <Upload
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                listType="picture-card"
                                                fileList={
                                                    item.img.map((it, ind) => {
                                                        return {
                                                            uid: -ind,
                                                            name: 'image.png',
                                                            status: 'done',
                                                            url: it,
                                                        }
                                                    })
                                                }
                                                beforeUpload={this.beforeUpload}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                                disabled={!(flagUpload === index)}
                                            >
                                                {fileList.length >= 8 ? null : uploadButton}
                                            </Upload>
                                        </div>
                                    )
                                })
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
                <Drawer
                    title={blog.blogtitle}
                    width="50%"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                    key={visible}
                    drawerStyle={{ background: "#ccc" }}
                    headerStyle={{ letterSpacing: "3px" }}
                >
                    <Space style={{ width: "100%" }} direction="vertical">
                        <Card>
                            <Meta
                                avatar={<Avatar src={blog.bloguserimg} />}
                                title={blog.blogusername}
                                description="This is the description" />
                        </Card>
                        <Card title={blog.blogmessage} headStyle={{ fontFamily: "楷体" }}>
                            {
                                blog.blogtags.map(item => (
                                    <Tag key={item} color="magenta">{item}</Tag>
                                ))
                            }
                        </Card>
                    </Space>
                    {
                        blog.blogcontent.map((item,index)=>(
                            <Card key={index}>
                                {item.content}
                                {
                                    item.img.map((item,index)=>(
                                        <img key={index} width="100%" alt="tank" src={item}/>
                                    ))
                                }
                            </Card>
                        ))
                    }
                </Drawer>
            </>
        )
    }
}
