import { lazy } from "react";

const Home = () => lazy(() => import("../components/Home"));
const User = () => lazy(() => import("../pages/User"));
const SetUser = () => lazy(() => import('../pages/User/components/SetUser'))

export default {
  Home,
  User,
  SetUser,
};
