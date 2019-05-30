
(function (window) {

		// 注册一个全局自定义指令 `v-focus`
		Vue.directive('focus', {
			// 当被绑定的元素插入到 DOM 中时……
			inserted: function (el) {
			// 聚焦元素
			el.focus()
			}
		})

		// 注册一个全局自定义指令 `v-dbl-focus`
		Vue.directive('dbl-focus', {
			// 当被绑定的元素插入到 DOM 中时……
			update: function (el,binding) {
				if(binding){
					// 聚焦元素
					el.focus()
				}
			
			}
		})

   window.app = new Vue({
		data:{
			todos:JSON.parse(window.localStorage.getItem('todos')? window.localStorage.getItem('todos'):'[]'),
			currentEiditing:'',
			filterStatus:''
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
			},
			filterTodos() {
				if(this.filterStatus === "completed"){
                  return this.todos.filter(item => item.completed)
				}else if(this.filterStatus === "active"){
					return this.todos.filter(item => !item.completed)
				}else{
		            return this.todos
				}
			}
		}
		
	}).$mount('#app');

   window.onhashchange = function(){
	 
	   var hash = window.location.hash.slice(2);
	   app.filterStatus = hash
	   
   }
	  
})(window);
