import {GET_ALL_BLOG} from './constants.js'

const initState = []

export default function blogs(state = initState, action){
    const {type ,data} = action
    switch(type){
        case GET_ALL_BLOG: 
            return data
        default:
            return state
    }

}
