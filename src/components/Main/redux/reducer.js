import {GET_COMPONENT_NAME} from './constants.js'

const initState = {
    firstName : "数据统计",
    secondName : "",
    lastName : "",
}

export default function componentName(state = initState, action){
    const {type ,data} = action
    switch(type){
        case GET_COMPONENT_NAME: 
            return data
        default:
            return state
    }

}