import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";


// 获取评论总数
export function reqGetMessageCount() {
  return request({
    url: `${BASE_URL}/getmessagecount`,
    method: "get",
  });
}
