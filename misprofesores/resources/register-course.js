"use strict"
/**
 * Register course
 */

 let registerFormC = document.querySelector("form");
 let ins =registerFormC.querySelectorAll("input");
 let name = ins[0];
 let department = ins[1];
 let credits = ins[2];
 let registerCourseBtn = registerFormC.querySelector("button");

 registerFormC.addEventListener("keyup", (e) => enableRegisterCourseBtn(e));
 registerCourseBtn.addEventListener("click", (e) => registerCourse(e))

 function enableRegisterCourseBtn(event) {
     console.log("Register c");
     registerCourseBtn.disabled = name.value.length == 0
                                    || department.value.length == 0
                                    || credits.value == 0;
 }

 function registerCourse(event) {
     console.log("Register course");
     event.preventDefault();
     let c = parseInt(credits.value);
     if (c < 4 || c > 16) {
         alert('Número de creditos inválidos.')
     } else {
         let newCourse = {
            id: 2, //Mock id
            nombre: name.value,
            departamento: department.value,
            creditos: parseInt(credits.value)
         };
         console.log(newCourse);
         let xhr = new XMLHttpRequest();
         xhr.open("POST", `https://my-json-server.typicode.com/Isaac2357/MisProfesoresServer/cursos`);
         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.send(JSON.stringify(newCourse));
         xhr.onload = function() {
             if (xhr.status == 201) {
                alert("Curso registrado correctamente.");
                location.reload();
             }
         }
     }
 }