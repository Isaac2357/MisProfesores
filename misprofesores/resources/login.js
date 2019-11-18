"use strict"
/**
 * Login
 */
let loginForm = document.querySelector("form");
let inputEmail = loginForm.querySelectorAll("input")[0];
let inputPass = loginForm.querySelectorAll("input")[1];
let loginBtn = loginForm.querySelector("button");

loginForm.addEventListener("keyup", (e) => enableLoginBtn(e));
loginBtn.addEventListener("click", (e) => login(e));

function enableLoginBtn() {
    loginBtn.disabled = inputEmail.value.length == 0 || !inputEmail.validity.valid 
                        || inputPass.value.length == 0;
}

function login(event) {
    console.log("Login");
    //
    let xhr = new XMLHttpRequest();
    /** The endpoint will change to /${email} when we have our backend,
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
            let response = JSON.parse(xhr.response);
            console.log(response);
            if (response.correo == inputEmail.value && response["contraseña"] == inputPass.value) {
                window.open('PantallaPrincipal.html', '_self',false)
                localStorage.token = "asdfgh123"    // Hardcoded token will change with the backend.
                localStorage.usermail  = inputEmail.value;
                localStorage.usertype = 1;
            } else {
                alert('Usuario no registrado.')
            }
        } else {
            alert('Ocurrió un error.')
        }
    }
}