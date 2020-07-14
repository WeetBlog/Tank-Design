import {GET_ALL_USER} from './constants.js'

const initState = []

export default function users(state = initState, action){
    const {type ,data} = action
    switch(type){
        case GET_ALL_USER: 
            return data
        default:
            return state
    }

}
