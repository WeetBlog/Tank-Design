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

// 获取所有用户信息
export function reqGetAllUser() {
  return request({
    url: `${BASE_URL}/getuser`,
    method: "get",
  })
}

// 向指定用户发送一条通知
export function reqAddMessageByUid(uid, value) {
  return request({
    url: `${BASE_URL}/addnewmessagebyid`,
    method: "post",
    data: {
      uid, value
    }
  })
}

// 向指定用户发送一条通知
export function reqAddMessageManyPeople(ids, value) {
  return request({
    url: `${BASE_URL}/addnewmessagetoall`,
    method: "post",
    data: {
      ids, value
    }
  })
}



// 删除一位用户
export function reqDeleteUserById(uid) {
  return request({
    url: `${BASE_URL}/deleteUserbyId`,
    method: "delete",
    data: {
      uid
    }
  })
}