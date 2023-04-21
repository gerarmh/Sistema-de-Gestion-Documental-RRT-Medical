window.addEventListener('load', () => {

fetch('http://localhost:4600/api/manual')
.then(response => response.json())
.then(data => {

  const divContainer = document.querySelector('.container-manual');

  data.forEach(dato => {
    if (dato.vigencia === "vigente") {
    const nombre = dato.nombre;
    const folio = dato.folio;

    const archivoBuffer = new Uint8Array(dato.archivo.data);
    const archivoBlob = new Blob([archivoBuffer], { type: 'application/pdf' });
    const fileReader = new FileReader();
    
    fileReader.readAsDataURL(archivoBlob);
  
    fileReader.onloadend = () => {
    const dataUrl = fileReader.result;

    const divCaja = document.createElement('div');
    divCaja.setAttribute('class', 'caja');

    const referencia = document.createElement('a');
    referencia.setAttribute('href', 'javascript:void(0)');
    referencia.setAttribute('id', folio);

    referencia.addEventListener('click', () => {
      const newWindow = window.open();
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `${dataUrl}#toolbar=0`);
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      newWindow.document.body.appendChild(iframe);
      //window.open(`${dataUrl}#toolbar=0`, '_blank');
    });

    const vistaPrevia = document.createElement('iframe');
    vistaPrevia.setAttribute('src', `${dataUrl}#page=1`);
    divCaja.appendChild(vistaPrevia);

    const  folioInput = document.createElement('input');
    folioInput.setAttribute('type', 'text');
    folioInput.value = folio;
    folioInput.setAttribute('readOnly', 'true');
    folioInput.setAttribute('class', 'image-title folio');
    folioInput.setAttribute('disabled', 'true');
    divCaja.appendChild(folioInput);

    const  nombreInput = document.createElement('input');
    nombreInput.setAttribute('type', 'text');
    nombreInput.value = nombre;
    nombreInput.setAttribute('readOnly', 'true');
    nombreInput.setAttribute('class', 'image-title');
    nombreInput.setAttribute('disabled', 'true');
    divCaja.appendChild(nombreInput);

    referencia.appendChild(divCaja);
    divContainer.appendChild(referencia);
    }
  }
  });
  // Manejar los datos obtenidos de la API
})
.catch(error => {
  // Manejar los errores de la solicitud
  console.error(error);
});
  
})

function ocultarA() {
    var divContainer = document.querySelector(".container-manual");
    // Obtener el valor del campo de entrada de texto
    var nombreA = document.getElementById("nombre_a").value;
    // Buscar los elementos div con los nombres correspondientes
    var existe = document.getElementById(nombreA);
    
    var as = divContainer.querySelectorAll("a");
    if (nombreA === "" || existe === null) {
      for (var i = 0; i < as.length; i++) {
        as[i].style.display = "block";
      }
    } else {
      for (var i = 0; i < as.length; i++) {
        if (as[i].id !== nombreA) {
          as[i].style.display = "none";
        }
      }
    }
  }


  var inputA = document.getElementById("nombre_a");

  inputA.addEventListener("input", function() {
    mostrarA();
  });

function mostrarA() {
  var divContainer = document.querySelector(".container-manual");
  var nombreA = inputA.value;
  var as = divContainer.querySelectorAll("a");
  if (nombreA === "") {
    for (var i = 0; i < as.length; i++) {
      as[i].style.display = "block";
    }
  }
}