console.log("opening")

[
  "open-contratos-elecciones",
  "open-contratos-simultaneos",
  "open-contratos-entidades",
  "open-noticias"
]
  
  // Get references to elements
  const openContratosElecciones = document.getElementById("open-contratos-elecciones");



  const closeButton = document.getElementById('close-button');
  const overlay = document.getElementById('overlay');
  const dialogBox = document.getElementById('dialog-box');

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

  // Attach click event listeners
  openButton.addEventListener('click', openDialog);
  closeButton.addEventListener('click', closeDialog);
  overlay.addEventListener('click', closeDialog);