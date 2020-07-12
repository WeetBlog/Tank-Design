import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";


// 获取最新动态
export function reqGetNewDynamic(page ,pageSize) {
  return request({
    url: `${BASE_URL}/getdynamic?page=${page}&pageSize=${pageSize}`,
    method: "get",
  });
}

// 获取动态总数
export function reqGetDynamicCount() {
    return request({
      url: `${BASE_URL}/getdynamiccount`,
      method: "get",
    });
  }
