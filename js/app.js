
(function (window) {
	var todos = [
		// {
		// 	id: 0,
		// 	title: '吃饭',
		// 	completed: true
		// },
		// {
		// 	id: 1,
		// 	title: '睡觉',
		// 	completed: false
		// },
		// {
		// 	id: 2,
		// 	title: '游戏',
		// 	completed: false
		// },
	];
var app = new Vue({
		data:{
			todos,
			currentEiditing:''
		},
		computed:{
			remainCount(){
				return this.todos.filter(item => !item.completed).length
			}

		},
		methods:{
			handleAddTodo(e){
			   var target = e.target;
			   var value = target.value.trim();
			   if(value){
				   this.todos.push({
					   id:this.todos.length,
					   title: value,
					   completed:false
				   })
			   }
			   target.value = ""
			},
			handleToggleAll(e){
				const checked = e.target.checked;
				this.todos.forEach(item => {
					item.completed = checked
				})

			},
			handleRemoveTodo(index){
              this.todos.splice(index,1)
			},
			getEditingHandle(id){
                this.currentEiditing = id;
			},
			handleEditTodo( item,index,e ){
				const target = e.target;
				var value = target.value;
				if(!value){
                    this.todos.splice(index,1)
				}else{
					item.title = value
				}
				this.currentEiditing = null
			},
			handleClearCompleteTodo() {
			   for(var i=0;i<this.todos.length;i++){
				   var item = this.todos[i]
                  if(item.completed){
					   this.todos.splice(i,1)
					   i--
				  }
			   }
			}
		}
		
	}).$mount('#app');
})(window);
