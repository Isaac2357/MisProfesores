"use strict"
//let globalUsers = [];
let container= document.getElementById("lista");
let hNom = document.getElementById("hNom");
let idUser = 1;
fetchUsr(idUser);


/* contProf.innerHTML = "";
contCurs.innerHTML = ""; */

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
                    hNom.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i>${item.nombre}<small>${item.correo}</small>`
                    if(item.tipo==1){
                        fetchCom(idUser);
                    }else if(item.tipo==2){
                        console.log("Cursos:",favCurs);
                        for(let i of favCurs){
                            fetchCurs(i);
                        }

                    }
                    
                }
        }
   }
    
}

function fetchCurs(id) {
    container.innerHTML = ""
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
                    container.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <hr>
        
                            <h3 class="card-title">${item.nombre}</h3>
                            <p class="card-text">${item.departamento}</p>
                            <a id="${item.id}" href="profesor-cr.html" class="stretched-link"></a>
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
        }
   }
}

function fetchCom(id) {
    container.innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/resenas?idUsuario=${id}`);
    xhr.send();
    xhr.onload = function() {
        console.log("fetchComm:", xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            let comHtml = JSON.parse(xhr.responseText);
                for(let item of comHtml){

                    container.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body">
                            <i class="fa fa-comment" aria-hidden="true"></i>
                            <hr>
                            <i class="fa fa-star" aria-hidden="true">${item.puntaje}</i>
                            <p class="card-text">${item.comentario}</p>

                            <p><small>Sobre <a href="curso-pr.html">Curso</a> - hace ${Math.floor(Math.random() * 11) + 1} días</small></p>
                    </div>
        
                    <div class="card-footer text-muted">
                        <i class="fa fa-thumbs-up" aria-hidden="true">${item.likes}</i>
                        <i class="fa fa-thumbs-down" aria-hidden="true">${item.dislikes}</i>
                    </div>
                </div>         
                `;
                }
        }
   }
} 