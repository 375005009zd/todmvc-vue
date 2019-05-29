(function (window) {
	var todos = [
		{
			id: 0,
			title: '吃饭',
			completed: true
		},
		{
			id: 1,
			title: '睡觉',
			completed: false
		},
		{
			id: 2,
			title: '游戏',
			completed: false
		},
	];
	new Vue({
		data:{
			todos
		}
		
	}).$mount('#app');
})(window);
