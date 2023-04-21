const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const employenumber = document.getElementById('employenumber').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:4600/api/auth/singin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ employenumber, password })
  })
  .then(response => response.json())
  .then(data => {
    const token = data.token;
    localStorage.setItem('token', token);
    if (token) {
      // Inicio de sesión exitoso, redirecciona al usuario
      Swal.fire({
        title:'Sesion Iniciada!',
        text:'Continuar!',
        icon:'success',
        timer: 2000, // tiempo en milisegundos (3 segundos)
        showConfirmButton: false, // ocultar el botón "OK"
      }).then(() => {
        // redirigir a una nueva página después de que se muestra la alerta
        window.location.href ='/';
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario no encontrado o datos incorrectos, verifica tus credenciales!',
        timer: 2000, // tiempo en milisegundos (3 segundos)
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
