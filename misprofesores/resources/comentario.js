"use strict"
//let globalUsers = [];
let container = document.getElementById("lista");
let hProf = document.getElementById("hProf");
let hCurs = document.getElementById("hCurs");
let formBtn = document.querySelector("#formCom");
formBtn.addEventListener("submit", (e) => postRes(e));

var idRel = "1"; //clicked
let nombreC;
fetchRel(idRel); //títulos

function postRes(e){
    console.log("submit");
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/resenas');
    //console.log(localStorage.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.setRequestHeader('x-auth', localStorage.token);
    let comJson = generateJson();
    console.log(comJson);
    xhr.send(comJson);
    xhr.onload = function () {
        console.log(xhr.status, xhr.statusText);
        if (xhr.status == 201) {
            alert('Reseña registrada')
            //document.getElementById("close-btn").click();
            
        } else {
            alert('Ocurrio un error durante el registro')
            //document.getElementById("close-btn").click();
        }
    }




}

function generateJson() {
    let id = "10";
    let comentario = document.getElementById("inputCom").value;
    let puntaje = document.querySelector("input:checked").value;
    let likes = "0";
    let dislikes = "0";
    let idUsuario = "2";
    let idRelacion = idRel;


    let com = { id,
                 puntaje,
                 comentario,
                 puntaje,
                 likes,
                 dislikes,
                 idUsuario,
                 idRelacion
                };
    // Create json here
    return JSON.stringify(com);
}

function fetchRel(idRel) {
    let xhrR = new XMLHttpRequest();
    xhrR.open("GET", `http://localhost:3000/relaciones?id=${idRel}`, true);
    xhrR.send();
    xhrR.onload = function() {
        console.log("fetchRel:",JSON.parse(xhrR.responseText), xhrR.status, xhrR.statusText, xhrR.response, JSON.parse(xhrR.response));
        if (xhrR.status == 200) {
            let relacion = JSON.parse(xhrR.responseText);
                for(let item of relacion){
                    let idProf = item.idProfesor;
                    let idCurs = item.idCurso;
                    console.log("id:",idProf,idCurs);
                    fetchProf(idProf);
                    fetchCurs(idCurs);
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

