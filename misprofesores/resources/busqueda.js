document.querySelector("#boton").addEventListener('click',traerDatos);

function traerDatos(){
//console.log('dentro de funcion');
	const xhttp = new XMLHttpRequest();
	//true es igual a que sea asincrono
	xhttp.open('GET',' http://localhost:3000/profesoresmanuel',true);
	xhttp.send();
	xhttp.onreadystatechange= function(){
		if(this.readyState==4 && this.status == 200){
//console.log(this.responseText);
let datos = JSON.parse(this.responseText);
let res = document.querySelector("#res");
res.innerHTML = '';
//console.log(datos);
for(let item of datos){

res.innerHTML +=`
<tr>
<td><a href="informacionprofesores.html">${item.id}</a>
</td>
<td>${item.Nombre}</td>
<td>${item.Materia}</td>
<td>${item.Departamento}</td>
</tr>`
}
		}
	}

}

function filtrarNombre() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
	td = tr[i].getElementsByTagName("td")[1];
	if (td) {
	  txtValue = td.textContent || td.innerText;
	  if (txtValue.toUpperCase().indexOf(filter) > -1) {
		tr[i].style.display = "";
	  } else {
		tr[i].style.display = "none";
	  }
	}       
  }
}
function filtrarmateria() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
	td = tr[i].getElementsByTagName("td")[2];
	if (td) {
	  txtValue = td.textContent || td.innerText;
	  if (txtValue.toUpperCase().indexOf(filter) > -1) {
		tr[i].style.display = "";
	  } else {
		tr[i].style.display = "none";
	  }
	}       
  }
}
function filtrardep() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("dep");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
	td = tr[i].getElementsByTagName("td")[3];
	if (td) {
	  txtValue = td.textContent || td.innerText;
	  if (txtValue.toUpperCase().indexOf(filter) > -1) {
		tr[i].style.display = "";
	  } else {
		tr[i].style.display = "none";
	  }
	}       
  }
}
function sortTable() {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("myTable");
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
	function sortTablemateria() {
		var table, rows, switching, i, x, y, shouldSwitch;
		table = document.getElementById("myTable");
		switching = true;
	
		while (switching) {
			switching = false;
			rows = table.rows;
	
			for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
	
			x = rows[i].getElementsByTagName("TD")[2];
			y = rows[i + 1].getElementsByTagName("TD")[2];
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
		function sortTabledepartamento() {
			var table, rows, switching, i, x, y, shouldSwitch;
			table = document.getElementById("myTable");
			switching = true;
		
			while (switching) {
				switching = false;
				rows = table.rows;
		
				for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
		
				x = rows[i].getElementsByTagName("TD")[3];
				y = rows[i + 1].getElementsByTagName("TD")[3];
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
	


					//--------------------------------------------------------------------



						document.querySelector("#botonusuarios").addEventListener('click',traerDatos1);

						function traerDatos1(){
						console.log('dentro de funcion');
							const xhttp = new XMLHttpRequest();
							//true es igual a que sea asincrono
							xhttp.open('GET',' http://localhost:3000/usuariosmanuel',true);
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
						<td>${item.correo}</td>
						<td>${item.Departamento}</td>
						</tr>`
						}
								}
							}
						
						}
function registrarProfe(event){
	var nombre = document.getElementById("fname").value,
	lname = document.getElementById("lname").value,
	age = document.getElementById("age").value;
	let nuevoprofe ={
		nombre1:nombre.value,
		departamento1:lname.value,
		age1:age.value

	};
	let xhr = new XMLHttpRequest();
	xhr.open("POST",`http://localhost:3000/profesoresmanuel`);
	xhr.setRequestHeader("content-Type","application/json");
	xhr.send(JSON.stringify(nuevoprofe));
	xhr.onload=function(){
		if (xhr.status==201){
			//aqui agregue los profes pero no se porque dentro del post no me funciona ,por lo tanto lo saque de la funcion
			alert("profe registrado exitosamente :)");
			location.reload();
		}
	}
}
document.querySelector("#botoncom").addEventListener('click',mostrarComentarios);

function mostrarComentarios(){
	console.log('dentro de funcion');
		const xhttp = new XMLHttpRequest();
		//true es igual a que sea asincrono
		xhttp.open('GET','http://localhost:3000/resenas',true);
		xhttp.send();
		xhttp.onreadystatechange= function(){
			if(this.readyState==4 && this.status == 200){
	//console.log(this.responseText);
	let datos = JSON.parse(this.responseText);
	let res2 = document.querySelector("#res2");
	res2.innerHTML = '';
	//console.log(datos);
	//hago un for para mostrar mas elementos de comentarios,solo los dejo asi, debo a que si agrego mas,
	//modificare parte de raul

	for (var i=0 ;i<10;i++){
	for(let item of datos){

	res2.innerHTML +=`
	<tr>
	<td>${item.idReseña}
	</td>
	<td>${item.puntaje}</td>
	<td>${item.comentario}</td>
	<td>likes:👎🏽${item.dislikes},👍🏽${item.likes} </td>
	</tr>`
	}}
			}
		}
	
	}