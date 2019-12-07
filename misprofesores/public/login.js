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
    let xhr = new XMLHttpRequest();
    let correo = inputEmail.value;
    let password = inputPass.value;
    console.log(correo, password);
    xhr.open("POST", `/api/login`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({correo, password}));
    xhr.onload = function() {
        console.log("status: ", xhr.status, xhr.statusText, xhr.response);
        if (xhr.status == 200) {
            let response = JSON.parse(xhr.response);
            localStorage.token = response.token;
            localStorage.currUserID = response.uid;
            localStorage.currUserType = response.tipo;
            localStorage.userEmail = inputEmail.value;
            console.log(response);
            window.open('profesores.html', '_self',false)  
        } else {
            let error = JSON.parse(xhr.response).error;
            if (error != undefined) {
                displayMsg(error, "Error");
            }
        }
    }
}

function displayMsg(msg, title) {
    let modalError = document.getElementById("modal-msg");
    modalError.querySelector(".modal-title").innerText = title;
    modalError.querySelector("#input-msg-modal").value = msg;
    $('#modal-msg').modal('show');
}

function closeMsg() {
    $('#modal-msg').modal('hide');
}
