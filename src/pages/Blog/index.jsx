import React, { Component, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import AddBlog from './components/addBlog'
import AddBlogIamge from './components/addBlogImage'
import UpdateBlog from './components/UpdateBlog'
import UpdateBlogInfo from './components/UpdateBlogInfo'
import AllBlog from './components/AllBlog'
import { connect } from "react-redux"
import {getAllSort} from '../Sort/redux/acitons'
@connect(
    (state) => ({
        sort: state.sort
    }),
    {getAllSort}
)
class Blog extends Component {

    componentDidMount() {
        this.props.getAllSort()
    }
    render() {
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/blog/addblog" component={AddBlog} exact />
                        <Route path="/blog/addblog/image/:id" component={AddBlogIamge} />
                        <Route path="/blog/updateblog" component={UpdateBlog} exact />
                        <Route path="/blog/updateblog/info/:id" component={UpdateBlogInfo} />
                        <Route path="/blog/allblog" component={AllBlog} />
                    </Switch>
                </Suspense>
            </>
        )
    }
}
export default Blog
