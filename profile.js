console.log("opening")
  
  // Get references to elements
  const openButton = document.getElementById('open-dialog');
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