"use strict"

let drop = document.querySelector("#drop-credits");
let lista = document.querySelector("#lista");
let searchBtn = document.querySelector("#search-courses-btn");
let addBtn = document.querySelector("#add-courses-btn");
let localData;
let currPage = document.getElementById("nav-curr-page");

displayCourses();

addBtn.onclick = addCourse;
searchBtn.onclick = searchCourses;

function displayCourses() {
    let page = parseInt(currPage.innerText) - 1;
    console.log(page);
    let xhr = new XMLHttpRequest();
        /** The endpoint will change to /${email} when we have our backend.*/
        xhr.open("GET", `http://localhost:3000/api/courses?page=${page}`);
        xhr.setRequestHeader("x-user-token", localStorage.token);
        xhr.send();
        xhr.onload = function() {
            console.log(xhr.response);
            console.log(xhr.status, xhr.statusText);
            let docs = JSON.parse(xhr.response);
            let html = docs.map((c) => courseToHtml(c)).join("");
            lista.innerHTML =  html;
            localData = docs;
       }
}

function deleteCourse(couid, nombre) {
    let input = document.querySelector("#del-course-name-modal");
    input.value = nombre;
    input.disabled = true;
    console.log(couid);
    let update = document.querySelector("#cofirm-btn-c");
    update.onclick = () => {
        let xhr = new XMLHttpRequest();
                xhr.open("DELETE", `http://localhost:3000/api/courses/${couid}`);
                xhr.setRequestHeader("x-user-token", localStorage.token);
                xhr.send();
                xhr.onload = function() {
                    console.log(xhr.response);
                    console.log(xhr.status, xhr.statusText);
                    if (xhr.status == 200) {
                        let res = JSON.parse(xhr.response);
                        if (res.status != undefined) {
                            displayMsg(res.status, "Estatus")
                        }
                    } else {
                        let error = JSON.parse(xhr.response).error;
                        if (error != undefined) {
                            displayMsg(error, "Error");
                        }
                    }
            }
    }


}

function updateCourse(couid, nombre, departamento, creditos) {
    let saveBtn = document.querySelector("#save-btn-update-model");
    let nombreIn = document.querySelector("#nombre-input-update-model");
    let departamentoIn = document.querySelector("#department-input-update-model");
    let creditosIn = document.querySelector("#credits-input-update-model");
    let dropD = document.querySelector("#drop-department-update-modal");
    let dropC = document.querySelector("#drop-credits-update-modal");

    //load data
    nombreIn.value = nombre;
    departamentoIn.value = departamento;
    creditosIn.value = creditos;

    //listeners for the modal
    saveBtn.onclick = () => {
        let nombre = nombreIn.value;
        let departamento = departamentoIn.value;
        let creditos = creditosIn.value;
        console.log(nombre, departamento, creditos);
        if (nombre.length == 0) {
            displayMsg("Error", "Nombre de curso no capturado.")
        } else {
            console.log(nombre, departamento, creditos);
            let xhr = new XMLHttpRequest();
            xhr.open("PUT", `http://localhost:3000/api/courses/${couid}`);
            xhr.setRequestHeader("x-user-token", localStorage.token);
            xhr.setRequestHeader("Content-Type", "application/json");
            console.log({nombre, departamento, creditos});
            xhr.send(JSON.stringify({nombre, departamento, creditos}));
            xhr.onload = function() {
                console.log(xhr.response);
                console.log(xhr.status, xhr.statusText);
                if (xhr.status == 200) {
                    let res = JSON.parse(xhr.response);
                    if (res.status != undefined) {
                        displayMsg(res.status, "Estatus")
                    }
                } else {
                    let error = JSON.parse(xhr.response).error;
                    if (error != undefined) {
                        displayMsg(error, "Error");
                    }
                }
           }
        }       
    }

    dropD.onclick = () => {
        departamentoIn.value = event.target.innerText;
    }

    dropC.onclick = () => {
        creditosIn.value = event.target.innerText;
    }
    
}

