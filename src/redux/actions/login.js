import { reqLogin } from "../../api/login";
import {LOGIN_SUCCESS ,QUIT_LOGIN} from '../constants/login'

const loginSuccessSync = user => ({
    type: LOGIN_SUCCESS,
    data: user
});

export const getLoginUser = (account,password) =>{
    return dispatch =>{
        return reqLogin(account, password).then(response => {
            dispatch(loginSuccessSync(response));
            return response;
        });
    }
}
export const quitLogin = (token) => ({
    type: QUIT_LOGIN,
    data: token
});