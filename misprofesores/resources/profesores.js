"use strict"
//let globalUsers = [];
let container = document.getElementById("lista");

container.innerHTML = "";

//profesor.html
fetch();
function fetch() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/profesores`);
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
            //container.innerHTML += userHtml += xhr.response;
        }
   }
}


/* function userToHtml(user) {
    return `<div class="media col-8 mt-2">
                <div class="media-left align-self-center mr-3">
                    <img class="rounded-circle" src="https://randomuser.me/api/portraits/men/0.jpg">
                </div>
                <div class="media-body">
                    <h4>${user.nombre + " " + user.departamento}</h4>
                    <p >Correo:${user.nombre}</p>
                    <p >Fecha de nacimiento: ${user.fecha} </p>
                    <p >Sexo: ${user.departamento} </p>
                </div>
                <div class="media-right align-self-center">
                    <div class="row">
                        <a href="#" class="btn btn-primary edit "><i class="fas fa-search edit  " onclick="openDetail('${user.correo}');"></i></a>
                    </div>
                    <div class="row">
                        <a href="#" class="btn btn-primary mt-2"><i class="fas fa-pencil-alt edit  " onclick="showEditModal('${user.correo}');"  data-toggle="modal" data-target="#edit"></i></a>
                    </div>
                    <div class="row">
                        <a href="#" class="btn btn-primary mt-2"><i class="fas fa-trash-alt  remove " onclick="showDeleteModal('${user.correo}');" data-toggle="modal" data-target="#delete"></i></i></a>
                    </div>
                </div>
            </div>
            `
} */