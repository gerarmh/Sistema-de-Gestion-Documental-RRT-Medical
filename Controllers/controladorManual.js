window.addEventListener('load', () => {

fetch('http://localhost:4600/api/manual')
.then(response => response.json())
.then(data => {

  const divContainer = document.querySelector('.container-manual');

  data.forEach(dato => {
    const divCaja = document.createElement('div');
    divCaja.setAttribute('class', 'caja');
    
    const referencia = document.createElement('a');
    referencia.setAttribute('href', '../pdf/vigentes/baldor.pdf#toolbar=0');

    const vistaPrevia = document.createElement('iframe');
    vistaPrevia.setAttribute('src', '../pdf/vigentes/baldor.pdf#page=1');
    divCaja.appendChild(vistaPrevia);

    const  nombreInput = document.createElement('input');
    nombreInput.setAttribute('type', 'text');
    nombreInput.value = dato.Name;
    nombreInput.setAttribute('readOnly', 'true');
    nombreInput.setAttribute('class', 'image-title');
    nombreInput.setAttribute('disabled', 'true');
    divCaja.appendChild(nombreInput);

    referencia.appendChild(divCaja);
    divContainer.appendChild(referencia);
    
    
  });
  // Manejar los datos obtenidos de la API
})
.catch(error => {
  // Manejar los errores de la solicitud
  console.error(error);
});
  
})