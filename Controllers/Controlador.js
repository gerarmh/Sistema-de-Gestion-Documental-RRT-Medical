const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:4600/api/auth/singin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      // Inicio de sesión exitoso, redirecciona al usuario
      window.location.href = '/';
    } else {
      throw new Error('Inicio de sesión fallido');
      window.location.href = '/manual';
    }
  })
  .catch(error => {
    console.error(error);
    // Manejo de errores de inicio de sesión
  });
});