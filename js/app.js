
(function (window) {

var app = new Vue({
		data:{
			todos:JSON.parse(window.localStorage.getItem('todos')? window.localStorage.getItem('todos'):'[]'),
			currentEiditing:''
		},
		computed:{
			remainCount(){
				return this.todos.filter(item => !item.completed).length
			},
			toggleAllStatus: {
				get() {
					return this.todos.every(item => item.completed);
				},
				set() {
					const checked = !this.toggleAllStatus;
					this.todos.forEach(item => {
					  	item.completed = checked
					})
				}
			}

		},
		watch:{
			todos:{
				handler(){
					window.localStorage.setItem('todos',JSON.stringify(this.todos))
				},
				deep:true
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
