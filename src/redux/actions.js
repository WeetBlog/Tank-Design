import {GETUSER} from './actions-types'
import { reqLogin } from "../api/login";

const loginSuccessSync = user => ({
    type: GETUSER,
    data: user
});

export const getUser = (account,password) =>{
    return dispatch =>{
        return reqLogin(account, password).then(response => {
            dispatch(loginSuccessSync(response));
            return response.uid;
        });
    }
}