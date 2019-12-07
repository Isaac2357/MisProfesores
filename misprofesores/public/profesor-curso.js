"use strict"
//let globalUsers = [];
let container = document.getElementById("lista");
let hProf = document.getElementById("hProf");
let hCurs = document.getElementById("hCurs");
//var idRel = 1; //clicked
let nombreC;
let profID = localStorage.profID;
let cursID = localStorage.cursID;

let puntaje;
let pProf = document.getElementById("pProf");
//let idRel = 7; // quitar, poner profid y cursid en fetchrel

fetchRel(); //títulos

function fetchRel() {
    let xhrR = new XMLHttpRequest();
    xhrR.open("GET", `http://localhost:3000/api/relations?idCurso=${cursID}&idProfesor=${profID}`, true); //http://localhost:3000/api/relations?idCurso=1&idProfesor=32 (jala primero al prof) 
    xhrR.setRequestHeader("x-user-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNvcnJlbyI6InRlc3QyQGl0ZXNvLm14IiwidGlwbyI6IkFETUlOIiwiaWF0IjoxNTc1MzI0NzI5LCJleHAiOjE1NzU5Mjk1Mjl9.XgtAYRQA0ucDP0XXktqjRHGJ-zEJZNW4Sd-jv-sEexs");
    xhrR.send();
    xhrR.onload = function() {
        console.log("fetchRel:",JSON.parse(xhrR.responseText));
        if (xhrR.status == 200) {
            let relacion = JSON.parse(xhrR.responseText);
                for(let item of relacion){
                    let idProf = item.idProfesor;
                    let idCurs = item.idCurso;
                    let idRela = item.rid;
                    localStorage.relID = item.rid;
                    console.log("id:",idProf,idCurs);
                    fetchProf(idProf);
                    fetchCurs(idCurs);
                    fetchCom(idRela); //idRel
                }
        }
   }
    
}

