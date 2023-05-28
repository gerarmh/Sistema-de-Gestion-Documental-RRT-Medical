window.addEventListener('load' , () => {

  const rol = localStorage.getItem('rol');
  const token = localStorage.getItem('token');

  if (token) {

  if (rol === "SuperUser") {

const rmanualForm = document.getElementById('rmanual-form');

rmanualForm.addEventListener('submit', (event) => {
    event.preventDefault();

const nombre = document.getElementById('Name').value;
const folio = document.getElementById('Folio').value;
const area = document.getElementById('Area').value;
const vigencia = "vigente";
const archivo = document.getElementById('archivo').files[0];
const token = localStorage.getItem('token');

// Crear objeto FormData
const formData = new FormData();
formData.append('nombre', nombre);
formData.append('folio', folio);
formData.append('area', area);
formData.append('vigencia', vigencia);
formData.append('archivo', archivo);

// Enviar la solicitud con fetch
fetch('http://localhost:4600/api/manual', {
  method: 'POST',
  headers: {
    'x-access-token': token
},
  body: formData
})
  .then(response => {
    if(response.ok) {
    Swal.fire({
        title:'Procedimiento Registrado!',
        text:'Continuar!',
        icon:'success',
        timer: 2000,
        showConfirmButton: false, // ocultar el botón "OK"
      }).then(() => {
        // redirigir a una nueva página después de que se muestra la alerta
        window.location.href ='/';
      });
    } else if (response.status === 400){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ese folio ya ha sido registrado, ingresa uno diferente!',
        timer: 2000,
        showConfirmButton: false // ocultar el botón "OK" 
      });
    } else if ((response.status === 403) || (response.status === 405)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay una sesion activa, inicie sesion para realizar los cambios!',
        timer: 2000,
        showConfirmButton: false // ocultar el botón "OK" 
      });
    } else if (response.status === 426) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tiene permisos para realizar esta accion',
        timer: 2000,
        showConfirmButton: false // ocultar el botón "OK" 
      });
    }
  })
  .catch(error => {
    console.error(error);
  });
});
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tiene permisos de acceder a esta interfaz!',
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
    text: 'Debe iniciar sesion para acceder a esta vista!',
    timer: 2000, // tiempo en milisegundos (3 segundos)
    showConfirmButton: false // ocultar el botón "OK" 
  }).then(() => {
    // redirigir a una nueva página después de que se muestra la alerta
    window.location.href ='/';
  })
}
})

var inputFile = document.getElementById("archivo");
var vacio = document.getElementById("vacio");
var subido = document.getElementById("subido");
var btnCancelar = document.getElementById("cancelar");

  inputFile.addEventListener("change", function() {
  if (inputFile.files.lenght === 0) {
      vacio.style.display = "block";
      subido.style.display = "none";
      btnCancelar.style.transform = "scale(0)";
    } else {
      vacio.style.display = "none";
      subido.style.display = "block";
      btnCancelar.style.transform = "scale(1)";
    }
  });
  
  btnCancelar.addEventListener("click", function() {
    inputFile.value = "";
    vacio.style.display = "block";
    subido.style.display = "none";
    btnCancelar.style.transform = "scale(0)";
  })