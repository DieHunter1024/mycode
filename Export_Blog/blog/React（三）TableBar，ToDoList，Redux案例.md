---
title:  React（三）TableBar，ToDoList，Redux案例 
date:  2018-12-27 23:56:3111-1712-2401-1901-1110-0808-0209-1907-1406-2406-2606-1201-2610-2012-3106-2207-0912-0612-1802-04 
---
### 直接上代码：

TableBar:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Document</title>
  <script src="./react.min.js"></script>
  <script src="./react-dom.min.js"></script>
  <script src="./browser.min.js"></script>
  <style>
    * {
        margin: 0;
        padding: 0;
      }
      body{
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      ul {
        list-style: none;
      }
      .title li {
        float: left;
        background: lightcoral;
        width: 100px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
      }
      #tabbar {
        width: 500px;
        margin: 50px auto 0;
      }
      .title .change{
          background: lightgreen;
      }
      .area li{
        text-align: center;
        width: 100%;
        padding: 10px 0;
        background: lightblue;
      }
    </style>
</head>

<body>
  <div id="tabbar"></div>
  <script type="text/babel">
    var Tab = React.createClass({
        getDefaultProps() {
          return {
            list: [//数据
              {
                name: "北京",
                area: [
                  "东城区",
                  "西城区",
                  "崇文区",
                  "宣武区",
                  "朝阳区",
                  "丰台区",
                  "石景山区",
                  "海淀区",
                  "门头沟区",
                  "房山区",
                  "通州区",
                  "顺义区",
                  "昌平区",
                  "大兴区",
                  "平谷区",
                  "怀柔区",
                  "密云县",
                  "延庆县"
                ]
              },
              {
                name: "上海",
                area: [
                  "黄浦区",
                  "卢湾区",
                  "徐汇区",
                  "长宁区",
                  "静安区",
                  "普陀区",
                  "闸北区",
                  "虹口区",
                  "杨浦区",
                  "宝山区",
                  "闵行区",
                  "嘉定区",
                  "松江区",
                  "金山区",
                  "青浦区",
                  "南汇区",
                  "奉贤区",
                  "浦东新区",
                  "崇明县"
                ]
              },
              {
                name: "广州",
                area: [
                  "越秀区",
                  "荔湾区",
                  "海珠区",
                  "天河区",
                  "白云区",
                  "黄埔区",
                  "番禺区",
                  "花都区",
                  "南沙区",
                  "萝岗区",
                  "增城市",
                  "从化市"
                ]
              },
              {
                name: "深圳",
                area: [
                  "福田区",
                  "罗湖区",
                  "南山区",
                  "宝安区",
                  "龙岗区",
                  "盐田区"
                ]
              },
              {
                name: "南昌",
                area: [
                  "东湖区",
                  "西湖区",
                  "青云谱区",
                  "湾里区",
                  "青山湖区",
                  "新建县",
                  "南昌县",
                  "进贤县",
                  "安义县"
                ]
              }
            ]
          };
        },
        getInitialState() {
          return {//默认值
            str: "南昌",
            arr:[
                  "东湖区",
                  "西湖区",
                  "青云谱区",
                  "湾里区",
                  "青山湖区",
                  "新建县",
                  "南昌县",
                  "进贤县",
                  "安义县"
                ]
          };
        },
        render() {
          return (
            <div>
              <ul className="title">{this.init()}</ul>{/*初始化数据，遍历生成li*/}
              <Bar list={this.state.arr}></Bar>{/*传列表到子元素*/}
            </div>
          );
        },
        init() {
          var arr = [];
          for (var i = 0; i < this.props.list.length; i++) {
            arr.push(//将元素放到数组中，绑定事件，让单击到的那个li改变颜色，绑定事件时将全局this，用bind绑定到事件函数
              <li className={this.state.str===this.props.list[i].name?'change':''} onClick={this.changeName.bind(this,this.props.list[i].name,this.props.list[i].area)}>
                {this.props.list[i].name}
              </li>
            );
          }
          return arr;
        },
        changeName(count,area) {
          if (count===this.state.str) {
              return;
          }
          this.setState({ str: count ,arr:area});//动态设置新的数据
        }
      });
      var Bar = React.createClass({
        render() {
          return (
            <ul className='area'>
            {
              this.init()
            }
          </ul>
          );
          
        },
        init() {//类似于上面的父组件，将传过来的数据遍历渲染到页面
          var arr = [];
          for (var i = 0; i < this.props.list.length; i++) {
            arr.push(
              <li>
                {this.props.list[i]}
              </li>
            );
          }
          return arr;
        }
      });
      ReactDOM.render(<Tab />, tabbar);
    </script>
