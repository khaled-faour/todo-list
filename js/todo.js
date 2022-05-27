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