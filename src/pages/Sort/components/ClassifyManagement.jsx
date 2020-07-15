import React, { Component } from 'react'
import Card from 'antd/es/card';
import Button from 'antd/es/button';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import Modal from 'antd/es/modal';
import Input from 'antd/es/input';
import message from 'antd/es/message';
import Checkbox from 'antd/es/checkbox';
import { PlusOutlined, DeleteOutlined,HighlightOutlined } from '@ant-design/icons';

import { connect } from 'react-redux'
import { getAllSort } from '../redux/acitons'
import { getAllBlog } from '../../Blog/redux/actions'
import { reqRuleSortNam,reqAddSort} from '../../../api/sort'

@connect(
    (state) => ({
        sort: state.sort
    }),
    { getAllSort,getAllBlog }
)
class ClassifyManagement extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        sort: [],
        blog : [],
        visible: false,
        addValue:"",
        addvalueRule:"",
    };

    // 添加分类
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 校验分类名称是否重复
    ruleName = async ()=>{
        let {addValue} = this.state
        if(addValue.trim()){
            let result = await reqRuleSortNam(addValue)
            if(result!==1){
                this.setState({
                    addvalueRule : "分类名已重复",
                    addValue:""
                })
            }
        }else{
            this.setState({
                addvalueRule : "请输入分类名称",
            })
        }
        
    }

    handleOk = async () => {
        let {addValue} = this.state
        let result = await reqAddSort(addValue)
        if(result === 1){
            message.success("添加成功")
            this.getAllSort()
            this.setState({
                addValue:""
            })
        }else{
            message.error("添加失败，请稍后再试")
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

    // 删除的请求
    start = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    // 刷新页面，重新获取数据
    getAllSort = async () => {

        let sort = await this.props.getAllSort()
        let blog = await this.props.getAllBlog((parseInt(sessionStorage.getItem('type'))), sessionStorage.getItem('token'))
        this.setState({
            sort,blog
        })
    }

    componentDidMount() {
        this.getAllSort()
    }

    // 选中分类的回调
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    test = (checked, record, index, originNode)=>{
        let {blog} = this.state
        let arr = blog.map(item=>item.blogtype)
        let result = arr.indexOf(record.stype)
        return result !== -1 ? null : originNode
    }
    render() {

        const columns = [
            {
                title: '分类名称',
                dataIndex: 'sname',
            }
        ];
        const { loading, selectedRowKeys, sort,addValue,addvalueRule } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            renderCell:(checked, record, index, originNode)=>this.test(checked, record, index, originNode)
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <>
                <Card title={(
                    <>
                        <Space size="large">
                            <Button type="ghost" onClick={this.showModal} icon={<PlusOutlined />} style={{ background: "green", color: "#fff" }}>添加分类</Button>
                        </Space>
                        <Modal
                            title="添加分类名称"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okButtonProps={{ disabled: addValue.trim() && addvalueRule==="" ? false : true }}
                        >
                            <Input size="large" 
                                value={addValue} 
                                onChange={(e)=>this.setState({addValue:e.target.value.trim()})}  
                                onBlur={this.ruleName} 
                                onFocus={()=>this.setState({addvalueRule:""})}
                                placeholder="large size" 
                                prefix={<HighlightOutlined />} />
                            { addvalueRule? <span style={{color:"red"}}>{addvalueRule}</span>:"" }
                        </Modal>
                    </>
                )}>
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            <Button icon={<DeleteOutlined />} danger type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                                Delete All
                            </Button>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `已选择 ${selectedRowKeys.length} 个分类` : ''}
                            </span>
                        </div>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={
                            sort.map(item => {
                                item.key = item._id
                                return item
                            })} />
                    </div>
                </Card>
            </>
        )
    }
}
export default ClassifyManagement