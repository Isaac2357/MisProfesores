"use strict"

//let globalUsers = [];
let container = document.getElementById("lista");
let hCurs = document.getElementById("hCurs");
let idCurso = localStorage.cursID; //clicked
var nombre; //glob
var depto; //glob
fetchCurs(idCurso); //titlle

container.innerHTML = "";


let xhrProf = new XMLHttpRequest();
    xhrProf.open("GET", `/api/relations?idCurso=${idCurso}`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhrProf.send();
    xhrProf.onload = function() {
        //console.log("rels:",xhrProf.status, xhrProf.statusText, xhrProf.response, JSON.parse(xhrProf.response));
        if (xhrProf.status == 200) {
            let rels = JSON.parse(xhrProf.responseText);
                for(let item of rels){
                    fetch(item.idProfesor);
                    console.log("debug: "+item.idProfesor);
                }
            //container.innerHTML += userHtml += xhrProf.response;
        }
   }

function fetch(profesor) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/professors/${profesor}`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();
    xhr.onload = function() {
        //console.log("Prof:",xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            //globalUsers.push(JSON.parse(xhr.response));
            let item = JSON.parse(xhr.responseText);
            //let usr = xhr.response
            //let users = usr.map(user => user.nombre);
            console.log(item.nombre + item.correo);
                
                    container.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <hr>
        
                            <h3 class="card-title">${item.nombre}</h3>
                            <p class="card-text">${item.correo}</p>
                            <a id="${item.uid}" href="#" class="stretched-link" onclick="openProf('${item.uid}');"></a>
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

function openProf(id) {
    console.log("ID selected", id);
    window.location.href = "curso-profesor.html" 
    localStorage.profID = id;
}

//____
function fetchCurs(idProf) {
    //let nombre = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/courses/${idProf}`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();
    xhr.onload = function() {
        console.log("fetchCurs:",JSON.parse(xhr.responseText), xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            let item = JSON.parse(xhr.responseText);
                    nombre = item.nombre;
                    depto = item.departamento;
                    hCurs.innerHTML = `<i class="fa fa-book" aria-hidden="true"></i>${nombre}<small>${depto}</small>`
                    console.log(nombre, depto);
                
        }
   }
   
}