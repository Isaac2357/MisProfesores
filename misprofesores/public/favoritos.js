"use strict"
//let globalUsers = [];
let contProf = document.getElementById("contProf");
let contCurs = document.getElementById("contCurs");
let idUser = 45;
fetchUsr(idUser)



/* contProf.innerHTML = "";
contCurs.innerHTML = ""; */

function fetchUsr(idUser) {
    console.log("fu");
    let xhrR = new XMLHttpRequest();
    xhrR.open("GET", `/api/users?uid=${idUser}`, true);
    xhrR.setRequestHeader("x-user-token", localStorage.token);
    xhrR.send();
    xhrR.onload = function() {
        console.log("fetchUsr:",JSON.parse(xhrR.responseText), xhrR.status, xhrR.statusText, xhrR.response, JSON.parse(xhrR.response));
        if (xhrR.status == 200) {
            let usuario = JSON.parse(xhrR.responseText);
                for(let item of usuario){
                    let favProf = item.favProfesores;
                    let favCurs = item.favCursos;
                    console.log("arrays:",favProf,favCurs);
                    for(let i of favProf){
                        fetchProf(i);
                    }
                    for(let j of favCurs){
                        fetchCurs(j);
                    }
                }
        }
   }
    
}
function fetchProf(id) {
    contProf.innerHTML = ""
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/professors/${id}`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            //globalUsers.push(JSON.parse(xhr.response));
            let item = JSON.parse(xhr.responseText);
            //let usr = xhr.response
            //let users = usr.map(user => user.nombre);
                //for(let item of userHtml){
                    contProf.innerHTML +=` 
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
                //}
            //container.innerHTML += userHtml += xhr.response;
        }
   }
}

function openProf(id) {
    console.log("ID selected", id);
    window.location.href = "profesor-cr.html" 
    localStorage.profID = id;
}

function fetchCurs(id) {
    contCurs.innerHTML = ""
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/courses/${id}`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();
    xhr.onload = function() {
        //console.log(xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {

            //globalUsers.push(JSON.parse(xhr.response));
            let item = JSON.parse(xhr.responseText);
            //let usr = xhr.response
            //let users = usr.map(user => user.nombre);
                //for(let item of userHtml){
                    contCurs.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            <hr>
        
                            <h3 class="card-title">${item.nombre}</h3>
                            <p class="card-text">${item.departamento}</p>
                            <a id="${item.couid}" href="#" class="stretched-link" onclick="openCurs('${item.couid}');"></a>
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
                //}
            //container.innerHTML += userHtml += xhr.response;
        }
   }
}

function openCurs(id) {
    console.log("ID selected", id);
    window.location.href = "curso-pr.html" 
    localStorage.cursID = id;
}


//json server
/* "use strict"
//let globalUsers = [];
let contProf = document.getElementById("contProf");
let contCurs = document.getElementById("contCurs");
let idUser = 45;
fetchUsr(idUser)


contProf.innerHTML = "";
contCurs.innerHTML = ""; 

function fetchUsr(idUser) {
    console.log("fu");
    let xhrR = new XMLHttpRequest();
    xhrR.open("GET", `http://localhost:3000/usuarios?id=${idUser}`, true);
    xhrR.send();
    xhrR.onload = function() {
        console.log("fetchUsr:",JSON.parse(xhrR.responseText), xhrR.status, xhrR.statusText, xhrR.response, JSON.parse(xhrR.response));
        if (xhrR.status == 200) {
            let usuario = JSON.parse(xhrR.responseText);
                for(let item of usuario){
                    let favProf = item.favProfesores;
                    let favCurs = item.favCursos;
                    console.log("arrays:",favProf,favCurs);
                    for(let i of favProf){
                        fetchProf(i);
                    }
                    for(let j of favCurs){
                        fetchCurs(j);
                    }
                }
        }
   }
    
}
function fetchProf(id) {
    contProf.innerHTML = ""
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/profesores?id=${id}`);
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            //globalUsers.push(JSON.parse(xhr.response));
            let userHtml = JSON.parse(xhr.responseText);
            //let usr = xhr.response
            //let users = usr.map(user => user.nombre);
                for(let item of userHtml){
                    contProf.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <hr>
        
                            <h3 class="card-title">${item.nombre}</h3>
                            <p class="card-text">${item.departamento}</p>
                            <a id="${item.id}" href="#" class="stretched-link" onclick="openProf('${item.id}');"></a>
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

function openProf(id) {
    console.log("ID selected", id);
    window.location.href = "profesor-cr.html" 
    localStorage.profID = id;
}

function fetchCurs(id) {
    contCurs.innerHTML = ""
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/cursos?id=${id}`);
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            //globalUsers.push(JSON.parse(xhr.response));
            let userHtml = JSON.parse(xhr.responseText);
            //let usr = xhr.response
            //let users = usr.map(user => user.nombre);
                for(let item of userHtml){
                    contCurs.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            <hr>
        
                            <h3 class="card-title">${item.nombre}</h3>
                            <p class="card-text">${item.departamento}</p>
                            <a id="${item.id}" href="#" class="stretched-link" onclick="openCurs('${item.id}');"></a>
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
    window.location.href = "curso-pr.html" 
    localStorage.cursID = id;
}

 */