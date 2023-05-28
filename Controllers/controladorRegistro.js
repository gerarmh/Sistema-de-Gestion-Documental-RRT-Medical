window.addEventListener('load' , () => {

  const rol = localStorage.getItem('rol');
  const token = localStorage.getItem('token');

  if (token) {

  if (rol === "SuperUser") {

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
    } else if (response.status == 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El numero de empleado ya existe, ingrese uno distinto!',
        timer: 2000,
        showConfirmButton: false // ocultar el botón "OK" 
      });
    } else if (response.status == 409) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre de usuario ya existe, ingrese uno distinto!',
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
    } else if (response.status == 401) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay una sesion activa!',
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
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No tiene permisos de acceder a esta interfaz!',
    timer: 2000, // tiempo en milisegundos (3 segundos)
    showConfirmButton: false // ocultar el botón "OK" 
  }).then(() => {
    // redirigir a una nueva página después de que se muestra la alerta
    window.location.href ='/';
  })
}

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe iniciar sesión para acceder a esta vista!',
      timer: 2000, // tiempo en milisegundos (3 segundos)
      showConfirmButton: false // ocultar el botón "OK" 
    }).then(() => {
      // redirigir a una nueva página después de que se muestra la alerta
      window.location.href ='/';
    })
  }
})