function fetchProf(id){
    
    let xhrP = new XMLHttpRequest();
    xhrP.open("GET", `http://localhost:3000/api/professors/${id}`, true); 
    xhrP.setRequestHeader("x-user-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNvcnJlbyI6InRlc3QyQGl0ZXNvLm14IiwidGlwbyI6IkFETUlOIiwiaWF0IjoxNTc1MzI0NzI5LCJleHAiOjE1NzU5Mjk1Mjl9.XgtAYRQA0ucDP0XXktqjRHGJ-zEJZNW4Sd-jv-sEexs");
    xhrP.send();
    xhrP.onload = function() {
        console.log("fetchProf:",JSON.parse(xhrP.responseText), xhrP.status, xhrP.statusText, xhrP.response, JSON.parse(xhrP.response));
        if (xhrP.status == 200) {
            let itemP = JSON.parse(xhrP.responseText);
                //for(let itemP of profesor){
                    let nombreP = itemP.nombre;
                    let deptoP = itemP.correo;
                    hProf.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i>${nombreP}<small>${deptoP}</small>`
                    console.log(nombreP, deptoP);
                //}
        }
    }
}

function fetchCurs(id){
let xhrC = new XMLHttpRequest();
    xhrC.open("GET", `http://localhost:3000/api/courses/${id}`, true);
    xhrC.setRequestHeader("x-user-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNvcnJlbyI6InRlc3QyQGl0ZXNvLm14IiwidGlwbyI6IkFETUlOIiwiaWF0IjoxNTc1MzI0NzI5LCJleHAiOjE1NzU5Mjk1Mjl9.XgtAYRQA0ucDP0XXktqjRHGJ-zEJZNW4Sd-jv-sEexs");
    xhrC.send();
    xhrC.onload = function() {
        console.log("fetchCurs:",JSON.parse(xhrC.responseText), xhrC.status, xhrC.statusText, xhrC.response, JSON.parse(xhrC.response));
        if (xhrC.status == 200) {
            let itemC = JSON.parse(xhrC.responseText);
                //for(let itemC of curso){
                    nombreC = itemC.nombre;
                    let deptoC = itemC.departamento;
                    hCurs.innerHTML = `<i class="fa fa-book" aria-hidden="true"></i>${nombreC}<small>${deptoC}</small>`
                    console.log(nombreC, deptoC);
                //}
        }
   }
}

function fetchCom(id) {
    container.innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/api/comments?idRelacion=${id}`) //http://localhost:3000/comments?idRelacion=${id}
    xhr.setRequestHeader("x-user-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNvcnJlbyI6InRlc3QyQGl0ZXNvLm14IiwidGlwbyI6IkFETUlOIiwiaWF0IjoxNTc1MzI0NzI5LCJleHAiOjE1NzU5Mjk1Mjl9.XgtAYRQA0ucDP0XXktqjRHGJ-zEJZNW4Sd-jv-sEexs");
    xhr.send()
    xhr.onload = function() {
        //console.log("fetchComm:", xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            let comHtml = JSON.parse(xhr.responseText)
                for(let item of comHtml){
                    localStorage.puntaje +=item.puntaje;
                    pProf.innerHTML=localStorage.puntaje;

                    container.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                            <i class="fa fa-comment" aria-hidden="true"></i>
                            <hr>
                            <i class="fa fa-star" aria-hidden="true">${item.puntaje}</i>
                            <p class="card-text">${item.comentario}</p>

                            <p><small>Sobre <a href="curso-pr.html">${nombreC}</a> - hace ${Math.floor(Math.random() * 11) + 1} días</small></p>
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


//_____________json server
/* 
"use strict"
//let globalUsers = [];
let container = document.getElementById("lista");
let hProf = document.getElementById("hProf");
let hCurs = document.getElementById("hCurs");
//var idRel = 1; //clicked
let nombreC;
let profID = localStorage.profID;
let cursID = localStorage.cursID;
fetchRel(); //títulos

function fetchRel() {
    let xhrR = new XMLHttpRequest();
    xhrR.open("GET", `http://localhost:3000/relaciones?idProfesor=${profID}&idCurso=${cursID}`, true);//http://localhost:3000/relaciones?id=${idRel}`
    xhrR.send();
    xhrR.onload = function() {
        console.log("fetchRel:",JSON.parse(xhrR.responseText), xhrR.status, xhrR.statusText, xhrR.response, JSON.parse(xhrR.response));
        if (xhrR.status == 200) {
            let relacion = JSON.parse(xhrR.responseText);
                for(let item of relacion){
                    let idProf = item.idProfesor;
                    let idCurs = item.idCurso;
                    let idRel = item.id;
                    localStorage.relID = item.id;
                    console.log("id:",idProf,idCurs);
                    fetchProf(idProf);
                    fetchCurs(idCurs);
                    fetchCom(idRel);
                }
        }
   }
    
}

function fetchProf(id){
    
    let xhrP = new XMLHttpRequest();
    xhrP.open("GET", `http://localhost:3000/profesores?id=${id}`, true);
    xhrP.send();
    xhrP.onload = function() {
        console.log("fetchProf:",JSON.parse(xhrP.responseText), xhrP.status, xhrP.statusText, xhrP.response, JSON.parse(xhrP.response));
        if (xhrP.status == 200) {
            let profesor = JSON.parse(xhrP.responseText);
                for(let itemP of profesor){
                    let nombreP = itemP.nombre;
                    let deptoP = itemP.departamento;
                    hProf.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i>${nombreP}<small>${deptoP}</small>`
                    console.log(nombreP, deptoP);
                }
        }
    }
}

function fetchCurs(id){
let xhrC = new XMLHttpRequest();
    xhrC.open("GET", `http://localhost:3000/cursos?id=${id}`, true);
    xhrC.send();
    xhrC.onload = function() {
        console.log("fetchCurs:",JSON.parse(xhrC.responseText), xhrC.status, xhrC.statusText, xhrC.response, JSON.parse(xhrC.response));
        if (xhrC.status == 200) {
            let curso = JSON.parse(xhrC.responseText);
                for(let itemC of curso){
                    nombreC = itemC.nombre;
                    let deptoC = itemC.departamento;
                    hCurs.innerHTML = `<i class="fa fa-book" aria-hidden="true"></i>${nombreC}<small>${deptoC}</small>`
                    console.log(nombreC, deptoC);
                }
        }
   }
}


function fetchCom(id) {
    container.innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/resenas?idRelacion=${id}`);
    xhr.send();
    xhr.onload = function() {
        console.log("fetchComm:", xhr.status, xhr.statusText, xhr.response, JSON.parse(xhr.response));
        if (xhr.status == 200) {
            let comHtml = JSON.parse(xhr.responseText);
                for(let item of comHtml){
                    
                    container.innerHTML +=` 
                    <div class="card text-center" >
                    <div class="card-body" style="min-height:200px; max-height:200px; overflow:auto;">
                            <i class="fa fa-comment" aria-hidden="true"></i>
                            <hr>
                            <i class="fa fa-star" aria-hidden="true">${item.puntaje}</i>
                            <p class="card-text">${item.comentario}</p>

                            <p><small>Sobre <a href="curso-pr.html">${nombreC}</a> - hace ${Math.floor(Math.random() * 11) + 1} días</small></p>
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
}  */