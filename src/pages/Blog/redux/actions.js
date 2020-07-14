import { reqGetAllBlog } from "../../../api/blog";
import {GET_ALL_BLOG} from './constants'

const getAllBlogSync = data => ({
    type: GET_ALL_BLOG,
    data: data
});

export const getAllBlog = (utype,uid) =>{
    return dispatch =>{
        return reqGetAllBlog(utype,uid).then(response => {
            dispatch(getAllBlogSync(response));
            return response;
        });
    }
}

