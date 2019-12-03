let btnProfes = document.querySelector("#botonusuarios").addEventListener('click', traerDatos1);

function traerDatos1() {
	document.getElementById("EditProf").style.display = "block";
	console.log('dentro de funcion');
	const xhttp = new XMLHttpRequest();
	//true es igual a que sea asincrono
	xhttp.open('GET', ' http://localhost:3000/profesores', true);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.responseText);
			let datos1 = JSON.parse(this.responseText);
			let res1 = document.querySelector("#res1");
			res1.innerHTML = '';
			//console.log(datos);
			for (let i = 0; i < 20; i++) {
				for (let item of datos1) {

					res1.innerHTML += `
            <tr>
            <td>${item.nombre} </td>
            <td>${item.departamento}</td>
            </tr>`
				}

			}
		}

	}
}

function registrarProfe(event) {
	var nombre = document.getElementById("fname").value,
		dep = document.getElementById("producto").value
	let nuevoprofe = {
		nombre: nombre,
		departamento: dep

	};
	let xhr = new XMLHttpRequest();
	xhr.open("POST", `http://localhost:3000/profesores`);
	xhr.setRequestHeader("content-Type", "application/json");
	xhr.send(JSON.stringify(nuevoprofe));
	xhr.onload = function () {
		if (xhr.status == 201) {
			//aqui agregue los profes pero no se porque dentro del post no me funciona ,por lo tanto lo saque de la funcion
			alert("profe registrado exitosamente :)");
			location.reload();
		}
	}
}



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
let inputDptoEdit = document.getElementById("producto");



function ProfeEdit(event) {
	console.log("Get id");
	let xhr = new XMLHttpRequest();
	xhr.open("GET", `http://localhost:3000/profesores?nombre=${inputNombre.value}`);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
	xhr.onload = function () {
		if (xhr.status == 200) {
			user = JSON.parse(xhr.response)[0];
			console.log(user);
			if (user == undefined) {
				alert('El profe proporcionado no corresponde al de ningún usuario.')
			} else {
				divForm.style.display = "none";
				divFormD.style.display = "block";

			}
		}
	}
}

function changedatos(event) {
//	event.preventDefault();
	   let xhr = new XMLHttpRequest();
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

		//-----------------

//departamento get
//-------------------
function ShowSelected() {
	console.log('dentro de funciossn');
	const xhttp = new XMLHttpRequest();
	//true es igual a que sea asincrono
	xhttp.open('GET', ' http://localhost:3000/Departamentos', true);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.responseText);
			let datos1 = JSON.parse(this.responseText);
			let res1 = document.querySelector("#producto");
			res1.innerHTML = '';
			//console.log(datos);
			for (let item of datos1) {

				res1.innerHTML += `
		<option> ${item.departamento}</option>
	`
			}
		}
	}

}
//-----------------
//Paginacion
//-------------------

paginador = function (divPaginador, tabla, tamPagina) {
	this.miDiv = divPaginador; //un DIV donde irán controles de paginación
	this.tabla = tabla; //la tabla a paginar
	this.tamPagina = tamPagina; //el tamaño de la página (filas por página)
	this.pagActual = 1; //asumiendo que se parte en página 1
	this.paginas = Math.floor((this.tabla.rows.length - 1) / this.tamPagina); //¿?

	this.SetPagina = function (num) {
		if (num < 0 || num > this.paginas)
			return;

		this.pagActual = num;
		var min = 1 + (this.pagActual - 1) * this.tamPagina;
		var max = min + this.tamPagina - 1;

		for (var i = 1; i < this.tabla.rows.length; i++) {
			if (i < min || i > max)
				this.tabla.rows[i].style.display = 'none';
			else
				this.tabla.rows[i].style.display = '';
		}
		this.miDiv.firstChild.rows[0].cells[1].innerHTML = this.pagActual;
	}

	this.Mostrar = function () {
		//Crear la tabla
		var tblPaginador = document.createElement('table');

		//Agregar una fila a la tabla
		var fil = tblPaginador.insertRow(tblPaginador.rows.length);

		//Ahora, agregar las celdas que serán los controles
		var ant = fil.insertCell(fil.cells.length);
		ant.innerHTML = 'Anterior';
		ant.className = 'pag_btn'; //con eso le asigno un estilo
		var self = this;
		ant.onclick = function () {
			if (self.pagActual == 1)
				return;
			self.SetPagina(self.pagActual - 1);
		}

		var num = fil.insertCell(fil.cells.length);
		num.innerHTML = ''; //en rigor, aún no se el número de la página
		num.className = 'pag_num';

		var sig = fil.insertCell(fil.cells.length);
		sig.innerHTML = 'Siguiente';
		sig.className = 'pag_btn';
		sig.onclick = function () {
			if (self.pagActual == self.paginas)
				return;
			self.SetPagina(self.pagActual + 1);
		}

		//Como ya tengo mi tabla, puedo agregarla al DIV de los controles
		this.miDiv.appendChild(tblPaginador);

		//¿y esto por qué?
		if (this.tabla.rows.length - 1 > this.paginas * this.tamPagina)
			this.paginas = this.paginas + 1;

		this.SetPagina(this.pagActual);
	}
}

var p = new paginador(
	document.getElementById('paginador'),
	document.getElementById('table1'),
	4
);
p.Mostrar();