import { reqGetAllUser } from "../../../api/user";
import {GET_ALL_USER} from './constants'

const getAllUserSync = data => ({
    type: GET_ALL_USER,
    data: data
});

export const getAllUser = () =>{
    return dispatch =>{
        return reqGetAllUser().then(response => {
            dispatch(getAllUserSync(response));
            return response;
        });
    }
}

