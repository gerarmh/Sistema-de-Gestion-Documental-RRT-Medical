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
  .then(response => {
    if (response.ok) {
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

    } else if (response.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario no encontrado en el sistema!',
        timer: 2000, // tiempo en milisegundos (3 segundos)
        showConfirmButton: false // ocultar el botón "OK" 
      });
      //throw new Error('Inicio de sesión fallido');
    } else if (response.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos ingresados incorrectos, verifica tus credenciales!',
        timer: 2000, // tiempo en milisegundos (3 segundos)
        showConfirmButton: false // ocultar el botón "OK" 
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al iniciar sesion!',
        timer: 2000, // tiempo en milisegundos (3 segundos)
        showConfirmButton: false // ocultar el botón "OK" 
      });
    }
    return response.json();
  })
  .then(data => {
    const token = data.token;
    const id = data.decoded.id;
    const username = data.decoded.username;
    const rol = data.decoded.rol;

    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    rol.forEach(rol => {
      localStorage.setItem('rol', rol.name);
    })
    localStorage.setItem('token', token);
      
  })
  .catch(error => {
    console.error(error);
    // Manejo de errores de inicio de sesión
  });
}); 
