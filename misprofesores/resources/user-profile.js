"use-strict"
let editBtn = document.querySelectorAll("button")[0];
let saveBtn = document.querySelectorAll("button")[1];
let name = document.querySelectorAll("input")[0];
let email = document.querySelectorAll("input")[1];
let user;

editBtn.addEventListener("click", (e) => edit(e));
saveBtn.addEventListener("click", (e) => save(e));

loadUserData();


function loadUserData() {
    let xhr = new XMLHttpRequest();
    /** The endpoint will change to /${localStorage.email} when we have our backend,
     * or we could user another endpoint /login and send the email and pass.
     * Json-server doesn´t allow us to add more than 5 fields in the db,
     * that's why we don´t use it.
    */
    xhr.open("GET", `https://my-json-server.typicode.com/Isaac2357/MisProfesoresServer/usuarios/${1}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText);
        if (xhr.status == 200) {
            user = JSON.parse(xhr.response);
            console.log(user);
            name.value = user.nombre;
            email.value = user.correo;
        } else {
            alert('Ocurrió un error.')
        }
    }
}

function edit(event) {
    console.log("Edit");
    event.preventDefault();
    saveBtn.disabled = false;
    name.disabled = false;
}

function save(event) {
    console.log("Save");
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://my-json-server.typicode.com/Isaac2357/MisProfesoresServer/usuarios/${1}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    user.name = name.value;
    console.log(user);
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText);
        if (xhr.status == 200) {
            location.reload();
        } else {
            alert('Ocurrió un error.')
        }
    }
}