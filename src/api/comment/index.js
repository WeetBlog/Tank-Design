import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";

// 获取所有评论
export function reqGetComments(page, pageSize) {
    return request({
        url: `${BASE_URL}/getcomments`,
        method: "post",
        data: {
            page, pageSize
        }
    });
}

// 获取评论总数
export function reqCountComment() {
    return request({
        url: `${BASE_URL}/countcomment`,
        method: "get"
    });
}

// 删除评论
export function reqDeleteComment(id) {
    return request({
        url: `${BASE_URL}/deletecomment`,
        method: "delete",
        data:{
            id
        }
    });
}