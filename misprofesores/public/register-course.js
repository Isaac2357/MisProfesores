"use strict"

let drop = document.querySelector("#drop-credits");
let lista = document.querySelector("#lista");
let searchBtn = document.querySelector("#search-courses-btn");
let addBtn = document.querySelector("#add-courses-btn");
let localData;
let currPage = document.getElementById("nav-curr-page");
let inputSearch = document.getElementById("input-search");

loadCurrentPage();

addBtn.onclick = addCourse;
searchBtn.onclick = searchCourses;

function deleteCourse(couid, nombre) {
    let input = document.querySelector("#del-course-name-modal");
    input.value = nombre;
    input.disabled = true;
    console.log(couid);
    let update = document.querySelector("#cofirm-btn-c");
    update.onclick = () => {
        let xhr = new XMLHttpRequest();
                xhr.open("DELETE", `/api/courses/${couid}`);
                xhr.setRequestHeader("x-user-token", localStorage.token);
                xhr.send();
                xhr.onload = function() {
                    console.log(xhr.response);
                    console.log(xhr.status, xhr.statusText);
                    if (xhr.status == 200) {
                        let res = JSON.parse(xhr.response);
                        if (res.status != undefined) {
                            displayMsg(res.status, "Estatus")
                            if (inputSearch.value.length > 0) {
                                searchCourses();
                            } else {
                                loadCurrentPage();
                            }
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
        let nombre = nombreIn.value.trim();
        let departamento = departamentoIn.value.trim();
        let creditos = creditosIn.value.trim();
        console.log(nombre, departamento, creditos);
        if (nombre.length == 0) {
            displayMsg("Error", "Nombre de curso no capturado.")
        } else {
            console.log(nombre, departamento, creditos);
            let xhr = new XMLHttpRequest();
            xhr.open("PUT", `/api/courses/${couid}`);
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
                        if (inputSearch.value.length > 0) {
                            searchCourses();
                        } else {
                            loadCurrentPage();
                        }
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
        let nombre = nombreIn.value.trim();
        let departamento = departamentoIn.value.trim();
        let creditos = creditosIn.value.trim();
        console.log(nombre, departamento, creditos);
        if (nombre.length == 0) {
            displayMsg("Error", "Nombre de curso no capturado.")
        } else {
            console.log(nombre, departamento, creditos);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", `/api/courses`);
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
                        if (inputSearch.value.length > 0) {
                            searchCourses();
                        } else {
                            loadCurrentPage();
                        }
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
        xhr.open("GET", `/api/courses?page=${page}`);
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
        xhr.open("GET", `/api/courses?page=${page}`);
        xhr.setRequestHeader("x-user-token", localStorage.token);
        xhr.send();
        xhr.onload = function() {
            console.log(xhr.response);
            console.log(xhr.status, xhr.statusText);
            if (xhr.status == 200) {
                let docs = JSON.parse(xhr.response);
                if (docs.length > 0) {
                    let html = docs.map((c) => courseToHtml(c)).join("");
                    lista.innerHTML =  html;
                    localData = docs;
                    currPage.innerText = page + 1;
                }
            } else {
                let error = JSON.parse(xhr.response).error;
                if (error) {
                    displayMsg(error, "Error");
                }
            }
       }
}

function loadCurrentPage() {
    let page = parseInt(currPage.innerText) - 1;
    let xhr = new XMLHttpRequest();
        xhr.open("GET", `/api/courses?page=${page}`);
        xhr.setRequestHeader("x-user-token", localStorage.token);
        xhr.send();
        xhr.onload = function() {
            console.log(xhr.response);
            console.log(xhr.status, xhr.statusText);
            if (xhr.status == 200) {
                let docs = JSON.parse(xhr.response);
                if (docs.length > 0) {
                    let html = docs.map((c) => courseToHtml(c)).join("");
                    lista.innerHTML =  html;
                    localData = docs;
                }
            } else {
                let error = JSON.parse(xhr.response).error;
                if (error) {
                    displayMsg(error, "Error");
                }
            }
       }
}

function searchCourses() {
    let filter = inputSearch.value;
    filter = filter.split(' ').join('');
    filter = filter.split("|");
    console.log(filter);
    if (filter.length == 1 && filter[0].length == 0) {
        loadCurrentPage();
    } else if (filter.length != 3 ) {
        displayMsg('Filtro inválido', 'Error')
    } else {
        console.log(filter);
        let query = `?nombre=${filter[0].toUpperCase()}&departamento=${filter[1].toUpperCase()}&creditos=${filter[2]}`;
        console.log(query);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `/api/courses/search${query}`);
        xhr.setRequestHeader("x-user-token", localStorage.token);
        xhr.send();
        xhr.onload = function() {
            console.log(xhr.response);
            console.log(xhr.status, xhr.statusText);
            if (xhr.status == 200) {
                let docs = JSON.parse(xhr.response);
                console.log(docs);
                let html = docs.map((c) => courseToHtml(c)).join("");
                lista.innerHTML =  html;
            } else {
                let error = JSON.parse(xhr.response).error;
                if (error) {
                    displayMsg(error, "Error");
                }
            }
       }

    }
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
