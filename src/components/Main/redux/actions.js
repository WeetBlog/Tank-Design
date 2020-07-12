import {GET_COMPONENT_NAME} from './constants.js'

export const getComponentName = (conponent) =>({
    type : GET_COMPONENT_NAME , 
    data : conponent
})