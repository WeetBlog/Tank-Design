import React, { Component, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import ClassifyManagement from './components/ClassifyManagement'
import ClassifyInfo from './components/ClassifyInfo'


import {connect} from 'react-redux'
import {getAllSort} from './redux/acitons'
import { getAllBlog } from '../Blog/redux/actions'
@connect(
    (state)=>({
        sort:state.sort
    }),
    {getAllSort,getAllBlog}
)
class Sort extends Component {

    componentDidMount(){
        this.props.getAllSort()
        this.props.getAllBlog((parseInt(sessionStorage.getItem('type'))), sessionStorage.getItem('token'))
    }
    render() {
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/sort/classifymanagement" component={ClassifyManagement}/>
                        <Route path="/sort/classifyinfo" component={ClassifyInfo}/>
                    </Switch>
                </Suspense>
            </>
        )
    }
}
export default Sort
