---
title:  JS表格小案例 
date:  2018-11-29 19:47:10 
---
## 创建一个表单，根据表单填写内容，创建表格行内容，每行后面有删除按钮，删除后可以删除该行一个搜索文本框，输入内容，点击按钮显示当前模糊查找到所有内容，显示在表格内

```html
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			table {
				width: 800px;
				border: 1px solid lightcoral;
				border-collapse: collapse;
			}
		</style>
	</head>

	<body>
		<input type="text" id="search" placeholder="search" />
		<input type="button" value="搜索" id="find" />
		<input type="text" id="name" placeholder="name" />
		<input type="text" id="psd" placeholder="password" />
		<input type="text" id="num" placeholder="number" />
		<input type="button" value="提交" id="send" onclick="add()" />
		<table id="tab">

		</table>
		<script type="text/javascript">
			//				通过ID获取所有元素
			var search = document.getElementById("search");
			var find = document.getElementById("find");
			var name1 = document.getElementById("name");
			var psd1 = document.getElementById("psd");
			var num1 = document.getElementById("num");
			var send = document.getElementById("send");
			var tab = document.getElementById("tab");
			//				定义一个数组,用来存放所有的输入的对象
			var arr = [];

			function add() {
				//					判断输入是否为空
				if (name1.value && psd1.value && num1.value) {
					//						定义对象存放输入的属性及属性值
					var obj = {};
					//					创建每行的tr以及删除键a
					var tr = document.createElement("tr");
					var aa = document.createElement("a");
					aa.textContent = "Del";
					tab.appendChild(tr);
					//					向对象添加用户输入的属性及属性值
					obj.name = name1.value;
					obj.psd = psd1.value;
					obj.num = num1.value;
					//					遍历对象输出到每行的tr
					for (var str in obj) {
						var td = document.createElement("td");
						td.textContent = str + " : " + obj[str];
						tr.appendChild(td);
					}

					tr.appendChild(aa);
					//					对删除键添加点击事件
					aa.addEventListener("click", del);
					//					创建点击事件,使tr删除
					function del(e) {
						e = e || window.event;
						tr.remove();

					}
					//					每次执行后清空输入内容
					name1.value = psd1.value = num1.value = "";
					//					将每次的对象放入数组中
					arr.push(obj);
					//					console.log(arr);
					//					为搜索键添加监听事件
					find.addEventListener("click", clickHandler);
					//					新建点击函数,遍历数组,查找搜索的关键字
					function clickHandler(e) {
						e = e || window.event;
						var str = search.value;
						var data = arr.filter(function (t) {
							return t.name.indexOf(str) > -1;
						});
						//		            清空表格
						tab.textContent = "";
						//遍历数组对象
						for (var j = 0; j < data.length; j++) {
							//新建每一行
							var tr = document.createElement("tr");
							var aa = document.createElement("a");
							aa.textContent = "Del";
							tab.appendChild(tr);
							//新建每行的每一项
							for (var str in data[j]) {
								var td = document.createElement("td");
								td.textContent = str + " : " + data[j][str];
								tr.appendChild(td);
							}
						}
					}
				} else {
					alert("Error");
				}
			}
		</script>
	</body>

</html>
```