		//-----------------
//profesor get
		//-------------------
		function ShowSelectedProfe(){
            console.log('dentro de funciossn');
                const xhttp = new XMLHttpRequest();
                //true es igual a que sea asincrono
                xhttp.open('GET',' http://localhost:3000/profesores',true);
                xhttp.send();
                xhttp.onreadystatechange= function(){
                    if(this.readyState==4 && this.status == 200){
            //console.log(this.responseText);
            let datosP = JSON.parse(this.responseText);
            let resP = document.querySelector("#Profesor");
            resP.innerHTML = '';
            //console.log(datos);
            for(let item of datosP){
            
            resP.innerHTML +=`
            <option> ${item.nombre}</option>
        `
            }
                    }
                }
            
            }
            function ShowSelectedAlumnos(){
                console.log('dentro de funciossn');
                    const xhttp = new XMLHttpRequest();
                    //true es igual a que sea asincrono
                    xhttp.open('GET',' http://localhost:3000/usuarios',true);
                    xhttp.send();
                    xhttp.onreadystatechange= function(){
                        if(this.readyState==4 && this.status == 200){
                //console.log(this.responseText);
                let datosPA = JSON.parse(this.responseText);
                let resPA = document.querySelector("#alumnos");
                resPA.innerHTML = '';
                //console.log(datos);
                for(let item of datosPA){
                
                resPA.innerHTML +=`
                <option > ${item.nombre}</option>
            `
                }
                        }
                    }
                
                }
            		//-----------------
//materia get
		//-------------------
		function ShowSelectedMateria(){
            console.log('dentro de funciossn');
                const xhttp = new XMLHttpRequest();
                //true es igual a que sea asincrono
                xhttp.open('GET',' http://localhost:3000/cursos',true);
                xhttp.send();
                xhttp.onreadystatechange= function(){
                    if(this.readyState==4 && this.status == 200){
            //console.log(this.responseText);
            let datos2 = JSON.parse(this.responseText);
            let res2 = document.querySelector("#Materia");
            res2.innerHTML = '';
            //console.log(datos);
            for(let item of datos2){
            
            res2.innerHTML +=`
            <option> ${item.nombre}</option>
        `
            }
                    }
                }
            
            }

            let btnProfes =	document.querySelector("#botonusuarios").addEventListener('click',traerDatos1);

            function traerDatos1(){
                ShowSelectedProfeBuscar()
                ShowSelectedProfe()
                ShowSelectedMateria()
                ShowSelectedAlumnos()
            console.log('dentro de funcion');
                const xhttp = new XMLHttpRequest();
                //true es igual a que sea asincrono
                xhttp.open('GET',' http://localhost:3000/profeMateria',true);
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
            <td>${item.id} </td>
            <td>${item.nombre} </td>
            <td>${item.materia}</td>
            <td>${item.periodo} </td>
            <td>${item.año}</td>
            </tr>`
			}
			
                    
                }
            
            }}
            
            function registrarProfeMateria(event){
                var prof = document.getElementById("Profesor").value,
                mat = document.getElementById("Materia").value
                per = document.getElementById("Periodo").value
                año = document.getElementById("Año").value

                let nuevoprofe ={
                nombre:prof,
                materia:mat,
                periodo:per,
                año,año
                
                };
                let xhr = new XMLHttpRequest();
                xhr.open("POST",`http://localhost:3000/profeMateria`);
                xhr.setRequestHeader("content-Type","application/json");
                xhr.send(JSON.stringify(nuevoprofe));
                xhr.onload=function(){
                if (xhr.status==201){
                //aqui agregue los profes pero no se porque dentro del post no me funciona ,por lo tanto lo saque de la funcion
                alert("profe-curso registrado exitosamente :)");
                location.reload();
                }
                }}
                
                function filtrarmateria() {
                    var input, filter, table, tr, td, i, txtValue;
                    input = document.getElementById("BusquedaProfesor");
                    filter = input.value.toUpperCase();
                    table = document.getElementById("table");
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
                  function ShowSelectedProfeBuscar(){
                    console.log('DentroFiltro');
                        const xhttp = new XMLHttpRequest();
                        //true es igual a que sea asincrono
                        xhttp.open('GET',' http://localhost:3000/profesores',true);
                        xhttp.send();
                        xhttp.onreadystatechange= function(){
                            if(this.readyState==4 && this.status == 200){
                    //console.log(this.responseText);
                    let datosP = JSON.parse(this.responseText);
                    let resP = document.querySelector("#BusquedaProfesor");
                    resP.innerHTML = '';
                    //console.log(datos);
                    for(let item of datosP){
                    
                    resP.innerHTML +=`
                    <option > ${item.nombre}</option>
                `
                    }
                            }
                        }
                    
                    }