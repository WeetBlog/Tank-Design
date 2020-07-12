import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";

// 通过id获取user信息
export function reqGetUserInfo(id) {
  return request({
    url: `${BASE_URL}/getuserbyid?id=${id}`,
    method: "get",
  });
}


// 获取用户总数
export function reqGetUserCount() {
  return request({
    url: `${BASE_URL}/getusercount`,
    method: "get",
  });
}


// 获取最近访客
export function reqGetUserLastOnline() {
  return request({
    url: `${BASE_URL}/getlastonlineuser`,
    method: "get",
  });
}