		//-----------------
//profesor get
		//-------------------
		function ShowSelectedProfe(){
            console.log('dentro de funciossn');
                const xhttp = new XMLHttpRequest();
                //true es igual a que sea asincrono
                xhttp.open('GET','/api/users/?tipo=PROF',true);
                xhttp.setRequestHeader("x-user-token", localStorage.token);
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
            <option> ${item.uid} </option>
        `
            }
                    }
                }
            
            }
            function ShowSelectedAlumnos(){
                console.log('dentro de funciossn');
                    const xhttp = new XMLHttpRequest();
                    //true es igual a que sea asincrono
                    xhttp.open('GET','/usuarios',true);
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
                xhttp.open('GET','/api/courses',true);
                xhttp.setRequestHeader("x-user-token", localStorage.token);

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
            <option> ${item.couid}</option>
        `
            }
            let res3 = document.querySelector("#BusquedaProfesor");
            res3.innerHTML = '';
            //console.log(datos);
            for(let item of datos2){
            
            res3.innerHTML +=`
            <option> ${item.couid}</option>
        `
            }
                    }
                }
            
            }
            function ShowSelectedid(){
                console.log('dentro de crvrfunciossn');
                    const xhttp = new XMLHttpRequest();
                    //true es igual a que sea asincrono
                    xhttp.open('GET','/api/users',true);
                    xhttp.setRequestHeader("x-user-token", localStorage.token);
    
                    xhttp.send();
                    xhttp.onreadystatechange= function(){
                        if(this.readyState==4 && this.status == 200){
                //console.log(this.responseText);
                let datosP = JSON.parse(this.responseText);
                let resP = document.querySelector("#id");
                resP.innerHTML = '';
                //console.log(datos);
                for(let item of datosP){
                
                resP.innerHTML +=`
                <option> ${item.uid} </option>
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
                ShowSelectedid()
                ShowSelectedAlumnos()
                traerDatos2()
                traerDatos3()
            console.log('dentro de funcion');
                const xhttp = new XMLHttpRequest();
                //true es igual a que sea asincrono
                xhttp.open('GET','/api/relations ',true);
                xhttp.setRequestHeader("x-user-token", localStorage.token);

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
            <td>${item.rid} </td>
            <td>${item.idProfesor} </td>
            <td>${item.idCurso}</td>
            <td>${item.periodo} </td>
            <td>${item.year}</td>
            </tr>`
			}
			
                    
                }
            
            }}
            function traerDatos2(){

            console.log('dentro de funcion');
                const xhttp = new XMLHttpRequest();
                //true es igual a que sea asincrono
                xhttp.open('GET','/api/users?tipo=PROF',true);
                xhttp.setRequestHeader("x-user-token", localStorage.token);

                xhttp.send();
                xhttp.onreadystatechange= function(){
                    if(this.readyState==4 && this.status == 200){
            //console.log(this.responseText);
            let datos1 = JSON.parse(this.responseText);
            let res1 = document.querySelector("#res2");
            res1.innerHTML = '';
			//console.log(datos);
            for(let item of datos1){
            
            res1.innerHTML +=`
            <tr>
            <td>${item.uid} </td>
            <td>${item.nombre} </td>
            </tr>`
			}
			
                    
                }
            
            }}
            function traerDatos3(){

                console.log('dentro de funcion');
                    const xhttp = new XMLHttpRequest();
                    //true es igual a que sea asincrono
                    xhttp.open('GET','/api/courses',true);
                    xhttp.setRequestHeader("x-user-token", localStorage.token);
    
                    xhttp.send();
                    xhttp.onreadystatechange= function(){
                        if(this.readyState==4 && this.status == 200){
                //console.log(this.responseText);
                let datos1 = JSON.parse(this.responseText);
                let res1 = document.querySelector("#res3");
                res1.innerHTML = '';
                //console.log(datos);
                for(let item of datos1){
                
                res1.innerHTML +=`
                <tr>
                <td>${item.couid} </td>
                <td>${item.nombre} </td>
    
                </tr>`
                }
            }
        }
            }
            function registrarProfeMateria(event){
                
                var prof = document.getElementById("Profesor").value,
                mat = document.getElementById("Materia").value
                ruid = document.getElementById("id").value

                per = document.getElementById("Periodo").value
                año = document.getElementById("Año").value

                let data ={
                    rid:ruid,
                    idProfesor:prof,
                    idCurso:mat,
                periodo:per,
                year:año
              
                };
                let xhr = new XMLHttpRequest();
                xhr.open("POST",`/api/relations`);
                xhttp.setRequestHeader("x-user-token", localStorage.token);
                xhr.setRequestHeader("content-Type","application/json");
                xhr.send(JSON.stringify(data));
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
                  function ShowSelectedProfeBuscar(){
                    console.log('DentroFiltro');
                        const xhttp = new XMLHttpRequest();
                        //true es igual a que sea asincrono
                        xhttp.open('GET','/profesores',true);
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