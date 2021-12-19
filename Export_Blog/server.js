const axios = require("axios");
const cheerio = require("cheerio");
const html2md = require("html-to-md");
const singleLineLog = require("single-line-log").stdout;
const path = require("path");
const fs = require("fs");
const { MessageCenter } = require("./lib/MessageCenter");
// 配置默认值
const defaultVal = {
  type: "csdn",
  id: "time_____",
};
// 各类博客的配置项
let blogConfig = {
  csdn: {
    // 博客分页：page:第几页,size:分页大小,businessType:排序方式，blog表示博客
    pageConfig: {
      page: 1,
      size: 20,
      businessType: "blog",
    },
    totalPage: 1, //总页数
    blogList: [],
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
      getContent: ($) => $("#content_views").html(),
      getTagsCategory: ($) => {
        const target = $(".tag-link");
        let tagsCategory = {
          tags: [],
          category: [],
        };
        for (let i = 0; i < target.length; i++) {
          const tag = target[i].children[0]["data"];
          // 通过属性data-report-click判断分类和标签
          (Object.keys(target[i].attribs).includes("data-report-click") &&
            tagsCategory["tags"].push(tag)) ||
            tagsCategory["category"].push(tag);
        }
        return tagsCategory;
      },
    },
  },
};
// 全局变量
let global = {};
// 异步函数
const asyncFunction = {
  // 分页获取博客列表
  getBlogList: async () => {
    const { data } = await blogConfig[global.type].getBlogList();
    blogConfig[global.type].totalPage = getTotalPage(
      data.total,
      blogConfig[global.type].pageConfig.size
    );
    blogConfig[global.type].blogList = concatList(
      data.list,
      blogConfig[global.type].blogList
    );
    data.list.forEach((_) => console.log(_.title));
    if (isInTotalPage()) {
      console.log(
        `获取列表成功,共${blogConfig[global.type].blogList.length}篇文章`
      );
      return MessageCenter.emit(
        "getBlogInfo",
        blogConfig[global.type].blogList
      );
    }
    await asyncFunction["getBlogList"]();
  },
  //批量获取博客详情
  getBlogInfo: async (blogList, count = 0, total) => {
    !total && (total = blogList.length);
    const blogItem = blogList[count];
    if (count++ >= total) {
      console.log("获取文章内容成功");
      return MessageCenter.emit("loadBlog", blogList);
    }
    // 进度条
    progressBar("获取文章内容中", count / total);
    blogItem.htmlContent = await blogConfig[global.type].getBlogItem(
      blogItem.url
    );
    asyncFunction["getBlogInfo"](blogList, count, total);
  },
  // 生成博客文件
  loadBlog: async (blogList) => {
    const getTagsCategory = blogConfig[global.type].getBlogInfo.getTagsCategory;
    const content = blogConfig[global.type].getBlogInfo.getContent;
    await Promise.all(
      blogList.map((_) => {
        const $ = cheerio.load(_.htmlContent);
        const { tags, category } = getTagsCategory($);
        return createMdFile(_.title, content($), _.postTime, tags, category);
      })
    );
    MessageCenter.emit("loadFinish");
  },
  loadFinish() {
    console.log("导出成功");
  },
};
// 初始化script参数
(function (argv) {
  global.type = getValue(filterArgs(argv, "type")[0], ":") || defaultVal.type;
  global.id = getValue(filterArgs(argv, "id")[0], ":") || defaultVal.id;
  initAxios();
  init();
  MessageCenter.emit("getBlogList");
})(process.argv);
function init() {
  MessageCenter.on("getBlogList", asyncFunction["getBlogList"]);
  MessageCenter.on("getBlogInfo", asyncFunction["getBlogInfo"]);
  MessageCenter.on("loadBlog", asyncFunction["loadBlog"]);
  MessageCenter.on("loadFinish", asyncFunction["loadFinish"]);
}
// 生成进度条
function progressBar(label, percentage, totalBar = 50) {
  const empty = "░";
  const step = "█";
  const target = (percentage * totalBar).toFixed();
  let bar = [];
  for (let i = 0; i < totalBar; i++) {
    (target >= i && (bar[i] = step)) || (bar[i] = empty);
  }
  singleLineLog(
    `${label || ""}  ${bar.join("")}${(100 * percentage).toFixed(2)}%`
  );
}
// 获取页数
function getTotalPage(total, size) {
  return Math.round(total / size);
}
// 是否是最后一页
function isInTotalPage() {
  return (
    blogConfig[global.type].pageConfig.page++ >=
    blogConfig[global.type].totalPage
  );
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
// 连接列表数组
function concatList(list, targetList) {
  return [...targetList, ...list];
}

// 生成博客md,title文章标题, content文章内容, date文章时间, tags文章标签, category文章分类
function createMdFile(title, content, date, tags, category) {
  return writeFile(
    `${replaceKey(title)}.md`,
    `${createMdTemplete(title, date, tags, category)}${html2md(content)}`,
    "./blog/"
  );
}
// md文件模板配置
function createMdTemplete(title, date, tags, category) {
  return `---\ntitle:  ${title} \ndate:  ${date} \ntags:  [${tags}] \ncategory:  [${category}] \n---\n`;
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
