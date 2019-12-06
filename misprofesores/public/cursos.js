"use strict"
//let globalUsers = [];
let container = document.getElementById("lista");

container.innerHTML = "";

//profesor.html
fetch();

function fetch() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/courses`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();
    xhr.onload = function () {
        console.log(xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            let userHtml = JSON.parse(xhr.responseText);
            for (let item of userHtml) {
                container.innerHTML += ` 
                
                    <div class="card text-center "  >
                   
                        <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                                <i class="fa fa-user" aria-hidden="true"></i>
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

/* //___________json server
"use strict"
//let globalUsers = [];
let container = document.getElementById("lista");

container.innerHTML = "";

//profesor.html
fetch();

function fetch() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/cursos`);
    xhr.send();
    xhr.onload = function () {
        console.log(xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            let userHtml = JSON.parse(xhr.responseText);
            for (let item of userHtml) {
                container.innerHTML += ` 
                
                    <div class="card text-center "  >
                   
                        <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                                <i class="fa fa-user" aria-hidden="true"></i>
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
} */

