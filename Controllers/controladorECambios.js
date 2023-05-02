window.addEventListener('load', async () => {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const response = await fetch(`http://localhost:4600/api/soli/${id}`);
    const data = await response.json();
    const archivo = data.archivo;
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    let archivosBlob =[];
    let idprocedimiento = [];

    const bsubmit = document.getElementById('boton');

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
              bsubmit.insertAdjacentElement('beforebegin', interior);
    
              const nombre = document.createElement('td');
              nombre.setAttribute('data-label', 'Procedimiento')
              nombre.textContent = data.nombre;
              interior.appendChild(nombre);
              
              const cambios = document.createElement('td');
              cambios.setAttribute('data-label', 'Folio');
              interior.appendChild(cambios);
    
              const input = document.createElement('input');
              input.setAttribute('type', 'text');
              input.setAttribute('id', 'folio' + indice);
              input.setAttribute('required', 'true');
              cambios.appendChild(input);

              const inputnombre = document.createElement('input');
              inputnombre.setAttribute('type', 'hidden');
              inputnombre.setAttribute('id', 'nombre' + indice);
              inputnombre.setAttribute('value', data.nombre);
              cambios.appendChild(inputnombre);
    
              const inputarea = document.createElement('input');
              inputarea.setAttribute('type', 'hidden');
              inputarea.setAttribute('id', 'area' + indice);
              inputarea.setAttribute('value', data.area);
              cambios.appendChild(inputarea);
              
              const inputarchivo = document.createElement('input');
              inputarchivo.setAttribute('type', 'hidden');
              inputarchivo.setAttribute('id', 'archivo' + indice);
              inputarchivo.setAttribute('value', pdfData);
              cambios.appendChild(inputarchivo);
    
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
              archivosBlob.push(archivoBlob);
              idprocedimiento.push(data._id);
             }

            })
            const boton = document.querySelector('.boton-modal');

            boton.addEventListener('click', (event) => {
              event.preventDefault();

            const nombre = document.getElementById('nombre'+indice).value;
            const folio = document.getElementById('folio'+indice).value;
            const area = document.getElementById('area'+indice).value;
            const vigencia = 'vigente'

            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('folio', folio);
            formData.append('area', area);
            formData.append('vigencia', vigencia);
            formData.append('archivo', archivosBlob[indice]);

            fetch('http://localhost:4600/api/manual', {
              method: 'POST',
              headers: {
                'x-access-token': token
            },
              body: formData
            })
              .then(response => {
                if(response.ok) {
                console.log('salio tal como lo esperado')
                } else {
                console.log('no salio tal como lo esperado')
                }
              })
              .catch(error => {
                console.error(error);
              });

            //convertir a obsoleto
            fetch(`http://localhost:4600/api/manual/${idprocedimiento[indice]}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
              },
              body: JSON.stringify({userid})
            })
            .then(response => {
              if (response.ok) {
                console.log('procedimiento modificado')
                
              }
            })
            .catch(error => console.error(error));
          });


          //Post manual
          })
          
          
    } catch(error) {
       console.error(error);
    }
 })