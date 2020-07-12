import {combineReducers} from 'redux'

import login from './login'
import user from './user'

import {componentName} from '../../components/Main/redux'


export default combineReducers({
    login,
    user,
    componentName
})