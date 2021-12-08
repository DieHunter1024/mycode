// const blogType = process.argv[2] || "-csdn";

const axios = require("axios");
const defaultVal = {
  type: "csdn",
  id: "time_____",
};
let global = {};
(function (argv) {
  global.type = getValue(filterArgs(argv, "type")[0], ":") || defaultVal.type;
  global.id = getValue(filterArgs(argv, "id")[0], ":") || defaultVal.id;
})(process.argv);
let blogConfig = {
  csdn: {
    pageConfig: {
      page: 1,
      size: 3,
      businessType: "lately",
    },
    blogListUrl:
      "https://blog.csdn.net/community/home-api/v1/get-business-list",
    blogItemUrl:
      "https://bizapi.csdn.net/blog-console-api/v1/editor/getArticle",
    getBlogList() {
      return axios.get(this.blogListUrl, {
        params: {
          username: global.id,
          ...this.pageConfig,
        },
      });
    },
    getBlogItem(id) {
      return axios.get(this.blogItemUrl, {
        params: {
          id,
        },
      });
    },
  },
};

init();
function init() {
  initAxios();
  blogConfig[global.type]
    .getBlogList()
    .then((res) => {
      return asyncGetBlogInfo(res.data.list);
    })
    .then((res) => {
        console.log(res)
    });
}
// script参数判断
function filterArgs(args, key) {
  return args.filter((_) => _.includes(key));
}
// 拆分字符串
function getValue(str, keyWord) {
  return typeof str === "string" && str.split(keyWord)[1];
}
//获取所有博客详情
function asyncGetBlogInfo(list) {
  return Promise.all(
    list.map((_) => {
      return blogConfig[global.type].getBlogItem(getValue(_.url, "details/"));
    })
  );
}
//响应拦截器
function initAxios() {
  axios.interceptors.response.use(
    function ({ data }) {
      if (data.code === 200) {
        return data;
      }
      return Promise.reject(data);
    },
    function (error) {
      // 对响应错误做点什么
      console.log(error);
      return Promise.reject(error);
    }
  );
}
