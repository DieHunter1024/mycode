---
title:  小程序入坑记：TodoList 
date:  2019-03-07 16:55:3301-3105-0908-1611-1903-0909-2303-1006-0102-1810-1509-0408-1007-1109-25 
---
## 小程序数据绑定渲染视图使数据与视图的关系显得很清晰

wxml：

```html
<!--pages/todoList/toduList.wxml-->
<input class='addItem' placeholder-style='font-size:16px;' placeholder='输入事项' bindinput='changeStr' value='{{addStr}}'></input>
<button class='add' type='primary' bindtap='addTodo'>提交</button>
<view class='listBox'>
  <view class='listItem' wx:for="{{addList}}" wx:key='item.id'>
    <text class='content'>{{item.content}}</text>
    <text class='time'>{{item.time}}</text>
    <button class='finish' disabled="{{item.finish}}" bindtap='tapHandler' data-id='{{item.id}}'>{{item.finish?'已完成':'完成'}}</button>
    <button class='del' type='warn' bindtap='tapHandler' data-id='{{item.id}}'>删除</button>
  </view>
</view>
```

wxss：

```css
.addItem {
  position: fixed;
  top: 0;
  left: 0;
  width: 550rpx;
  height: 60rpx;
  background: #ccc;
  padding-left: 30rpx;
  border-radius: 10rpx;
  display: inline-block;
  z-index: 10;
}

.add {
  position: fixed;
  top: 0;
  right: 0;
  height: 60rpx;
  line-height: 60rpx;
  display: inline-block;
  width: 150rpx;
  font-size: 30rpx;
  z-index: 10;
}

.content {
  display: inline-block;
  /* background: lightcoral; */
  width: 250rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.time {
  /* background: lightblue; */
  vertical-align: middle;
}

.listBox {
  margin-top: 60rpx;
}

.listItem {
  font-size: 14px;
  padding-top: 20rpx;
}

.del, .finish {
  display: inline-block;
  font-size: 22rpx;
  width: 100rpx;
  height: 60rpx;
  line-height: 60rpx;
  vertical-align: middle;
}
```

js：

```javascript
// pages/todoList/toduList.js
Page({
  data: {
    addStr: '', //输入的内容，将该值绑定到input的value中
    addList: [] //事项列表
  },
  changeStr(e) {
    this.setData({
      addStr: e.detail.value //当用户输入值时，修改当前事项内容
    })
  },
  addTodo(e) {
    var str = this.data.addStr.trim() //去除字符前后空格
    if (str.length === 0) {
      return;
    }
    var addList = this.data.addList;
    var date = new Date() //生成提交的时间
    var time = date.toLocaleString(); //转换为标准时间
    var obj = { //每个事项的内容
      id: addList.length, //将id设为数组的长度，方便后续操作
      content: str, //事项内容
      time: time, //提交时间
      finish: false //是否已完成
    }
    addList.push(obj) //将该事项添加到事项列表中
    this.setData({ //刷新列表，置空input内容
      addList,
      addStr: ''
    })
  },
  tapHandler(e) { //用户点击完成或删除时触发
    var addList = this.data.addList
    var id = e.target.dataset.id //获取时间传递的id值
    var type = e._relatedInfo.anchorTargetText //获取点击种类：删除或完成
    for (let i = 0; i < addList.length; i++) { //遍历列表
      if (addList[i].id === id) {
        switch (type) {
          case '完成':
            addList[i].finish = true; //点击完成时执行
            break;
          case '删除':
            addList.splice(i, 1); //点击删除时执行
            break;
          default:
            break;
        }
        this.setData({ //刷新列表
          addList
        })
      }
    }
  }
})
```