"use strict"
/**
 * Send email.
 */
 let emailForm = document.getElementById("send-email");
 let inputEmail = document.getElementById("email");
 let sendEmailBtn = emailForm.querySelector("button");
 let tokenEmail;
 let email;
 let user;

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
changePassBtn.addEventListener("click", (e) => getId(e))


 function enableEmailBtn(event) {
     sendEmailBtn.disabled = inputEmail.value.length == 0 || !inputEmail.validity.valid;
 }

 function sendEmail(event) {
    console.log("Send email");
    event.preventDefault();
    let xhr = new XMLHttpRequest();

    xhr.open("GET", `http://localhost:3000/api/password/token/${inputEmail.value}`);
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText);
        let res = JSON.parse(xhr.response);
        if (xhr.status == 200) {
            sendEmailFun(JSON.parse(xhr.response).token);
        } else {
            displayMsg(`${res.error}`, "Error")
        }
   }
 }

 function sendEmailFun(tokenEmail) {
    let xhr = new XMLHttpRequest();
    /** The endpoint will change to /${email} when we have our backend.*/
    xhr.open("POST", `http://localhost:3000/api/password/sendemail`);
    xhr.setRequestHeader("Content-Type", "application/json");
    let payload = {correo: inputEmail.value, code: tokenEmail};
    console.log(payload);
    xhr.send(JSON.stringify(payload));
    xhr.onload = function() {
        console.log(xhr.status, xhr.statusText);
        let res = JSON.parse(xhr.response);
        if (xhr.status == 200) {
            displayMsg(`${res.status}`, "Estatus")
            email = inputEmail.value;
            emailForm.style.display = "none";
            verForm.style.display = "block";
        } else {
            displayMsg(`${res.error}`, "Error")
        }
   }
 }

 function enableCodeBtn(event) {
    event.preventDefault();
    verBtn.disabled = inputCode.value.length == 0
 }

 function validateCode(event) {
     //lamada a back
     event.preventDefault();
     let xhr = new XMLHttpRequest();
     /** The endpoint will change to /${email} when we have our backend.*/
     xhr.open("POST", `http://localhost:3000/api/password/token/${inputEmail.value}`);
     xhr.setRequestHeader("Content-Type", "application/json");
     let payload = {token: inputCode.value};
     console.log(payload);
     xhr.send(JSON.stringify(payload));
     xhr.onload = function() {
         console.log(xhr.status, xhr.statusText);
         let res = JSON.parse(xhr.response);
         if (xhr.status == 200) {
             passForm.style.display = "block";
             verForm.style.display = "none";
         } else {
            displayMsg(`${res.error}`, "Error")
         }
    }
 }

 function enableChangePassBtn(event) {
     changePassBtn.disabled = inputPass.value.length == 0 || inputConPass.value.length == 0 
                                || (inputPass.value.length != inputConPass.value.length);
 }

 function getId(event) {
     event.preventDefault();
     console.log("Get id");
    let xhr = new XMLHttpRequest();
    /** The endpoint will change to /${email} when we have our backend.*/
    xhr.open("GET", `http://localhost:3000/api/password/validate/${inputEmail.value}`);
    xhr.send();
    xhr.onload = function() {
        console.log("status: ", xhr.status, xhr.statusText, xhr.response);
        if (xhr.status == 200) {
            let res = JSON.parse(xhr.response);
            console.log("response", res.valid, typeof res.valid);
            if (res.valid) {
                changePassword(event)
            }
        } else {
            displayMsg(`${res.error}`, "Error")
        }
    }
 }

 function changePassword(event) {
     event.preventDefault();
     if (inputPass.value == inputConPass.value ) {
        console.log("Update pass");
        let xhr = new XMLHttpRequest();
        /** The endpoint will change to /${email} when we have our backend.*/
        xhr.open("PUT", `http://localhost:3000/api/password/update/${inputEmail.value}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        let payload = {password: inputPass.value};
        console.log(payload);
        xhr.send(JSON.stringify(payload));
        xhr.onload = function() {
            console.log(xhr.status, xhr.statusText);
            let res = JSON.parse(xhr.response);
            if (xhr.status == 200) {
                window.open('login.html', '_self',false) 
                displayMsg(`${res.status}`, "Estatus")
            } else {
                displayMsg(`${res.error}`, "Error")
            }
       }
     } else {
        displayMsg(`${res.error}`, "Error")
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

 