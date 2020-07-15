import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";

// 添加博客分类
export function reqAddSort(sname) {
  return request({
    url: `${BASE_URL}/addsort`,
    method: "put",
    data: {
      sname
    }
  });
}

// 获取所有分类
export function reqGetAllSort() {
  return request({
    url: `${BASE_URL}/getsort`,
    method: "get"
  });
}

// 校验分类名称是否重复
export function reqRuleSortNam(sname) {
  return request({
    url: `${BASE_URL}/rulesortname`,
    method: "post",
    data:{
      sname
    }
  });
}
