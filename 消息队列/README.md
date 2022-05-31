# TaskQueue

任务队列

#### 介绍

nodejs 任务队列, 针对请求、IO 操作或其他异步操作高并发削峰的解决方案

#### 安装教程

1.  pnpm i
2.  pnpm build

#### 使用说明

1.  pnpm build（构建）
2.  pnpm example（示例）
3.  pnpm debug（调试源码）

#### 用法介绍

##### 切片长度maxLen

const taskQueue = new TaskQueue({ maxLen: 10 });

##### 一个队列
const task = {
    name,
    children: [],
};

##### 单个队列中的函数，有几个就push几个
task.children.push(syncFn.bind(null, "args"));

##### 某个队列中的函数全部执行完成后会触发后续操作
taskQueue.push(task).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

##### 删除前三个异步函数
taskQueue.unshift(3)

##### 初始化当前队列
taskQueue.clear()