window.addEventListener('load', () => {

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');


fetch(`http://localhost:4600/api/soli/${id}`)
 .then(response => response.json())
 .then(data => {
  
    const espectitulo = data.epytit;

    let contador = 1;

    const tbody = document.getElementById('contenedor');
    
    for( let i = espectitulo.length -1; i >= 0; i--) {

      fetch(`http://localhost:4600/api/manual/${espectitulo[i]}`)
        .then(response => response.json())
        .then(data => {
          
          const interior = document.createElement('tr');
          interior.setAttribute('class', 'tr-interior');
          tbody.insertAdjacentElement('afterbegin', interior);

          const nombre = document.createElement('td');
          nombre.setAttribute('data-label', 'Procedimiento')
          nombre.textContent = data.nombre;
          interior.appendChild(nombre);
          
          const cambios = document.createElement('td');
          cambios.setAttribute('data-label', 'Documento');
          interior.appendChild(cambios);

          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('id', 'archivo' + contador);
          input.setAttribute('multiple', 'false');
          input.setAttribute('accept', 'application/pdf');
          input.setAttribute('required', 'true');
          cambios.appendChild(input);

          contador++;
          }).catch(error => console.error(error));
          
    }
 })

const boton = document.querySelector('.boton-modal');

boton.addEventListener('click', (event) => {
  event.preventDefault();

  const archivo = [];

  const tbody = document.getElementById('contenedor');

  const inputs = tbody.querySelectorAll('input');

  const iduser = localStorage.getItem('id');

  const token = localStorage.getItem('token')

  inputs.forEach(input => {
    if (input.files.length > 0) {
      archivo.push(input.files[0]);
    }
  })

  const formData = new FormData();

  archivo.forEach(archivo => {
    formData.append(`archivo`, archivo);
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

});
