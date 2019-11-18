"use strict"
/**
 * Send email.
 */
 let emailForm = document.getElementById("send-email");
 let inputEmail = document.getElementById("email");
 let sendEmailBtn = emailForm.querySelector("button");
 let tokenEmail;
 let email;

 /**
  * Code
  */
 let verForm = document.getElementById("verification");
 let inputCode = verForm.querySelector("input");
 let verBtn = verForm.querySelector("button");

 /**
  * Change password
  */
let passForm = document.getElementById("change-pass");
let inputPass = passForm.querySelectorAll("input")[0];
let inputConPass = passForm.querySelectorAll("input")[1];
let changePassBtn = passForm.querySelector("button");

 /** Add event listener for changes in the input email. */
 inputEmail.addEventListener("input", (e) => enableEmailBtn(e))
 sendEmailBtn.addEventListener("click", (e) => sendEmail(e))
 
 /** Add event listener for changes in the input code */
 inputCode.addEventListener("input", (e) => enableCodeBtn(e))
 verBtn.addEventListener("click", (e) => validateCode(e))
/** Add event listener  changes in the form pass */
passForm.addEventListener("keyup", (e) => enableChangePassBtn(e))
changePassBtn.addEventListener("click", (e) => changePassword(e))


 function enableEmailBtn(event) {
     sendEmailBtn.disabled = inputEmail.value.length < 0 || !inputEmail.validity.valid;
 }

 function sendEmail(event) {
    console.log("Send email");
    event.preventDefault();
    tokenEmail = parseInt((Math.random()*8999 + 1000) + ""); //Create random number (token) [1000,9999]
    console.log(tokenEmail);
    
    /**
     * We will need to use another API for send email
     */
    email = inputEmail.value;

    emailForm.style.display = "none";
    verForm.style.display = "block";
 }

 function enableCodeBtn(event) {
    event.preventDefault();
    verBtn.disabled = inputCode.value.length == 0 || inputCode.value.length > 4 || !inputCode.validity.valid;
 }

 function validateCode(event) {
    event.preventDefault();
    if (tokenEmail == parseInt(inputCode.value)) {
        passForm.style.display = "block";
        verForm.style.display = "none";
    } else {
        alert("El código proporcionado es incorrecto. Intente de nuevo.")
    }
 }

 function enableChangePassBtn(event) {
     changePassBtn.disabled = inputPass.value.length == 0 || inputConPass.value.length == 0 
                                || (inputPass.value.length != inputConPass.value.length);
 }

 function changePassword(event) {
     event.preventDefault();
     if (inputPass.value == inputConPass.value) {
        console.log("Update pass");
        let xhr = new XMLHttpRequest();
        /** The endpoint will change to /${email} when we have our backend.*/
        xhr.open("PUT", `https://my-json-server.typicode.com/Isaac2357/MisProfesoresServer/usuarios/${1}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        let json = {};
        json["contraseña"] = inputConPass.value;
        console.log(json);
        xhr.send(JSON.stringify(json));
        xhr.onload = function() {
            console.log(xhr.status, xhr.statusText);
            if (xhr.status == 200) {
                alert('La contraseña se actualizo correctamente.')
                window.open('login.html', '_self',false) 
            } else {
                alert('Ha ocurrido un error al actualizar su contraseña.')
            }
       }
     } else {
         alert("Contraseñas no coinciden.");
     }
 }
 