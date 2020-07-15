import {GET_ALL_SORT} from './constain.js'
import {reqGetAllSort} from '../../../api/sort'

const getAllSortSync = data => ({
    type: GET_ALL_SORT,
    data: data
});

export const getAllSort = () =>{
    return dispatch =>{
        return reqGetAllSort().then(response => {
            dispatch(getAllSortSync(response));
            return response;
        });
    }
}
