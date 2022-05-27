// TODO LIST JAVASCRIPT FILE
let addModal = document.getElementById("add-modal");
let closeAddBtn = document.getElementById('add-close');
let addBtn = document.getElementById('add-btn');

addBtn.onclick=()=>{
    addModal.style.display = 'block'
}

closeAddBtn.onclick = () => {
    addModal.style.display = 'none'
}

const todoItems = localStorage.getItem('todo-items') || [];



// Todo Item Class
class Todo {
	constructor(title, description, point){
  	this.id = Date.now()+Math.floor((Math.random()*100000))
    this.title = title
    this.description = description
    this.point = point
    this.isDone = false
    this.createdAt = new Date(Date.now())
  }
  
}
