import {GET_ALL_SORT} from './constain.js'

const initState = []

export default function sort(state = initState, action){
    const {type ,data} = action
    switch(type){
        case GET_ALL_SORT: 
            return data
        default:
            return state
    }

}
