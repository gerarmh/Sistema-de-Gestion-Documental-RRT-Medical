window.addEventListener('load', () => {

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const form = document.getElementById('rmanual-form');

fetch(`http://localhost:4600/api/soli/${id}`)
 .then(response => response.json())
 .then(data => {

  data.forEach(dato => { 
    const espectitulo = dato.epytit;

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
 })

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const file1 = document.getElementById('archivo1').files[0];
  const file2 = document.getElementById('archivo2').files[0];
  const file3 = document.getElementById('archivo4').files[0];
  const file4 = document.getElementById('archivo4').files[0];
  const file5 = document.getElementById('archivo5').files[0];
  const file6 = document.getElementById('archivo6').files[0];
  const file7 = document.getElementById('archivo7').files[0];
  const file8 = document.getElementById('archivo8').files[0];

  const archivo = [];

  if (file1 !== "") {
    archivo.push(file1);
  }
  if (file2 !== "") {
    archivo.push(file2);
  }
  if (file3 !== "") {
    archivo.push(file3);
  }
  if (file4 !== "") {
    archivo.push(file4);
  }
  if (file5 !== "") {
    archivo.push(file5);
  }
  if (file6 !== "") {
    archivo.push(file6);
  }
  if (file7 !== "") {
    archivo.push(file7);
  }
  if (file8 !== "") {
    archivo.push(file8);
  }

  fetch(`http://localhost:4600/api/soli/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify({archivo})
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
