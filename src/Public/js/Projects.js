const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")
const projectNameContainer = document.querySelector(".projectName")
const inputProjectID = document.querySelector("form input")

function showModal(projectName, projectID){
    overlay.classList.add('active')
    modal.classList.add('active')
    projectNameContainer.innerText = projectName
    inputProjectID.setAttribute('value', projectID)
}

function closeModal(){
    overlay.classList.remove('active')
    modal.classList.remove('active')
}