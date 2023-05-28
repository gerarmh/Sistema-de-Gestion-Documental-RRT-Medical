window.addEventListener('load', () => {

  const rol = localStorage.getItem('rol');
  const token = localStorage.getItem('token');

  if (token) {

  if (rol === "SuperUser") {

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');


fetch(`http://localhost:4600/api/soli/${id}`)
  .then(response => response.json())
  .then(async data => {
  
    const espectitulo = data.epytit;

    const boton = document.getElementById('boton');
    
    for (const procedimientos of espectitulo) {
      try {

        const response = await fetch(`http://localhost:4600/api/manual/${procedimientos}`);
        const data = await response.json();
          
        const interior = document.createElement('tr');
        interior.setAttribute('class', 'tr-interior');
        boton.insertAdjacentElement('beforebegin', interior);

        const nombre = document.createElement('td');
        nombre.setAttribute('data-label', 'Procedimiento')
        nombre.textContent = data.nombre;
        interior.appendChild(nombre);
          
        const cambios = document.createElement('td');
        cambios.setAttribute('data-label', 'Documento');
        interior.appendChild(cambios);

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('id', 'archivo');
        input.setAttribute('multiple', 'false');
        input.setAttribute('accept', 'application/pdf');
        input.setAttribute('required', 'true');
        cambios.appendChild(input);
      } catch (error) {
        console.error(error);
      }
    }
  });

const boton = document.querySelector('.boton-modal');

boton.addEventListener('click', (event) => {
  event.preventDefault();

  const tbody = document.getElementById('contenedor');

  const inputs = tbody.querySelectorAll('input');

  const iduser = localStorage.getItem('id');

  const token = localStorage.getItem('token')

  const formData = new FormData();

  inputs.forEach(archivo => {
    formData.append(`archivo`, archivo.files[0]);
  })

  fetch(`http://localhost:4600/api/soli/${id}/${iduser}`, {
            method: 'PUT',
            headers: {
              'x-access-token': token
            },
            body: formData
          })
          .then(response => {
            if (response.ok) {
              Swal.fire({
                title:'Se han agregado los cambios!',
                text:'Continuar!',
                icon:'success',
                timer: 2000, // tiempo en milisegundos (3 segundos)
                showConfirmButton: false, // ocultar el botón "OK"
              }).then(() => {
                // redirigir a una nueva página después de que se muestra la alerta
                window.location.href ='/administrar';
              });
            }
          })
          .catch(error => console.error(error));
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

});
