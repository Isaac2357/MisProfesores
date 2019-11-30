


			let btnProfes =	document.querySelector("#botonusuarios").addEventListener('click',traerDatos1);

            function traerDatos1(){
            console.log('dentro de funcion');
                const xhttp = new XMLHttpRequest();
                //true es igual a que sea asincrono
                xhttp.open('GET',' http://localhost:3000/profesores',true);
                xhttp.send();
                xhttp.onreadystatechange= function(){
                    if(this.readyState==4 && this.status == 200){
            //console.log(this.responseText);
            let datos1 = JSON.parse(this.responseText);
            let res1 = document.querySelector("#res1");
            res1.innerHTML = '';
            //console.log(datos);
            for(let item of datos1){
            
            res1.innerHTML +=`
            <tr>
            <td>${item.nombre} </td>
            <td>${item.departamento}</td>
            </tr>`
            }
                    }
                }
            
            }
function registrarProfe(event){
var nombre = document.getElementById("fname").value,
lname = document.getElementById("lname").value
let nuevoprofe ={
nombre:nombre,
departamento:lname

};
let xhr = new XMLHttpRequest();
xhr.open("POST",`http://localhost:3000/profesores`);
xhr.setRequestHeader("content-Type","application/json");
xhr.send(JSON.stringify(nuevoprofe));
xhr.onload=function(){
if (xhr.status==201){
//aqui agregue los profes pero no se porque dentro del post no me funciona ,por lo tanto lo saque de la funcion
alert("profe registrado exitosamente :)");
location.reload();
}
}}


//--------------------------------------------------------------//
                    //ALUMNOS
//--------------------------------------------------------------//                  
let btnUsuarios =	document.querySelector("#botonAlumno").addEventListener('click',traerDatos2);

function traerDatos2(){
console.log('dentro de funcion');
    const xhttp = new XMLHttpRequest();
    //true es igual a que sea asincrono
    xhttp.open('GET',' http://localhost:3000/usuarios',true);
    xhttp.send();
    xhttp.onreadystatechange= function(){
        if(this.readyState==4 && this.status == 200){
//console.log(this.responseText);
let datos2 = JSON.parse(this.responseText);
let res2 = document.querySelector("#res2");
res2.innerHTML = '';
//console.log(datos);
for(let item of datos2){

res2.innerHTML +=`
<tr>
<td>${item.nombre} </td>
<td>${item.correo}</td>
<td>${item.contraseña}</td>

</tr>`
}
        }
    }

}
function registrarAlumno(event){
var nombre = document.getElementById("nombre").value,
correo = document.getElementById("correo").value,
contraseña = document.getElementById("contraseña").value

let nuevoAlumno ={
nombre:nombre,
correo:correo,
contraseña,contraseña,
tipo:1,
favProfesores: [],
favCursos: [],
idRelacion: [],

};
let xhr = new XMLHttpRequest();
xhr.open("POST",`http://localhost:3000/usuarios`);
xhr.setRequestHeader("content-Type","application/json");
xhr.send(JSON.stringify(nuevoAlumno));
xhr.onload=function(){
if (xhr.status==201){
//aqui agregue los profes pero no se porque dentro del post no me funciona ,por lo tanto lo saque de la funcion
alert("Alumno registrado exitosamente :)");
location.reload();
}
}}
