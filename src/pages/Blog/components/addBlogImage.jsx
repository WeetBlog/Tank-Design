import React, { Component } from 'react'
import Select from 'antd/es/select'
import Card from 'antd/es/card'
import Space from 'antd/es/space'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Button from 'antd/es/button'
import Upload from 'antd/es/upload'
import Drawer from 'antd/es/drawer'
import message from 'antd/es/message'
import Avatar from 'antd/es/avatar'
import Tag from 'antd/es/tag'
import { UploadOutlined } from '@ant-design/icons';
import Alert from 'antd/es/alert'
import { reqGetBlogInfoById,reqDeleteBlogImage } from '../../../api/blog'
const { Option } = Select;
const { Meta } = Card;



export default class addBlogImage extends Component {
    state = {
        flagUpload: -1,
        blog: {
            blogtags: [],
            blogcontent: []
        },
        visible: false
    };

    getBlogInfo = async (id) => {
        let blog = await reqGetBlogInfoById(id)
        this.setState({
            blog
        })
    }
    componentDidMount() {
        this.getBlogInfo(this.props.match.params.id)

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

    // 图片上传
    stateUpload = (info) => {
        let {blog,flagUpload} = this.state
        if (info.file.status !== 'uploading') {
            if(info.file.status === "removed"){
                reqDeleteBlogImage(blog._id,flagUpload,info.file.uid).then(res=>{
                    if(res===1){
                        message.success("删除成功")
                        this.getBlogInfo(this.props.match.params.id)
                    }else{
                        message.error("删除失败")
                    }
                }).catch(err=>{
                    message.error(err)
                })
            }
        }
        if (info.file.status === 'done') {
            message.success("图片上传成功");
            this.getBlogInfo(this.props.match.params.id)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }



    // select选择
    handleChange1 = (value) => {
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
        const { flagUpload, blog, visible } = this.state;
        return (
            <>
                <Row gutter={20}>
                    <Col span="12">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Card bodyStyle={{ fontSize: "20px", letterSpacing: "3px" }}>
                                {blog.blogtitle}
                            </Card>
                            <Select defaultValue="" style={{ width: 300 }} onChange={this.handleChange1}>
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
                        {
                            blog.blogcontent.map((item, index) => (
                                <div key={index}>
                                    <Alert message={flagUpload === index ? `第 ${index + 1} 段内容图片` : `第 ${index + 1} 段内容图片（请选择段落）`} type={flagUpload === index ? "info" : "error"} style={{ margin: "10px 0" }} />
                                    <Upload
                                        action='http://180.76.238.89:8080/tank/fileUploadBlogImage'
                                        listType='picture'
                                        defaultFileList={
                                            item.img.map((it, ind) => {
                                                return {
                                                    uid: ind,
                                                    name: 'image.png',
                                                    status: 'done',
                                                    url: it,
                                                }
                                            })
                                        }
                                        data={{
                                            bid: blog._id,
                                            index
                                        }}
                                        onChange={this.stateUpload}
                                        beforeUpload={this.beforeUpload}
                                        className='upload-list-inline'
                                        disabled={!(flagUpload === index)}
                                    >
                                        {
                                            item.img.length >= 5 ? null :
                                                <Button>
                                                    <UploadOutlined /> 选择图片上传
                                                </Button>
                                        }
                                    </Upload>
                                </div>
                            ))
                        }
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
                        blog.blogcontent.map((item, index) => (
                            <Card key={index}>
                                {item.content}
                                {
                                    item.img.map((item, index) => (
                                        <img key={index} width="100%" alt="tank" src={item} />
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
