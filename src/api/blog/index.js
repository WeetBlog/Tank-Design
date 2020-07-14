import request from "../../utils/request";

const BASE_URL = "http://180.76.238.89:8080/tank";

// 通过博客总数
export function reqGetBlogCount() {
  return request({
    url: `${BASE_URL}/getblogcount`,
    method: "get",
  });
}

// 发布博客
export function reqAddBlog(blog, user) {
  return request({
    url: `${BASE_URL}/addblog`,
    method: "put",
    data: {
      blog, user
    }
  });
}

// 通过id获取博客详细信息
export function reqGetBlogInfoById(id) {
  return request({
    url: `${BASE_URL}/getblogbyid?id=${id}`,
    method: "get"
  });
}


// 删除博客图片
export function reqDeleteBlogImage(bid , index , num) {
  return request({
    url: `${BASE_URL}/deleteBlogImage`,
    method: "post",
    data:{
      bid , index , num
    }
  });
}

// 获取所有博客简要信息
export function reqGetAllBlog( utype , uid ) {
  return request({
    url: `${BASE_URL}/getblogeasy?utype=${utype}&uid=${uid}`,
    method: "get",
  });
}


// 获取所有博客tags
export function reqUpdateBlogTags( id  , tags ) {
  return request({
    url: `${BASE_URL}/updateblogtagsbyid`,
    method: "put",
    data:{
      id  , tags 
    }
  });
}

// 获取所有博客权限
export function reqUpdateRulesById( id , uid , rule ) {
  return request({
    url: `${BASE_URL}/updateblogrulesbyid`,
    method: "put",
    data:{
      id , uid , rule
    }
  });
}
