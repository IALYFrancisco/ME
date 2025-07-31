const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")
const projectNameContainer = document.querySelector(".projectName")

function showModal(projectName){
    overlay.classList.add('active')
    modal.classList.add('active')
    projectNameContainer.innerText = projectName
}

function closeModal(){
    overlay.classList.remove('active')
    modal.classList.remove('active')
}