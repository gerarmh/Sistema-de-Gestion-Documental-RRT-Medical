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
    const archivo = data.archivo;
    
    espectitulo.forEach((procedimientos, indice) => {

      fetch(`http://localhost:4600/api/manual/${procedimientos}`)
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
          cambios.setAttribute('data-label', 'Folio');
          interior.appendChild(cambios);

          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('id', 'folio' + contador);
          input.setAttribute('required', 'true');
          cambios.appendChild(input);

          const ver = document.createElement('td');
          ver.setAttribute('data-label', 'Documento');
          interior.appendChild(ver);

          let pdfData = null;

          for ( let id = archivo.length - 1; id >= 0; id-- ) {

            if (indice === id) {

              pdfData = archivo[id];

              const archivoBuffer = new Uint8Array(pdfData.data);
              const archivoBlob = new Blob([archivoBuffer], { type: 'application/pdf' });
              const fileReader = new FileReader();
              
              fileReader.readAsDataURL(archivoBlob);
            
              fileReader.onloadend = () => {
              const dataUrl = fileReader.result;
              const refcambios = document.createElement('div');
              refcambios.setAttribute('class', 'boton-modal');
              ver.appendChild(refcambios);
          
              const lcambios = document.createElement('label');
              lcambios.setAttribute('for', 'btn-modal');
              lcambios.textContent = 'Ver';
              refcambios.appendChild(lcambios);
          
              refcambios.addEventListener('click', () => {
                const newWindow = window.open();
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `${dataUrl}#toolbar=0`);
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                newWindow.document.body.appendChild(iframe);
              });
              }
             }

            }

            const inputnombre = document.createElement('input');
            inputnombre.setAttribute('type', 'hidden');
            inputnombre.setAttribute('id', 'nombre' + contador);
            inputnombre.setAttribute('value', data.nombre);
            cambios.appendChild(inputnombre);
  
            const inputarea = document.createElement('input');
            inputarea.setAttribute('type', 'hidden');
            inputarea.setAttribute('id', 'area' + contador);
            inputarea.setAttribute('value', data.area);
            cambios.appendChild(inputarea);
  
            const inputvigencia = document.createElement('input');
            inputvigencia.setAttribute('type', 'hidden');
            inputvigencia.setAttribute('id', 'vigencia' + contador);
            inputvigencia.setAttribute('value', data.nombre);
            cambios.appendChild(inputvigencia);
            
            const inputarchivo = document.createElement('input');
            inputarchivo.setAttribute('type', 'hidden');
            inputarchivo.setAttribute('id', 'archivo' + contador);
            inputarchivo.setAttribute('value', pdfData);
            cambios.appendChild(inputarchivo);

          contador++;

          //Post manual
          }).catch(error => console.error(error));
          
    })
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
