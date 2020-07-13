import { lazy } from "react";

const Home = () => lazy(() => import("../components/Home"));
const User = () => lazy(() => import("../pages/User"));
const SetUser = () => lazy(() => import('../pages/User/components/SetUser'))
const Notice = () => lazy(()=> import('../pages/User/components/Notice'))
const Blog = () => lazy(()=> import('../pages/Blog'))
const AddBlog = () => lazy(()=> import('../pages/Blog/components/addBlog'))
const UpdateBlog = () => lazy(()=>import('../pages/Blog/components/UpdateBlog'))
const UpdateBlogInfo = () => lazy(()=>import('../pages/Blog/components/UpdateBlogInfo'))

export default {
  Home,
  User,
  SetUser,
  Notice,
  Blog,
  AddBlog,
  UpdateBlog,
  UpdateBlogInfo
};
