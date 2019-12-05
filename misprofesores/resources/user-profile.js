"use-strict"
let editBtn = document.querySelectorAll("button")[0];
let saveBtn = document.querySelectorAll("button")[1];
let name = document.querySelectorAll("input")[0];
let email = document.querySelectorAll("input")[1];
let imgProfile = document.getElementById("imgProfile");
let changeImgBtn = document.getElementById("cofirm-btn-change-img");
let inputImg = document.getElementById("input-img-modal");

console.log(changeImgBtn, inputImg);
let user;

editBtn.addEventListener("click", (e) => edit(e));
saveBtn.addEventListener("click", (e) => save(e));
changeImgBtn.onclick = updateProfilePicture;

loadUserData();


function loadUserData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/api/users/${localStorage.userEmail}`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText);
        if (xhr.status == 200) {
            user = JSON.parse(xhr.response);
            name.value = user.nombre;
            email.value = user.correo;
            imgProfile.src = user.imagen;
            inputImg.value = user.imagen;
            console.log(user);
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
    xhr.open("PUT", `http://localhost:3000/api/users/${localStorage.userEmail}/updateprofile`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.setRequestHeader("Content-Type", "application/json");
    let user = {nombre: name.value}
    console.log(user);
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText);
        if (xhr.status == 200) {
            location.reload();
        } else {
            let res = JSON.parse(xhr.response);
            alert(`${res.error}`)
        }
    }
}

function updateProfilePicture() {
    console.log("update");
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://localhost:3000/api/users/${localStorage.userEmail}/updateprofile`);
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.setRequestHeader("Content-Type", "application/json");
    let user = {imagen: inputImg.value}
    console.log(user);
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText);
        if (xhr.status == 200) {
            //location.reload();
        } else {
            let res = JSON.parse(xhr.response);
            alert(`${res.error}`)
        }
    }
}