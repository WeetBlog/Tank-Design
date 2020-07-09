import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";

// 获取课程一级分类数据(分页)
export function reqLogin(account,password) {
  return request({
    url: `${BASE_URL}/getuserbyid`,
    method: "post",
    data:{
        account,password
    }
  });
}