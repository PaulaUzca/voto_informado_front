document.addEventListener('DOMContentLoaded', function() {
    // Capturamos todos los radio buttons
    const radios = document.querySelectorAll('input[type="radio"][name="opcion"]');

    // Función que se ejecuta cuando se selecciona un radio button
    function handleSelection(event) {
        const municipiosList = document.getElementById('municipios-list');

        if (event.target.id !== 'asamblea' && event.target.id !== 'gobernador') {
            municipiosList.style.display = 'block';
        } else {
            municipiosList.style.display = 'none';
        }
        localStorage.setItem("Cargo", event.target.id);
    }

    // Añadimos un event listener a cada radio button
    radios.forEach(radio => {
        radio.addEventListener('change', handleSelection);
    });
    
});



document.addEventListener('DOMContentLoaded', function() {
document.getElementById("municipios-list").addEventListener("change", function () {
    var candidatoContainer = document.getElementById("candidatos-list");
    if (this.value !== "") {
        candidatoContainer.style.display = "block";
    } else {
        candidatoContainer.style.display = "none";
    }

    // Obtener el elemento select
    const dropdown = document.getElementById("municipio");
    
    // Obtener la opción seleccionada
    const opcionSeleccionada = dropdown.options[dropdown.selectedIndex];
    
    // Obtener el valor de la opción seleccionada
    const valorSeleccionado = opcionSeleccionada.value;
    localStorage.setItem("Municipio", valorSeleccionado);      
            

});
});


document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.Departamento');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Obtener el valor del atributo name
            const nameValue = event.target.id; // o event.target.getAttribute('name');
            const departamentos = {
                "COL1283": "Amazonas", 
                "COL1314": "Antioquia", 
                "COL1315": "Boyacá", 
                "COL1316": "Córdoba", 
                "COL1317": "Santander", 
                "COL1318": "La Guajira", 
                "COL1342": "San Andrés y Providencia", 
                "COL1397": "Caldas", 
                "COL1398": "Cundinamarca", 
                "COL1399": "Bogota", 
                "COL1400": "Quindío", 
                "COL1401": "Risaralda", 
                "COL1402": "Tolima", 
                "COL1403": "Caquetá", 
                "COL1404": "Cauca", 
                "COL1405": "Huila", 
                "COL1406": "Nariño", 
                "COL1407": "Putumayo", 
                "COL1408": "Valle del Cauca", 
                "COL1412": "Atlántico", 
                "COL1413": "Bolívar", 
                "COL1414": "Cesar", 
                "COL1415": "Chocó", 
                "COL1416": "Magdalena", 
                "COL1417": "Sucre", 
                "COL1420": "Arauca", 
                "COL1421": "Norte de Santander", 
                "COL1422": "Casanare", 
                "COL1423": "Guaviare", 
                "COL1424": "Guainía", 
                "COL1425": "Meta", 
                "COL1426": "Vaupés", 
                "COL1427": "Vichada"
            };
            
            // Ejemplo de uso:
            let codigo = nameValue;
            let nombreDepartamento = departamentos[codigo] || "Código no encontrado";
            console.log(nombreDepartamento); // Mostrará "Cauca"
            
            // Obtén el elemento div por su ID
            const miElemento = document.getElementById("txtDepartamento");

            // Define el texto y el estilo que deseas aplicar
            const texto = nombreDepartamento;
            const estilo = "color: #009688; font-size: 30px; font-weight: bold;";

            // Cambia el contenido y el estilo del elemento
            miElemento.textContent = texto;
            miElemento.style = estilo;

            localStorage.setItem("Departamento", texto);


            const radioButtons = document.querySelectorAll('.radio-option');

            const Departamento = nombreDepartamento.toUpperCase()
    
                // Obtén todos los radio buttons del grupo por su nombre
            var opciones = document.getElementsByName("opcion");
    
            // Itera sobre los radio buttons para encontrar el seleccionado
            for (var i = 0; i < opciones.length; i++) {
                if (opciones[i].checked) {
                    // Cuando se encuentra el seleccionado, obtén su valor
                    var cargo= opciones[i].value.toUpperCase();
                    break; // Termina el bucle una vez que se ha encontrado el seleccionado
                }   
            }
    
            console.log(Departamento)
            /*fetch(http://localhost:5000/municipios?departamento=${Departamento}&cargo=${cargo}`)*/
            fetch(`https://pauzca.pythonanywhere.com/municipios?departamento=${Departamento}&cargo=${cargo}`)
            .then(response => response.json())
            .then(data => {
                // Muestra los datos en la página
                
                const select = document.getElementById('municipio');
                for (var i = 0; i < data.length; i++) {
                    
                    console.log(cargo)
                    const nuevoValor = select.options.length + 1;  // Valor único para el nuevo elemento
                    const nuevoElemento = `${data[i]}`;
    
                    const newOption = document.createElement('option');
                    newOption.value = nuevoValor;
                    newOption.text = nuevoElemento;
    
                    select.appendChild(newOption);
                }
                console.log(data.length)
            })
            .catch(error => {
                console.error('Error al obtener los datos de la API', error);
            });
            });
        });
    });




document.addEventListener('DOMContentLoaded', function() {
    const elements = document.getElementsByClassName('delimPath')
    // Define una función para restaurar el color original de todos los elementos
    function restaurarColorOriginal() {
      for (const element of elements) {
        element.style.fill = '#009688'; // Restaura el color original (azul en este caso)
      }
    }
    
    // Agrega un evento de clic a cada elemento
    for (const element of elements) {
      element.addEventListener('click', function() {
        // Restaura el color original de todos los elementos
        restaurarColorOriginal();
    
        // Cambia el color de relleno del elemento actual al hacer clic
        element.style.fill = '#005c53'; // Cambia a tu color deseado
      });
    }
});




/* CONSULTAS */

document.addEventListener('DOMContentLoaded', function() {

    fetch('http://localhost:5000/consultar?departamento=SANTANDER&cargo=ALCALDE&municipio=BARRANCABERMEJA')
    .then(response => response.json())
    .then(data => {
        // Muestra los datos en la página
        
        const select = document.getElementById('candidato');
        for (var i = 0; i < data.length; i++) {

            const nuevoValor = select.options.length + 1;  // Valor único para el nuevo elemento
            const nuevoElemento = `${data[i]}`;

            const newOption = document.createElement('option');
            newOption.value = nuevoValor;
            newOption.text = nuevoElemento;

            select.appendChild(newOption);
        }
        console.log(data.length)
    })
    .catch(error => {
        console.error('Error al obtener los datos de la API', error);
    });
});



/*PARA LLENAR MUNICIPIOS*/ 

document.addEventListener('DOMContentLoaded', function() {



    
});

