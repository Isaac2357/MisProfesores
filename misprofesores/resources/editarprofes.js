


			let btnProfes =	document.querySelector("#botonusuarios").addEventListener('click',traerDatos1);

            function traerDatos1(){
				document.getElementById("EditProf").style.display="block";
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


function sortProf() {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("table");
	switching = true;

	while (switching) {
	  switching = false;
	  rows = table.rows;

	  for (i = 1; i < (rows.length - 1); i++) {
		shouldSwitch = false;

		x = rows[i].getElementsByTagName("TD")[0];
		y = rows[i + 1].getElementsByTagName("TD")[0];
		if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
		  shouldSwitch = true;
		  break;
		}
	  }
	  if (shouldSwitch) {

		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
	  }
	}
}
function sortAlu() {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("table1");
	switching = true;

	while (switching) {
	  switching = false;
	  rows = table.rows;

	  for (i = 1; i < (rows.length - 1); i++) {
		shouldSwitch = false;

		x = rows[i].getElementsByTagName("TD")[0];
		y = rows[i + 1].getElementsByTagName("TD")[0];
		if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
		  shouldSwitch = true;
		  break;
		}
	  }
	  if (shouldSwitch) {

		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
	  }
	}
}




//-------------------------------------Editar Profe------------------------------------
let inputNombre = document.getElementById("nombreprof");
let divForm = document.getElementById("EditProf");
let divFormD = document.getElementById("Datos");
let inputNombreEdit = document.getElementById("editnombre");
let inputDptoEdit = document.getElementById("editdpto");



function ProfeEdit(event) {
	console.log("Get id");
   let xhr = new XMLHttpRequest();
   /** The endpoint will change to /${email} when we have our backend.*/
   xhr.open("GET", `http://localhost:3000/profesores?nombre=${inputNombre.value}`);
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.send();
   xhr.onload = function() {
	   if (xhr.status == 200) {
		   user = JSON.parse(xhr.response)[0];
		   console.log(user);
		   if (user == undefined) {
			   alert('El profe proporcionado no corresponde al de ningún usuario.')
		   } else {
			divForm.style.display="none";	
			divFormD.style.display="block";

			   }
	   }
   }
}
function changedatos(event) {
//	event.preventDefault();
	   let xhr = new XMLHttpRequest();
	   /** The endpoint will change to /${email} when we have our backend.*/
	   xhr.open("PUT", `http://localhost:3000/profesores/${user.id}`);
	   xhr.setRequestHeader("Content-Type", "application/json");
	   user["nombre"] = inputNombreEdit.value;
	   user["departamento"] = inputDptoEdit.value;
	   console.log(user);
	   xhr.send(JSON.stringify(user));
	   xhr.onload = function() {
		   console.log(xhr.status, xhr.statusText);
		   if (xhr.status == 200) {
			   alert('Se actualizaron datos.')
		   } else {
			   alert('Ha ocurrido un error al actualizar datos.')
		   }
	  }
	} 
