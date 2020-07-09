import { lazy } from "react";

const Home = () => lazy(() => import("../components/Home"));
const User = () => lazy(() => import("../pages/User"));

export default {
  Home,
  User,
};
