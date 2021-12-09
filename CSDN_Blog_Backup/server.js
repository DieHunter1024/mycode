// const blogType = process.argv[2] || "-csdn";

const axios = require("axios");
const cheerio = require("cheerio");
const html2md = require("html-to-md");
const path = require("path");
const fs = require("fs");
// 配置默认值
const defaultVal = {
  type: "csdn",
  id: "time_____",
};
// 全局变量
let global = {};
// 初始化script参数
(function (argv) {
  global.type = getValue(filterArgs(argv, "type")[0], ":") || defaultVal.type;
  global.id = getValue(filterArgs(argv, "id")[0], ":") || defaultVal.id;
})(process.argv);
// 各类博客的配置项
let blogConfig = {
  csdn: {
    // 博客分页：page:第几页,size:分页大小,businessType:排序方式
    pageConfig: {
      page: 1,
      size: 1,
      businessType: "lately",
    },
    // 博客列表
    blogListUrl:
      "https://blog.csdn.net/community/home-api/v1/get-business-list",
    // 获取博客列表
    getBlogList() {
      return axios.get(this.blogListUrl, {
        params: {
          username: global.id,
          ...this.pageConfig,
        },
      });
    },
    getBlogItem(blog) {
      return axios.get(blog);
    },
    // 爬取数据的标签，有兴趣自己可以加
    getBlogInfo: {
      getTitle: function ($) {
        console.log($("#articleContentId").text());
        return $("#articleContentId").text();
      },
      getContent: function ($) {
        return $("#content_views").html();
      },
      getTime: function ($) {
        return $(".time").text();
      },
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
      const title = blogConfig[global.type].getBlogInfo.getTitle;
      const content = blogConfig[global.type].getBlogInfo.getContent;
      const time = blogConfig[global.type].getBlogInfo.getTime;
      return Promise.all(
        res.map((_) => {
          const $ = cheerio.load(_);
          return createMdFile(title($), content($), time($));
        })
      );
    })
    .then((res) => {
      console.log("导出成功");
    });
}
// npm script参数判断
function filterArgs(args, key) {
  return args.filter((_) => _.includes(key));
}
// 拆分字符串
function getValue(str, keyWord) {
  return typeof str === "string" && str.split(keyWord)[1];
}
// 替换特殊字符
function replaceKey(str) {
  const exp = /[`\/：*？\"<>|\s]/g;
  // /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
  return str.replace(exp, " ");
}
//获取所有博客详情
function asyncGetBlogInfo(list) {
  return Promise.all(
    list.map((_) => blogConfig[global.type].getBlogItem(_.url))
  );
}
// 生成博客md
function createMdFile(title, content, date) {
  return writeFile(
    `${replaceKey(title)}.md`,
    `${createMdTemplete(title, date)}${html2md(content)}`,
    "./blog/"
  );
}
// md文件模板配置
function createMdTemplete(title, date) {
  return `---\ntitle:  ${title} \ndate:  ${date} \n---\n`;
}
// 写入文件
function writeFile(filename, data, dir) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, dir + filename),
      data,
      (err) => (err && reject(err)) || resolve(err)
    );
  });
}
//响应拦截器
function initAxios() {
  axios.interceptors.response.use(
    function ({ data, status }) {
      if (data.code === 200 || status === 200) {
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
