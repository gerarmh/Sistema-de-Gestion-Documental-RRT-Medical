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
    } else if (response.status == 403) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El numero de empleado ya existe, ingrese uno distinto!',
        timer: 2000,
        showConfirmButton: false // ocultar el botón "OK" 
      });
    } else if (response.status == 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre de ususario ya existe, ingrese uno distinto!',
        timer: 2000,
        showConfirmButton: false // ocultar el botón "OK" 
      });
    } else if (response.status == 426) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tiene permisos para realizar esta accion!',
        timer: 2000,
        showConfirmButton: false // ocultar el botón "OK" 
      });
    }
  })
  .catch(error => {
    console.error(error);
    // Manejo de errores de inicio de sesión
  });
});