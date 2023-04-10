fetch('http://localhost:4600/api/manual')
  .then(response => response.json())
  .then(data => {
    // Manejar los datos obtenidos de la API
    console.log(data);
  })
  .catch(error => {
    // Manejar los errores de la solicitud
    console.error(error);
  });