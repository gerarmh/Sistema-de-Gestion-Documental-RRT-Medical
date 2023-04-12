const loginForm = document.getElementById('registro-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const employenumber = document.getElementById('employenumber').value;
  const username = document.getElementById('username').value;
  const rolI = document.getElementById('rol').value;
  const rol = [rolI];
  const password = document.getElementById('password').value;
  const token = localStorage.getItem('token');

  fetch('http://localhost:4600/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ username, employenumber, password, rol })
  })
  .then(response => {
    if (response.ok) {
      // Inicio de sesión exitoso, redirecciona al usuario
      Swal.fire({
        title:'Usuario Registrado!',
        text:'Continuar!',
        icon:'success',
        timer: 2000,
        showConfirmButton: false, // ocultar el botón "OK"
      }).then(() => {
        // redirigir a una nueva página después de que se muestra la alerta
        window.location.href ='/';
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tiene permisos!',
        timer: 2000,
        showConfirmButton: false // ocultar el botón "OK" 
      });
      //throw new Error('Inicio de sesión fallido');
    }
  })
  .catch(error => {
    console.error(error);
    // Manejo de errores de inicio de sesión
  });
});