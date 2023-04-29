window.addEventListener('load', () => {

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

fetch(`http://localhost:4600/api/soli/${id}`)
 .then(response => response.json())
 .then(data => {
  
    const espectitulo = data.epytit;

    const archivo = data.archivo;

    const tbody = document.getElementById('contenedor');
    
    espectitulo.forEach((procedimientos, indice) => {

      fetch(`http://localhost:4600/api/manual/${procedimientos}`)
        .then(response => response.json())
        .then(data => {

          archivo.forEach((pdf, id) => {

            if (indice == id) {
          
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

              const pdfData = pdf.data;
              const archivoBuffer = new Uint8Array(pdfData);
              const archivoBlob = new Blob([archivoBuffer], { type: 'application/pdf' });
              const fileReader = new FileReader();
              
              fileReader.readAsDataURL(archivoBlob);
            
              fileReader.onloadend = () => {
              const dataUrl = fileReader.result;
              const refcambios = document.createElement('div');
              refcambios.setAttribute('class', 'boton-modal');
              cambios.appendChild(refcambios);
          
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
          
          

          }).catch(error => console.error(error));
    })
 }).catch(error => console.error(error));
});