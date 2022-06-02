    // TODO LIST JAVASCRIPT FILE
    $(document).ready(()=>{
        fetchTodoItems(todoItems);
    })

    let addModal = $("#add-modal");
    let confirmRemoveModal = $('#confirm-remove-modal');
    let editModal = $('#edit-modal');
    let closeAddBtn = $('#add-close');
    let addBtn = $('#add-btn');
    let saveTodo = $('#save-new-todo');
    let orderSelect = $('#order-by');
    let doneSelect = $('#is-done');
    let searchInput = $('#search');
    let todoList = $('.todo-list:first');


    // Get Todo Items From Local Storage
    let todoItems = JSON.parse(localStorage.getItem('todo-items')) || [];

    // Get Todo Order Value
    let orderBy = localStorage.getItem('todo-items-order') || 'created_at';
    orderSelect.value = orderBy;

    // Get done value 
    let isDone = false;

    // Open Add New Todo Modal
    addBtn.click(()=>{
        addModal.show()
    })
        
    

    // Close Add New Todo Modal
    closeAddBtn.click(() => {
        addModal.hide()
    })

    // Save Todo Order Value
    orderSelect.change((e)=>{
        localStorage.setItem('todo-items-order', e.target.value)
        orderBy = e.target.value
        fetchTodoItems(todoItems)
    })

    // Change done/not_done filer
    doneSelect.change((e)=>{
        if(e.target.value === 'true') isDone = true
        else isDone = false
        fetchTodoItems(todoItems)
    })

    // Handle search input
    searchInput.on('input',(e)=>{
        console.log(e.target.value)
        const value = e.target.value
        const filterdItems = todoItems.filter(item=> item.title.includes(value) || item.description.includes(value))
        fetchTodoItems(filterdItems)
    })

    // Append Todo Items
    const fetchTodoItems = (itemsList = [])=>{
        todoList.html('')
        itemsList.sort((a,b)=> b[orderBy] - a[orderBy])
        itemsList.filter(item=>item.is_done === isDone).map(item=>{
            console.log(item)
            const date = new Date(item.created_at);
            const options = {month:'short', day: 'numeric', year: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' }
            todoList.append(`<div class="todo-item ${item.is_done === true? 'is-done': null}">
                                <div class="todo-item-head">
                                    <div class="text">
                                        <h3>${item.title}</h3>
                                        <h5>${date.toLocaleDateString('en-US' ,options)}</h5>
                                    </div>
                                    <div class="action-buttons">
                                        <a class="not-done-action" onclick = 'markDone(${item.id})' href="#"><i title="Mark as done" class="fa-solid fa-check"></i></a>
                                        <a class="not-done-action" onclick = 'editTodo(${item.id})' href="#"><i title="Edit" class="fa-solid fa-pen-to-square"></i></a>
                                        <a class="not-done-action" onclick = 'removeItem(${item.id})' href="#"><i title="Remove" class="fa-solid fa-trash-can"></i></a>
                                        <a hidden class="done-action" onclick = 'markNotDone(${item.id})' href="#"><i class="fa-solid fa-arrow-rotate-left"></i></a>
                                    </div>
                                </div>
                                <div class="todo-item-subtitle">
                                    <p>${item.description}</p>
                                </div>
                            </div>`)
        })
    }

    // Save New Todo Item
    saveTodo.click(()=>{
        const title = $('#add-title-input')
        const point = $('#add-point-input')
        const description = $('#add-description-input')
        const duedate = $('#add-duedate-input')

        if(title.val() === "" || description.val() === "" || point.val() === ""){
            alert("All fields are requried")
            return;
        }

        if(point.val() > 5 || point.val() < 1){
            alert('Points are set between 1 and 5');
            return;
        }

        console.log({title, description, point})
        let newItem = {
            id : Date.now()+Math.floor((Math.random()*100000)),
            title : title.val(),
            description : description.val(),
            point : point.val(),
            is_done : false,
            created_at : Date.now(),
            due_date: Date.parse(duedate.val())
        }
        todoItems.push(newItem)
        localStorage.setItem('todo-items', JSON.stringify(todoItems))
        
        title.val('')
        description.val('')
        point.val('')

        addModal.hide()
        fetchTodoItems(todoItems);
    })


    // Remove Todo Item
    const removeItem = (id)=>{
        confirmRemoveModal.show()
        const cancel = $('#cancel-remove')
        const confirm = $('#confirm-remove')

        cancel.click(()=>{
            confirmRemoveModal.hide()
        })
        confirm.click(()=>{
            console.log(id)
            todoItems = todoItems.filter(item=>item.id != id)
            localStorage.setItem('todo-items', JSON.stringify(todoItems))
            fetchTodoItems(todoItems)
            confirmRemoveModal.hide()
        })
    }

    // Edit Todo Item
    const editTodo = (id)=>{
        editModal.show()

        const index = todoItems.findIndex(item=> item.id === id)

        const cancel = $('#cancel-edit')
        const save = $('#save-edit')

        const title = $('#edit-title-input')
        const point = $('#edit-point-input')
        const description = $('#edit-description-input')
        const duedate = $('#edit-duedate-input')
        

        title.val(todoItems[index].title)
        description.val(todoItems[index].description)
        point.val(todoItems[index].point)
        duedate.val(new Date(todoItems[index].due_date).toLocaleString('sv-SE').replace(' ', 'T'))


        cancel.click(() => {
            editModal.hide()
        })

        save.click(() => {

            if(title.val() === "" || description.val() === "" || point.val() === ""){
                alert("All fields are requried")
                return;
            }
    
            if(point.val() > 5 || point.val() < 1){
                alert('Points are set between 1 and 5');
                return;
            }


            todoItems[index] = {
                ...todoItems[index],
                title: title.val(),
                point: point.val(),
                description: description.val(),
                due_date: duedate.val()
            }
            localStorage.setItem('todo-items', JSON.stringify(todoItems))
            fetchTodoItems(todoItems)
            editModal.hide()
        })
        
    }

    // Mark Todo Item as Done
    const markDone = (id)=>{
        const index = todoItems.findIndex(item=>item.id === id);

        todoItems[index].is_done = true;

        localStorage.setItem('todo-items', JSON.stringify(todoItems));
        fetchTodoItems(todoItems);
    }

    // Mark Todo Item as Not Done
    const markNotDone = (id)=>{
        const index = todoItems.findIndex(item=>item.id === id);

        todoItems[index].is_done = false;

        localStorage.setItem('todo-items', JSON.stringify(todoItems));
        fetchTodoItems(todoItems);
    }




