"use strict"
//let globalUsers = [];
let container = document.getElementById("lista");
let hProf = document.getElementById("hProf");
let idProf = localStorage.profID; //clicked
var nombre; //glob
var depto; //glob
fetchProf(idProf); //titlle

container.innerHTML = "";


let xhrProf = new XMLHttpRequest();
    xhrProf.open("GET", `http://localhost:3000/api/relations?idProfesor=${idProf}`);
    xhrProf.setRequestHeader("x-user-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNvcnJlbyI6InRlc3QyQGl0ZXNvLm14IiwidGlwbyI6IkFETUlOIiwiaWF0IjoxNTc1MzI0NzI5LCJleHAiOjE1NzU5Mjk1Mjl9.XgtAYRQA0ucDP0XXktqjRHGJ-zEJZNW4Sd-jv-sEexs");
    xhrProf.send()
    xhrProf.onload = function() {
        console.log(xhrProf.status, xhrProf.statusText, xhrProf.response, JSON.parse(xhrProf.response));
        if (xhrProf.status == 200) {
            let rels = JSON.parse(xhrProf.responseText);
            console.log("OLA" + rels);
                for(let item of rels){
                    fetch(item.idCurso)
                    console.log("ola curso: " + item.idCurso + item.idProfesor + item.periodo);
                }
            //container.innerHTML += userHtml += xhrProf.response;
        }
   }

function fetch(curso) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/api/courses/${curso}`);
    xhr.setRequestHeader("x-user-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNvcnJlbyI6InRlc3QyQGl0ZXNvLm14IiwidGlwbyI6IkFETUlOIiwiaWF0IjoxNTc1MzI0NzI5LCJleHAiOjE1NzU5Mjk1Mjl9.XgtAYRQA0ucDP0XXktqjRHGJ-zEJZNW4Sd-jv-sEexs");
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            //globalUsers.push(JSON.parse(xhr.response));
            let item = JSON.parse(xhr.responseText);
            //let usr = xhr.response
            //let users = usr.map(user => user.nombre);
            console.log("idProfe clickeado:"+ xhr.responseText);
            console.log("TEST" + item.nombre);
                
                    container.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            <hr>
        
                            <h3 class="card-title">${item.nombre}</h3>
                            <p class="card-text">${item.departamento}</p>
                            <a href="#" class="stretched-link" onclick="openCurs('${item.couid}');"></a>
                    </div>
        
                    <div class="card-footer text-muted">
                        <i class="fa fa-star" aria-hidden="true">4.5</i>
                        <i class="fa fa-comment" aria-hidden="true">42</i>
                        <i class="fa fa-thumbs-up" aria-hidden="true">12</i>
                        <i class="fa fa-thumbs-down" aria-hidden="true">3</i>
                    </div>
                </div>
                </div>           
                `;
                
            //container.innerHTML += userHtml += xhr.response;
        }
   }
}

function openCurs(id) {
    console.log("ID selected", id);
    window.location.href = "profesor-curso.html" 
    localStorage.cursID = id;
}

//____
function fetchProf(idProf) {
    //let nombre = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/api/professors/${idProf}`)
    xhr.setRequestHeader("x-user-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNvcnJlbyI6InRlc3QyQGl0ZXNvLm14IiwidGlwbyI6IkFETUlOIiwiaWF0IjoxNTc1MzI0NzI5LCJleHAiOjE1NzU5Mjk1Mjl9.XgtAYRQA0ucDP0XXktqjRHGJ-zEJZNW4Sd-jv-sEexs");
    xhr.send();
    xhr.onload = function() {
        console.log("fetchProf:",JSON.parse(xhr.responseText), xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            let item = JSON.parse(xhr.responseText);
                
                    nombre = item.nombre;
                    depto = item.correo;
                    hProf.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i>${nombre}<small>${depto}</small>`
                    console.log(nombre, depto);
                
        }
   }
   
}





/* //____________________________ json server
"use strict"
//let globalUsers = [];
let container = document.getElementById("lista");
let hProf = document.getElementById("hProf");
let idProf = localStorage.profID; //clicked
var nombre; //glob
var depto; //glob
fetchProf(idProf); //titlle

container.innerHTML = "";


let xhrProf = new XMLHttpRequest();
    xhrProf.open("GET", `http://localhost:3000/relaciones?idProfesor=${idProf}`);
    xhrProf.send();
    xhrProf.onload = function() {
        console.log(xhrProf.status, xhrProf.statusText, xhrProf.response, JSON.parse(xhrProf.response));
        if (xhrProf.status == 200) {
            let rels = JSON.parse(xhrProf.responseText);
                for(let item of rels){
                    fetch(item.idCurso);
                }
            //container.innerHTML += userHtml += xhrProf.response;
        }
   }

function fetch(curso) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/cursos?id=${curso}`);
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            //globalUsers.push(JSON.parse(xhr.response));
            let userHtml = JSON.parse(xhr.responseText);
            //let usr = xhr.response
            //let users = usr.map(user => user.nombre);
                for(let item of userHtml){
                    container.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            <hr>
        
                            <h3 class="card-title">${item.nombre}</h3>
                            <p class="card-text">${item.departamento}</p>
                            <a href="#" class="stretched-link" onclick="openCurs('${item.id}');"></a>
                    </div>
        
                    <div class="card-footer text-muted">
                        <i class="fa fa-star" aria-hidden="true">4.5</i>
                        <i class="fa fa-comment" aria-hidden="true">42</i>
                        <i class="fa fa-thumbs-up" aria-hidden="true">12</i>
                        <i class="fa fa-thumbs-down" aria-hidden="true">3</i>
                    </div>
                </div>
                </div>           
                `;
                }
            //container.innerHTML += userHtml += xhr.response;
        }
   }
}

function openCurs(id) {
    console.log("ID selected", id);
    window.location.href = "profesor-curso.html" 
    localStorage.cursID = id;
}

//____
function fetchProf(idProf) {
    //let nombre = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/profesores?id=${idProf}`);
    xhr.send();
    xhr.onload = function() {
        console.log("fetchProf:",JSON.parse(xhr.responseText), xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            let profesor = JSON.parse(xhr.responseText);
                for(let item of profesor){
                    nombre = item.nombre;
                    depto = item.departamento;
                    hProf.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i>${nombre}<small>${depto}</small>`
                    console.log(nombre, depto);
                }
        }
   }
   
} */