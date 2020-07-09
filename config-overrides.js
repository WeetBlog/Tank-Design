const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias,
} = require("customize-cra");

// 引入path模块
//resolve是用于转换路径
const { resolve } = require("path");

// 加功相对路径变成绝对路径
function resolvePath(path) {
  return resolve(__dirname, "src", path);
}

module.exports = override(
  //配置antd的按需引入
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  //配置antd的自定义主题
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    },
  }),
  //用于支持装饰器语法
  addDecoratorsLegacy(),
  //@符提示，支持短路径
  addWebpackAlias({
    "@": resolvePath("./"),
  })
);
