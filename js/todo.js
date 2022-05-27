// TODO LIST JAVASCRIPT FILE
window.onload = ()=>{
    fetchTodoItems();
}
    let addModal = document.getElementById("add-modal");
    let confirmRemoveModal = document.getElementById('confirm-remove-modal')
    let closeAddBtn = document.getElementById('add-close');
    let addBtn = document.getElementById('add-btn');
    let saveTodo = document.getElementById('save-new-todo');
    let todoList = document.getElementsByClassName('todo-list')[0];

    // Get Todo Items From Local Storage
    let todoItems = JSON.parse(localStorage.getItem('todo-items')) || [];

    // Open Add New Todo Modal
    addBtn.onclick=()=>{
        addModal.style.display = 'block'
    }

    // Close Add New Todo Modal
    closeAddBtn.onclick = () => {
        addModal.style.display = 'none'
    }




    // Append Todo Items
    const fetchTodoItems = ()=>{
        todoList.innerHTML = ''
    
        todoItems.map(item=>{
            console.log(item)
            const date = new Date(item.created_at);
            const options = {month:'short', day: 'numeric', year: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' }
            todoList.innerHTML += `
            <div class="todo-item">
                <div class="todo-item-head">
                    <div class="text">
                        <h3>${item.title}</h3>
                        <h5>${date.toLocaleDateString('en-US' ,options)}</h5>
                    </div>
                    <div class="action-buttons">
                        <a href="#"><i title="Mark as done" class="fa-solid fa-check"></i></a>
                        <a href="#"><i title="Edit" class="fa-solid fa-pen-to-square"></i></a>
                        <a onclick = 'removeItem(${item.id})' href="#"><i title="Remove" class="fa-solid fa-trash-can"></i></a>
                    </div>
                </div>
                <div class="todo-item-subtitle">
                    <p>${item.description}</p>
                </div>
            </div>
            `
        })
    }

    // Save New Todo Item
    saveTodo.onclick=()=>{
        const title = document.getElementById('title-input').value
        const point = document.getElementById('point-input').value
        const description = document.getElementById('description-input').value

        if(title === "" || description === "" || point === ""){
            alert("All fields are requried")
            return;
        }


        console.log({title, description, point})
        let newItem = {
            id : Date.now()+Math.floor((Math.random()*100000)),
            title : title,
            description : description,
            point : point,
            is_done : false,
            created_at : Date.now()
        }
        todoItems.push(newItem)
        localStorage.setItem('todo-items', JSON.stringify(todoItems))
        closeAddBtn.click()
        fetchTodoItems();
    }


    // Remove Todo Item
    const removeItem = (id)=>{
        confirmRemoveModal.style.display = 'block'
        const cancel = document.getElementById('cancel-remove')
        const confirm = document.getElementById('confirm-remove')

        cancel.onclick = ()=>{
            confirmRemoveModal.style.display = 'none'
        }
        confirm.onclick = ()=>{
            console.log(id)
            todoItems = todoItems.filter(item=>item.id != id)
            localStorage.setItem('todo-items', JSON.stringify(todoItems))
            fetchTodoItems()
            confirmRemoveModal.style.display = 'none'
        }
    }




