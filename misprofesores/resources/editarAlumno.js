//--------------------------------------------------------------//
//ALUMNOS
//--------------------------------------------------------------//                  
let btnUsuarios = document.querySelector("#botonAlumno").addEventListener('click', traerDatos2);

function traerDatos2() {
	document.getElementById("EditAlumno").style.display = "block";

	console.log('dentro de funcion');
	const xhttp = new XMLHttpRequest();
	//true es igual a que sea asincrono
	xhttp.open('GET', ' http://localhost:3000/usuarios', true);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.responseText);
			let datos2 = JSON.parse(this.responseText);
			let res2 = document.querySelector("#res2");
			res2.innerHTML = '';
			//console.log(datos);
			for (let item of datos2) {

				res2.innerHTML += `
<tr>
<td>${item.nombre} </td>
<td>${item.correo}</td>
<td>${item.contraseña}</td>
</tr>`
			}
		}
	}
}


function registrarAlumno(event) {
	var nombre = document.getElementById("nombre").value,
		correo = document.getElementById("correo").value,
		contraseña = document.getElementById("contraseña").value

	let nuevoAlumno = {
		nombre: nombre,
		correo: correo,
		contraseña,
		contraseña,
		tipo: 1,
		favProfesores: [],
		favCursos: [],
		idRelacion: [],

	};
	let xhr = new XMLHttpRequest();
	xhr.open("POST", `http://localhost:3000/usuarios`);
	xhr.setRequestHeader("content-Type", "application/json");
	xhr.send(JSON.stringify(nuevoAlumno));
	xhr.onload = function () {
		if (xhr.status == 201) {
			//aqui agregue los profes pero no se porque dentro del post no me funciona ,por lo tanto lo saque de la funcion
			alert("Alumno registrado exitosamente :)");
			location.reload();
		}
	}
}
//-------------------------------------Editar Alumno------------------------------------
let inputNombreA = document.getElementById("nombreAlumno");
let divFormA = document.getElementById("EditAlumno");
let divFormDA = document.getElementById("DatosAlumno");
let inputCorreoEditA = document.getElementById("editCorreoA");



function alumonEdit(event) {
	console.log("Get id");
	let xhr = new XMLHttpRequest();
	xhr.open("GET", `http://localhost:3000/usuarios?nombre=${inputNombreA.value}`);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
	xhr.onload = function () {
		if (xhr.status == 200) {
			user = JSON.parse(xhr.response)[0];
			console.log(user);
			if (user == undefined) {
				alert('El Alumno proporcionado no corresponde al de ningún usuario.')
			} else {
				divFormA.style.display = "none";
				divFormDA.style.display = "block";

			}
		}
	}
}

function changedatosA(event) {
	//	event.preventDefault();
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", `http://localhost:3000/usuarios/${user.id}`);
	xhr.setRequestHeader("Content-Type", "application/json");
	user["correo"] = inputCorreoEditA.value;
	console.log(user);
	xhr.send(JSON.stringify(user));
	xhr.onload = function () {
		console.log(xhr.status, xhr.statusText);
		if (xhr.status == 200) {
			alert('Se actualizaron datos.')
		} else {
			alert('Ha ocurrido un error al actualizar datos.')
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