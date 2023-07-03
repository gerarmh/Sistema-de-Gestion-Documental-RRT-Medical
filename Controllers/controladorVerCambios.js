window.addEventListener('load', async () => {

  const token = localStorage.getItem('token');

  if (token) {


  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const response = await fetch(`http://localhost:4600/api/soli/${id}`);
    const data = await response.json();
    const archivo = data.archivo;
    const area = data.area;
    const folio = data.folio;
    const rol = localStorage.getItem('rol');
    const username = localStorage.getItem('username');
    const userid = localStorage.getItem('id');
    const comentario = data.comentarios;

    const tbody = document.getElementById('contenedor');

    const espectitulo = data.epytit.map((procedimientos) =>
      fetch(`http://localhost:4600/api/manual/${procedimientos}`).then(
        (response) => response.json()
      )
    );

    const procedimientos = await Promise.all(espectitulo);
    
    procedimientos.forEach((data, indice) => {

          archivo.forEach((pdf, id) => {

            if (id === indice) {

              const pdfData = pdf;

              const interior = document.createElement('tr');
              interior.setAttribute('class', 'tr-interior');
              tbody.appendChild(interior);
    
              const nombre = document.createElement('td');
              nombre.setAttribute('data-label', 'Procedimiento')
              nombre.textContent = data.nombre;
              interior.appendChild(nombre);
    
              const ver = document.createElement('td');
              ver.setAttribute('data-label', 'Documento');
              interior.appendChild(ver);

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

            })
          })

          const interior = document.createElement('tr');
          interior.setAttribute('class', 'tr-interior');
          tbody.appendChild(interior);
          
          const caja = document.createElement('td');
          caja.setAttribute('data-label', 'Procedimiento')
          caja.textContent = 'Comentarios';
          interior.appendChild(caja);
          
          const br = document.createElement('br');
          caja.appendChild(br);

          const text = document.createElement('textarea');
          text.setAttribute('required', 'true');
          text.setAttribute('id', 'comentario');
          caja.appendChild(text);

          const tdsubmit = document.createElement('td');
          tdsubmit.setAttribute('data-label', 'Documento');
          interior.appendChild(tdsubmit);

          const submit = document.createElement('input');
          submit.setAttribute('type', 'submit');
          submit.setAttribute("class", "btn");
          submit.setAttribute("value", "Enviar");
          tdsubmit.appendChild(submit);

          const formulario = document.getElementById('comentarios');

          formulario.addEventListener('submit', (event) => {
            event.preventDefault();

            const textarea = document.getElementById('comentario').value;

            fetch(`http://localhost:4600/api/soli/${id}/${folio}/${rol}/${username}/${userid}/${area}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify({textarea})
          })
          .then(response => {
            if (response.ok) {
              Swal.fire({
                title:'Se han enviado los comentarios con exito!',
                text:'Continuar!',
                icon:'success',
                timer: 2000, // tiempo en milisegundos (3 segundos)
                showConfirmButton: false, // ocultar el botón "OK"
              }).then(() => {
                window.location.href = '/solicitudes';
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Ha ocurrido un error al realizar la acción! ${response.status}`,
                timer: 2000, // tiempo en milisegundos (3 segundos)
                showConfirmButton: false // ocultar el botón "OK" 
              })
            }
          })
          .catch(error => console.error(error));
        });
          
        } catch(error) {
           console.error(error);
        }

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe iniciar sesion para acceder a esta vista!',
          timer: 2000, // tiempo en milisegundos (3 segundos)
          showConfirmButton: false // ocultar el botón "OK" 
        }).then(() => {
          // redirigir a una nueva página después de que se muestra la alerta
          window.location.href ='/';
        })
      }
     })