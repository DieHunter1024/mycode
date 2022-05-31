# TaskQueue



Task queue



####Introduction



Nodejs task queue is a solution for high concurrency peak shaving of requests, IO operations or other asynchronous operations



####Installation tutorial



1. pnpm i

2. pnpm build



####Instructions for use



1. Pnpm build

2. Pnpm example

3. Pnpm debug (debugging source code)



####Usage introduction



#####Slice length maxlen



const taskQueue = new TaskQueue({ maxLen: 10 });



#####A queue

const task = {

name,

children: [],

};



#####Push several functions in a single queue

task.children.push(syncFn.bind(null, "args"));



#####Subsequent operations will be triggered after all functions in a queue are executed

taskQueue.push(task).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});



#####Delete the first three asynchronous functions

taskQueue. unshift(3)



#####Initialize the current queue

taskQueue. clear()