import {combineReducers} from 'redux'

import login from './login'
import user from './user'

import {componentName} from '../../components/Main/redux'
import {users} from '../../pages/User/redux'
import {blogs} from '../../pages/Blog/redux'
import {sort} from '../../pages/Sort/redux'


export default combineReducers({
    login,
    user,
    users,
    blogs,
    componentName,
    sort
})