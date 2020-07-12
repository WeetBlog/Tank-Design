import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";

// 登入
export function reqLogin(account,password) {
  return request({
    url: `${BASE_URL}/backloginuser`,
    method: "post",
    data:{
        account,password
    }
  });
}
