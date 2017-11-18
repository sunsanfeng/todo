(function (angular) {
	'use strict';
	/*应用程序主模块*/
	var myApp = angular.module('MyTodoMvc',[]);
	
	//路由配置
	 
	
	/*主控制器*/
	myApp.controller('MainController',['$scope','$location',function($scope,$location){
		//文本框需要一个模型
		$scope.text = '';
		//随机产生唯一id值
		function getId() {
			var id = Math.random();
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === id){
					id = getId();
					break;
				}
			}
			return id;
		}
		
		//任务列表也需要一个模型
		
		//每个任务的结构{id:id,text:'任务名',completed:true}
		$scope.todos = [
			{id: 1, text: '吃饭', completed: false},
			{id:2,text:'睡觉',completed:true},
			{id:3,text:'打豆豆',completed:false},
			{id:4,text:'王者荣耀',completed:false}
		];
		//双击编辑元素
		$scope.currentEditingId = -1;
		$scope.editing = function(id) {
			$scope.currentEditingId = id;
		}
		//编辑完成以后按Enter确定
		$scope.save = function() {
			$scope.currentEditingId = -1;
		}
		//添加任务
		$scope.add = function() {
			$scope.todos.push({
				id: getId(),
				text:$scope.text,
				completed: false
			});
			$scope.text = '';
		};
		//删除任务
		$scope.remove = function(id) {
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id == id){
					$scope.todos.splice(i,1);
					console.log(getId());
					break;
				}
			}
		}
		//清空已经完成的项
		$scope.clear = function(){
			var results = [];
			for(var i=0;i<$scope.todos.length;i++){
				if(!$scope.todos[i].completed) {
					results.push($scope.todos[i]);
				}
			}
			$scope.todos = results;
		}
		//全选
		var now = true;
		$scope.toggleAll = function(){
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed = now;
			}
			now = !now;
		}
		//完成状态判断
		$scope.selector={};
		$scope.$location = $location;
		$scope.$watch('$location.hash()',function(now,old){
			switch (now){
				case '/active':
					$scope.selector = {completed: false};
					break;
				case '/completed':
					$scope.selector = {completed: true};
					break;
				default:
				$scope.selector = {};
					break;
			}
		})
	}])
})(angular);
