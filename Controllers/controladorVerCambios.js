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