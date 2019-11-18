"use strict"

let registerForm = document.querySelector("form");
let inputName = registerForm.querySelectorAll("input")[0];
let inputEmail = registerForm.querySelectorAll("input")[1];
let inputPass = registerForm.querySelectorAll("input")[2];
let registerBtn = registerForm.querySelector("button");

registerForm.addEventListener("keyup", (e)=>enableRegisterBtn(e));
registerBtn.addEventListener("click", (e) => register(e));

function enableRegisterBtn(event) {
    registerBtn.disabled = inputEmail.value.length == 0 || !inputEmail.validity.valid 
                            || inputPass.value.length == 0 || inputName.value.length == 0;
}

function register(event) {
    event.preventDefault();
    let newUser = {
        id: 2,  // Hardoced id, this will change with our backend
        nombre: inputName.value,
        correo: inputEmail.value,
        contraseña: inputPass.value,
        tipo: 1,
        favProfesores: [],
        favCursos: [],
        idRelacion: []
    };
    console.log(newUser);
    /**
     * Note: After this call the user is not register for real,
     * it just mocks the behavior of the call.
     */
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://my-json-server.typicode.com/Isaac2357/MisProfesoresServer/usuarios`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(newUser));
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText);
        if (xhr.status == 201) {
            alert('Usuario registrado correctamente');
            window.open('PantallaPrincipal.html', '_self',false);
            localStorage.token = "asdfgh123"; // Harcoded token, just for now.
            localStorage.usermail  = inputEmail.value;
            localStorage.usertype = 1;
        } else {
            alert('No se pudo hacer el registro.');
        }
    }
}