function addCourse() {
    let saveBtn = document.querySelector("#save-btn-add-modal");
    let nombreIn = document.querySelector("#nombre-input-add-model");
    let departamentoIn = document.querySelector("#department-input-add-modal");
    let creditosIn = document.querySelector("#credits-input-add-modal");
    let dropD = document.querySelector("#drop-department-add-modal");
    let dropC = document.querySelector("#drop-credits-add-modal");

    //listeners for the modal
    saveBtn.onclick = () => {
        let nombre = nombreIn.value;
        let departamento = departamentoIn.value;
        let creditos = creditosIn.value;
        console.log(nombre, departamento, creditos);
        if (nombre.length == 0) {
            displayMsg("Error", "Nombre de curso no capturado.")
        } else {
            console.log(nombre, departamento, creditos);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:3000/api/courses`);
            xhr.setRequestHeader("x-user-token", localStorage.token);
            xhr.setRequestHeader("Content-Type", "application/json");
            console.log({nombre, departamento, creditos});
            xhr.send(JSON.stringify({nombre, departamento, creditos}));
            xhr.onload = function() {
                console.log(xhr.response);
                console.log(xhr.status, xhr.statusText);
                if (xhr.status == 201) {
                    let res = JSON.parse(xhr.response);
                    if (res.status != undefined) {
                        displayMsg(res.status, "Estatus");
                        location.reload;
                    }
                } else {
                    let error = JSON.parse(xhr.response).error;
                    if (error != undefined) {
                        displayMsg(error, "Error");
                    }
                }
           }
        }
    }
    dropD.onclick = () => {
        departamentoIn.value = event.target.innerText;
    }

    dropC.onclick = () => {
        creditosIn.value = event.target.innerText;
    }
    
}

function previousPage() {
    event.preventDefault();
    let page = parseInt(currPage.innerText) - 2;
    if (page < 0) {
        return false;
    }
    let xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:3000/api/courses?page=${page}`);
        xhr.setRequestHeader("x-user-token", localStorage.token);
        xhr.send();
        xhr.onload = function() {
            console.log(xhr.response);
            console.log(xhr.status, xhr.statusText);
            if (xhr.status == 200) {
                let docs = JSON.parse(xhr.response);
                let html = docs.map((c) => courseToHtml(c)).join("");
                lista.innerHTML =  html;
                localData = docs;
                currPage.innerText = page+1;
            } else {
                let error = JSON.parse(xhr.response).error;
                if (error) {
                    displayMsg(error, "Error");
                }
            }
       }
}

function nextPage() {
    event.preventDefault();
    let page = parseInt(currPage.innerText);
    console.log(page);
    let xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:3000/api/courses?page=${page}`);
        xhr.setRequestHeader("x-user-token", localStorage.token);
        xhr.send();
        xhr.onload = function() {
            console.log(xhr.response);
            console.log(xhr.status, xhr.statusText);
            if (xhr.status == 200) {
                let docs = JSON.parse(xhr.response);
                let html = docs.map((c) => courseToHtml(c)).join("");
                lista.innerHTML =  html;
                localData = docs;
                currPage.innerText = page + 1;
            } else {
                let error = JSON.parse(xhr.response).error;
                if (error) {
                    displayMsg(error, "Error");
                }
            }
       }
}

function searchCourses() {
    console.log("Search");
    console.log(localData);
}

function displayMsg(msg, title) {
    let modalError = document.getElementById("modal-msg");
    modalError.querySelector(".modal-title").innerText = title;
    modalError.querySelector("#input-msg-modal").value = msg;
    $('#modal-msg').modal('show');
}

function closeMsg() {
    $('#modal-msg').modal('hide');
}

function courseToHtml(course) {
    return `<div class="media col-8 mt-2">
                <div class="media-body">
                    <h4>${course.nombre}</h4>
                    <p >Departamento: ${course.departamento}</p>
                    <p >Creditos: ${course.creditos} </p>
                    <p >Estatus: ${(course.estatus) ? "Activo" : "Inactivo"} </p>
                </div>
                <div class="media-right align-self-center">
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#edit" onclick="updateCourse(${course.couid}, '${course.nombre}','${course.departamento}', '${course.creditos}')">Editar</button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete" onclick="deleteCourse(${course.couid},'${course.nombre}')">${(course.estatus) ? "Desactivar" : "Activar"}</button>
                </div>
            </div>`;
}
