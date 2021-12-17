---
title:  Vue（三）两个案例（todolist，tableBar） 
date:  2018-12-11 11:57:0201-0203-0107-0804-2005-2907-2210-1107-0308-2203-2512-1004-0910-0810-1704-0910-0810-0804-14 
---
### 待办事项：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            #addItem{
        font-size: 28px;
        vertical-align: middle;  
    }
    #txt{
        height: 30px;
        width: 250px;
        vertical-align: middle;
    }
    li{
        list-style: none;
        width: 400px;
        height: 70px;
        line-height: 70px;
        border: 1px solid lightgreen;
    }
    li:hover{
        background: lightcoral;
    }
</style>
        <script src="./vue.js"></script>
    </head>

    <body>
        <div id="box">
            <input id="txt" type="text"><button id="addItem" v-on:click='createList'>+</button>
            <ul>
                <li v-for='(item,index) in list'>{{item.value}}
                    <span v-if='item.sure' style="color:red;font-size: 18px">Be Sure</span>
                    <button v-on:click="delItem(index)">Del</button>
                    <button v-if='!item.sure' v-on:click='item.sure=true'>Sure</button>
                </li>
            </ul>
        </div>
        <script>
            let add = new Vue({
                el: '#box',
                data: {
                    list: []
                },
                methods: {
                    createList() {
                        this.list.push({
                            value: txt.value,
                            sure: false
                        });
                    },
                    delItem(num){
                        this.list.splice(num,1);
                    }
                }
            });
        </script>
    </body>

</html>
```

### table选项卡：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            li {
                list-style: none;
                text-align: center;
            }

            #box {
                width: 280px;
                margin: 50px auto;
                background: lightblue;
            }

            #box:after {
                content: '';
                height: 0;
                clear: both;
                visibility: hidden;
                display: block;
            }

            #title li {
                width: 50px;
                height: 30px;
                float: left;
                padding: 20px 15px;
            }

            #title li:hover {
                background: lightcoral;
            }

            #content {
                display: block;
            }
        </style>
        <script src="./vue.js"></script>
    </head>

    <body>
        <div id="box">
            <ul id="title">
                <li v-for='(item,index) in list' v-on:click='changeContent(index)'>{{index}}</li>
            </ul>
            <ul id="content">
                <li v-for='(item,index) in list[str]'>{{item}}</li>
            </ul>
        </div>
        <script>
            var vm = new Vue({
                el: '#box',
                data: {
                    list: {
                        'movie': ['aaa', 'bbb', 'ccc', 'ddd', 'aaa', 'bbb', 'ccc', 'ddd', 'aaa', 'bbb', 'ccc',
                            'ddd', 'aaa', 'bbb', 'ccc', 'ddd'
                        ],
                        'game': ['eee', 'fff', 'ggg', 'hhh', 'eee', 'fff', 'ggg', 'hhh', 'eee', 'fff', 'ggg',
                            'hhh', 'eee', 'fff', 'ggg', 'hhh', 'eee', 'fff', 'ggg', 'hhh'
                        ],
                        'music': ['iii', 'jjj', 'kkk', 'lll', 'mmm', 'iii', 'jjj', 'kkk', 'lll', 'mmm', 'iii',
                            'jjj', 'kkk', 'lll', 'mmm', 'iii', 'jjj', 'kkk', 'lll', 'mmm', 'iii', 'jjj',
                            'kkk', 'lll', 'mmm'
                        ]
                    },
                    str: ''
                },
                methods: {
                    changeContent(data) {
                        this.str = data;
                    }
                }
            });
        </script>
    </body>

</html>
```