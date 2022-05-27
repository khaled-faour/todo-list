// TODO LIST JAVASCRIPT FILE
let addModal = document.getElementById("add-modal");
let closeAddBtn = document.getElementById('add-close');
let addBtn = document.getElementById('add-btn');
let saveTodo = document.getElementById('save-new-todo');

// Open Add New Todo Modal
addBtn.onclick=()=>{
    addModal.style.display = 'block'
}

// Close Add New Todo Modal
closeAddBtn.onclick = () => {
    addModal.style.display = 'none'
}

// Get Todo Items From Local Storage
const todoItems = JSON.parse(localStorage.getItem('todo-items')) || [];

// Save New Todo Item
saveTodo.onclick=()=>{
    const title = document.getElementById('title-input').value
    const point = document.getElementById('point-input').value
    const description = document.getElementById('description-input').value

    console.log({title, description, point})
    let newItem = {
        id : Date.now()+Math.floor((Math.random()*100000)),
        title : title,
        description : description,
        point : point,
        is_done : false,
        created_at : new Date(Date.now())
    }
    todoItems.push(newItem)
    localStorage.setItem('todo-items', JSON.stringify(todoItems))
}

