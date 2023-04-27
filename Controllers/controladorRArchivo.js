window.addEventListener('load', () => {

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const form = document.getElementById('rmanual-form');

fetch(`http://localhost:4600/api/soli/${id}`)
 .then(response => response.json())
 .then(data => {
  
    const espectitulo = data.epytit;

    let contador = 1;

    const enviar = document.getElementById('enviar');

    const divContainer = document.createElement('div');
    divContainer.setAttribute('id', 'container');
    enviar.insertAdjacentElement('beforebegin', divContainer);
    
    espectitulo.forEach(procedimientos => {

      fetch(`http://localhost:4600/api/manual/${procedimientos}`)
        .then(response => response.json())
        .then(data => {

          const inputbox = document.createElement('div');
          inputbox.setAttribute('class', 'input-box');
          divContainer.appendChild(inputbox);

          const span = document.createElement('span');
          span.setAttribute('class', 'icon');
          span.setAttribute('id', 'cancelar');
          inputbox.appendChild(span);

          const button = document.createElement('button');
          button.setAttribute('class', 'btn');
          button.setAttribute('id', 'btn-cancelar');
          span.appendChild(button);

          const divfile = document.createElement('div');
          inputbox.appendChild(divfile);

          const h3v = document.createElement('h3');
          h3v.setAttribute('id', 'vacio');
          h3v.textContent= data.nombre;
          divfile.appendChild(h3v);

          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('id', 'archivo' + contador);
          input.setAttribute('multiple', 'false');
          input.setAttribute('accept', 'application/pdf');
          input.setAttribute('required', 'true');
          divfile.appendChild(input);

          contador++;
          }).catch(error => console.error(error));
    })
 })

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const archivo = [];

  const divContainer = document.getElementById('container');

  const inputs = divContainer.querySelectorAll('input');

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
                title:'Has aceptado la solicitud!',
                text:'Continuar!',
                icon:'success',
                timer: 2000, // tiempo en milisegundos (3 segundos)
                showConfirmButton: false, // ocultar el botón "OK"
              })
            }
          })
          .catch(error => console.error(error));
  });

});