</body>

</html>
```

ToDoList：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./react.min.js"></script>
    <script src="./react-dom.min.js"></script>
    <script src="./browser.min.js"></script>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #todo{
            width: 900px;
            margin: 50px auto 0;
        }
        .text{
            width: 500px;
            height: 30px;
            margin-left: 200px;
        }
        .btn{
            width: 100px;
            height: 30px;
        }
        .list{
            background: lightblue;
        }
        .list li{
            height: 50px;
            line-height: 50px;
        }
        ul{
            list-style: none;
        }
        .finish{
            height: 50px;
            line-height: 50px; 
            background: lightgray;
            width: 110px;
            float: right;
            text-align: center;
        }
        .unfinish{
            height: 50px;
            line-height: 50px;
            background: lightseagreen;
            width: 110px;
            float: right;
            text-align: center;
        }
        .list button{
            float: right;
            vertical-align: middle;
            height: 50px;
            line-height: 50px;
            width: 110px;
        }
        .time{
            height: 50px;
            line-height: 50px;
            width: 110px;
            float:right;
            background: lightcyan;
        }
    </style>
</head>

<body>
    <div id="todo"></div>
    <script type="text/babel">
        var Todo = React.createClass({
                getInitialState() {
                    return {
                        arr:[]//初始化消息容器
                    };
                },
                render() {
                    return (
                        <div>{/*组件的一些布局，onclick触发父元素的提交事件，将每次改变的数据以及子组件执行父组件中对数据的操作函数传递到子组件*/}
                            <input className='text' id='txt' type="text"/>
                            <button className='btn' onClick={this.clickHandler}>提交
                            </button>
                            <List listData={this.state.arr} changeItem={this.changeItem}/>
                        </div>
                    );
                },
                clickHandler(){
                    if(!txt.value) return;
                    var list = this.state.arr||[];//初始化点击前的容器
                    list.push({id:this.state.arr.length,concent:txt.value,time:new Date().toLocaleTimeString(),finish:false});//点击时更新数据
                    this.setState({arr:list})//将数据更新到state中
                },
                changeItem(item,how){//子组件执行的函数，删除和修改状态
                    for (var i = 0; i < this.state.arr.length; i++) {//遍历数据
                        if (how=='delete'&&this.state.arr[i].id===item) {//根据参数的类型判断修改状态还是删除
                            this.state.arr.splice(i,1);
                            break;
                        }else if(how=='finish'&&this.state.arr[i].id===item){
                            this.state.arr[i].finish=true;
                            break;
                        }
                    }
                    this.setState({})//更新state
                }
            });
            var List = React.createClass({
                render() {
                return (
                    <ul className='list'>
                    {
                    this.init()//初始化，遍历数据新建li
                    }
                </ul>
                );
                },
                init() {
                var arr = [];//初始化容器
                for (var i = 0; i < this.props.listData.length; i++) {
                    arr.push(
                    <li>
                        {this.props.listData[i].concent}{/*显示内容*/}
                        <span className='time'>{this.props.listData[i].time||''}</span>{/*显示新建的时间*/}
                        {this.props.listData[i].finish?<span className='finish'>已完成</span>:<span className='unfinish' onClick={this.changeOne.bind(this,this.props.listData[i].id,'finish')}>未完成</span>}{/*更改状态，调用子组件的函数触发父组件的函数*/}
                        <button onClick={this.changeOne.bind(this,this.props.listData[i].id,'delete')}>删除</button>{/*删除，调用子组件的函数触发父组件的函数*/}
                    </li>
                    );
                }
                return arr;
                },
                changeOne(id,how){//执行父组件的函数
                    this.props.changeItem(id,how)
                }
            });
            ReactDOM.render(<Todo/>,todo);
        </script>
</body>

</html>
```

# Redux案例:

待办事项和计算器（GitHub）：[https://github.com/ZbyA/React\_todolist\_computer.git](https://github.com/ZbyA/React_todolist_computer.git)（首先在项目内用npm install（默认下依赖包）

然后运行项目即可）