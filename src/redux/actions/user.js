import {GET_USER_INFO} from '../constants/user.js'
import {reqGetUserInfo} from '../../api/user'

const getUserInfoSync = user => ({
    type : GET_USER_INFO,
    data : user
})

export const getUserInfo = (id) => {
    return dispatch =>{
        return reqGetUserInfo(id).then(res =>{
            dispatch(getUserInfoSync(res))
            return res
        })
    }
};