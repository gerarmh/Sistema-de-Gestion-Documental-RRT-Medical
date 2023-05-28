window.addEventListener('load', () => {

const rol = localStorage.getItem('rol');
const token = localStorage.getItem('token');

if (token) {

if (rol === "SuperUser") {

fetch('http://localhost:4600/api/manual')
.then(response => response.json())
.then(data => {

  const tbody = document.getElementById('contenedor');

  data.forEach(dato => {
    if (dato.vigencia === "obsoleto") {
    const nombre = dato.nombre;
    const folio = dato.folio;
    const area = dato.area;
    const fecha = dato.date;

    const archivoBuffer = new Uint8Array(dato.archivo.data);
    const archivoBlob = new Blob([archivoBuffer], { type: 'application/pdf' });
    const fileReader = new FileReader();
    
    fileReader.readAsDataURL(archivoBlob);
  
    fileReader.onloadend = () => {
    const dataUrl = fileReader.result;

    const interior = document.createElement('tr');
    interior.setAttribute('class', 'tr-interior');
    tbody.appendChild(interior);

    const Lnombre = document.createElement('td');
    Lnombre.setAttribute('data-label', 'Nombre del procedimiento');
    Lnombre.textContent = nombre;
    interior.appendChild(Lnombre);

    const Larea = document.createElement('td');
    Larea.setAttribute('data-label', 'Area');
    Larea.textContent = area;
    interior.appendChild(Larea)

    const Lfecha = document.createElement('td');
    Lfecha.setAttribute('data-label', 'Fecha');
    Lfecha.textContent = fecha;
    interior.appendChild(Lfecha);

    const Lfolio = document.createElement('td');
    Lfolio.setAttribute('data-label', 'Folio');
    Lfolio.textContent = folio;
    interior.appendChild(Lfolio);
    
    const Lsolicitudes = document.createElement('td');
    Lsolicitudes.setAttribute('data-label', 'Solicitudes');
    Lsolicitudes.textContent = 'ver';
    interior.appendChild(Lsolicitudes);

    const Lcambios = document.createElement('td');
    Lcambios.setAttribute('data-label', 'Cambios realizados');
    Lcambios.textContent = '-Redaccion';
    interior.appendChild(Lcambios);

    const Lprocedimiento = document.createElement('td');
    Lprocedimiento.setAttribute('data-label', 'Ver Procedimiento');
    interior.appendChild(Lprocedimiento);

    // Modal

    const modal = document.createElement('div');
    modal.setAttribute('class', 'boton-modal');
    Lprocedimiento.appendChild(modal);

    const lmodal = document.createElement('label');
    lmodal.setAttribute('for', 'btn-modal');
    lmodal.textContent = 'Ver';
    modal.appendChild(lmodal);

    modal.addEventListener('click', () => {
      const newWindow = window.open();
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `${dataUrl}#toolbar=0`);
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      newWindow.document.body.appendChild(iframe);
      //window.open(`${dataUrl}#toolbar=0`, '_blank');
    });

//    const activador = document.createElement('input');
//    activador.setAttribute('type', 'checkbox');
//    activador.setAttribute('id', 'btn-modal');
//    //activador.setAttribute('data-url', dataUrl);
//    Lprocedimiento.appendChild(activador);
//
//    const cmodal = document.createElement('div');
//    cmodal.setAttribute('class', 'container-modal');
//    Lprocedimiento.appendChild(cmodal);
//
//    const ctmodal = document.createElement('div');
//    ctmodal.setAttribute('class', 'content-modal');
//    cmodal.appendChild(ctmodal);
//
//    const cerrar = document.createElement('div');
//    cerrar.setAttribute('class', 'btn-cerrar');
//    ctmodal.appendChild(cerrar);
//
//    const lcerrar = document.createElement('label');
//    lcerrar.setAttribute('for', 'btn-modal');
//    lcerrar.textContent = 'Cerrar';
//    cerrar.appendChild(lcerrar);
//    
//    const modalPdf = document.createElement('iframe');
//    modalPdf.setAttribute('src', `${dataUrl}#toolbar=0`);
//    modalPdf.style.width = '90%';
//    modalPdf.style.height = '90%';
//    ctmodal.appendChild(modalPdf);
    }

  }
  });
  // Manejar los datos obtenidos de la API
})
.catch(error => {
  // Manejar los errores de la solicitud
  console.error(error);
});
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No tiene premisos de acceder a esta interfaz!',
    timer: 2000, // tiempo en milisegundos (3 segundos)
    showConfirmButton: false // ocultar el botón "OK" 
  }).then(() => {
    // redirigir a una nueva página después de que se muestra la alerta
    window.location.href ='/';
  })
}
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Debe iniciar sesión para acceder a esta vista!',
    timer: 2000, // tiempo en milisegundos (3 segundos)
    showConfirmButton: false // ocultar el botón "OK" 
  }).then(() => {
    // redirigir a una nueva página después de que se muestra la alerta
    window.location.href ='/';
  })
}
  
})

//function ocultarA() {
//    var divContainer = document.querySelector(".container-manual");
//    // Obtener el valor del campo de entrada de texto
//    var nombreA = document.getElementById("nombre_a").value;
//    // Buscar los elementos div con los nombres correspondientes
//    var existe = document.getElementById(nombreA);
//    
//    var as = divContainer.querySelectorAll("a");
//    if (nombreA === "" || existe === null) {
//      for (var i = 0; i < as.length; i++) {
//        as[i].style.display = "block";
//      }
//    } else {
//      for (var i = 0; i < as.length; i++) {
//        if (as[i].id !== nombreA) {
//          as[i].style.display = "none";
//        }
//      }
//    }
//  }
//
//
//  var inputA = document.getElementById("nombre_a");
//
//  inputA.addEventListener("input", function() {
//    mostrarA();
//  });
//
//function mostrarA() {
//  var divContainer = document.querySelector(".container-manual");
//  var nombreA = inputA.value;
//  var as = divContainer.querySelectorAll("a");
//  if (nombreA === "") {
//    for (var i = 0; i < as.length; i++) {
//      as[i].style.display = "block";
//    }
//  }
//}