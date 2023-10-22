  document.addEventListener('DOMContentLoaded', function() {
  var contratos_inhabilitados_text = "";
  var contratos_simultaneos_text = "";
  var contratos_entidades_text = "";


  const openContratosElecciones = document.getElementById("open-contratos-elecciones");
  const openContratosSimultaneos = document.getElementById("open-contratos-simultaneos");
  const openContratosEntidades = document.getElementById("open-contratos-entidades");

  const closeButton = document.getElementById('close-button');
  const overlay = document.getElementById('overlay');
  const dialogBox = document.getElementById('dialog-box');
  const dialogSpace = document.getElementById('dialog-space');


  // Function to open the dialog
  function openDialog() {
    console.log("opening")
    overlay.style.display = 'block';
    dialogBox.style.display = 'block';
  }

  // Function to close the dialog
  function closeDialog() {
      overlay.style.display = 'none';
      dialogBox.style.display = 'none';
  }

function setContratosElecciones(contratos){
  openContratosElecciones.textContent = contratos.inhabilita.length + " Contratos"
  let s = ""
  for(let contractInfo of contratos.inhabilita){
    s = s + `
      <div class="contract-details">
          <p><strong>Ciudad:</strong> ${contractInfo.ciudad}</p>
          <p><strong>Departamento:</strong> ${contractInfo.departamento}</p>
          <p><strong>Fecha de Fin del Contrato:</strong> ${contractInfo.fecha_de_fin_del_contrato}</p>
          <p><strong>Fecha de Firma:</strong> ${contractInfo.fecha_de_firma}</p>
          <p><strong>ID de Contrato:</strong> ${contractInfo.id_contrato}</p>
          <p><strong>Modalidad de Contratación:</strong> ${contractInfo.modalidad_de_contratacion}</p>
          <p><strong>Nombre de Entidad:</strong> ${contractInfo.nombre_entidad}</p>
          <p><strong>Objeto del Contrato:</strong> ${contractInfo.objeto_del_contrato}</p>
          <p><strong>Tipo de Contrato:</strong> ${contractInfo.tipo_de_contrato}</p>
          <p><strong>URL del Proceso:</strong> <a href="${contractInfo.urlproceso.url}" target="_blank">${contractInfo.urlproceso.url}</a></p>
          <p><strong>Valor del Contrato:</strong> ${contractInfo.valor_del_contrato}</p>
      </div>
      <hr class="solid">
  `;
  }
  return s;
}

function setContratosEntidades(contratos){
  let s = ""

  for(let data of contratos.entities){
    s = s + `
    <div class="contract-details">
    <p><strong>Numero de Contratos:</strong> ${data.Numero_de_Contratos}</p>
    <p><strong>Valor Total:</strong> ${data.Valor_Total}</p>
    <p><strong>Fecha de Firma:</strong> ${data.fecha_de_firma}</p>
    <p><strong>Nombre de Entidad:</strong> ${data.nombre_entidad}</p>
  </div>
  <hr class="solid">
  `;
  }
  return s;
}


function setContratosSimultaneos(contratos){
  openContratosSimultaneos.textContent = contratos.hallazgos.contract_ids.length + " Contratos"

  return `
    <div class="contract-details">
    <p><strong>Contratos que se sobrelapan:</strong> ${contratos.hallazgos.contract_ids.toString().replaceAll(',',' , ')}</p>
    <p><strong>${contratos.hallazgos.message}</strong> </p>
  </div>
  `;
}



function setCandidaturas(datos){
  let s = ""

  for(let data of datos.candidaturas.info){
    s = s + `
    <div class="candiadate-history">
      <p><strong>Años:</strong> ${data.Numero_de_Contratos}</p>
      <p><strong>Valor Total:</strong> ${data.Valor_Total}</p>
      <p><strong>Fecha de Firma:</strong> ${data.fecha_de_firma}</p>
      <p><strong>Nombre de Entidad:</strong> ${data.nombre_entidad}</p>
    </div>
  `;
  }
  return s;
}

function setDatosPrincipales(data){
  tbDepartamento = document.getElementById('tbDepartamento')
  tbCargo = document.getElementById('tbCargo')
  tbMunicipio = document.getElementById('tbMunicipio')
  tbPartido = document.getElementById('tbPartido')

  tbDepartamento.textContent = data.departamento
  tbCargo.textContent = data.cargo
  tbMunicipio.textContent = data.municipio
  tbPartido.textContent = data.partido
}


console.log("opening")

const urlParams = new URLSearchParams(window.location.search);
//const candidato = urlParams.get('candidato');
var candidato = 'JOSE GABRIEL GUERRA MANUYAMA'
/* var candidato = 'JORGE JULIAN OSORIO GOMEZ' */

console.log(candidato)

const nombreCandidato= document.getElementById("nombre_candidato");




// CAMBIAR TEXTOS
  nombreCandidato.textContent = candidato



  fetch(`https://pauzca.pythonanywhere.com/consultar/persona?nombre=${candidato.replaceAll(' ','%20')}`)
        .then(response => response.json())
        .then(data => {
         // departamento, municipio partido todo eso ...

         //buscar a alguien que tenga candidaturas
         //data.candidaturas
          console.log(data)
          contratos_inhabilitados_text = setContratosElecciones(data.contratos)
          contratos_entidades_text = setContratosEntidades(data.contratos)
          contratos_simultaneos_text = setContratosSimultaneos(data.contratos)
          setDatosPrincipales(data)
          console.log(data.candidaturas.info)


        })
        .catch(error => {
            console.error('Error al obtener los datos de la API', error);
        });



  // Attach click event listeners
  openContratosElecciones.addEventListener('click', () =>{
    dialogSpace.innerHTML = contratos_inhabilitados_text;
    openDialog();
  });

  openContratosSimultaneos.addEventListener('click', () =>{
    dialogSpace.innerHTML = contratos_simultaneos_text;
    openDialog();
  });

  openContratosEntidades.addEventListener('click', () =>{
    dialogSpace.innerHTML = contratos_entidades_text;
    openDialog();
  });

  closeButton.addEventListener('click', closeDialog);
  overlay.addEventListener('click', closeDialog);

});



