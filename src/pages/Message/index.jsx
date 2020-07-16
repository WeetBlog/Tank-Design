import React, { Component, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import AddRecord from './components/AddRecord'
import MessageInfo from './components/MessageInfo'
import RecordInfo from './components/RecordInfo'


import {connect} from 'react-redux'

@connect(
    (state)=>({})
)
class Message extends Component {

    render() {
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/message/addrecord" component={AddRecord}/>
                        <Route path="/message/messageinfo" component={MessageInfo}/>
                        <Route path="/message/recordinfo" component={RecordInfo}/>
                    </Switch>
                </Suspense>
            </>
        )
    }
}
export default Message
