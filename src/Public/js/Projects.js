const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

function showModal(){
    overlay.classList.add('active')
    modal.classList.add('active')
}

function closeModal(){
    overlay.classList.remove('active')
    modal.classList.remove('active')
}