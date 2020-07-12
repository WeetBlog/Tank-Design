import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";

// 通过博客总数
export function reqGetBlogCount() {
  return request({
    url: `${BASE_URL}/getblogcount`,
    method: "get",
  });
}

