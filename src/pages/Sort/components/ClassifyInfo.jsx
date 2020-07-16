import React, { Component } from 'react'
import Statistic from 'antd/es/statistic'
import Card from 'antd/es/card'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import { BarChartOutlined } from '@ant-design/icons';

import '../css/index.css'
import { connect } from 'react-redux'
@connect(
    (state) => ({
        sort: state.sort,
        blog: state.blogs
    }),
)
class ClassifyInfo extends Component {
    render() {
        const { sort,blog } = this.props

        return (
            <div className="site-statistic-demo-card">
                <Row gutter={16}>
                    {
                        sort.map((item, index) => (
                            <Col span={6} key={item._id} style={{margin:"8px 0"}}>
                                <Card>
                                    <Statistic
                                        title={item.sname}
                                        value={`共 ${blog.filter(blog=>blog.blogtype === item.stype).length}`}
                                        // valueStyle={{ color: `#${Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16)}` }}
                                        valueStyle={
                                            blog.filter(blog=>blog.blogtype === item.stype).length > 5 ?
                                            {color:"#62D9FB"} : 
                                            blog.filter(blog=>blog.blogtype === item.stype).length>0 ? 
                                            {color:"green"} :
                                            {color:"red"}}
                                        prefix={<BarChartOutlined />}
                                        suffix="篇博客"
                                    />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}
export default ClassifyInfo
