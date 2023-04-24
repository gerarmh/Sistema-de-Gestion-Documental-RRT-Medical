const rsolicitudes = document.getElementById('form');

rsolicitudes.addEventListener('submit', (event) => {
    event.preventDefault();

const nombredelsolicitante = document.getElementById('nombre').value;
const folio = document.getElementById('folio').value;
const area = document.getElementById('area').value;
const fechadesoli = document.getElementById('fechasoli').value;
const fechadeefect = document.getElementById('fechaefec').value;
const razoncambio = document.getElementById('razon').value;
const valcance = document.querySelectorAll('input[name="alcance"]:checked');
const epytit = document.getElementById('espectitulo').value;
const cambiod = document.getElementById('cambiode').value;
const cambioa = document.getElementById('cambioa').value;
const capacitacion = document.querySelector('input[name="capacitacion"]:checked').value;
const capacitaciondesc = document.getElementById('capacitaciondesc').value;
const evaluacion = document.querySelector('input[name="evaluacion"]:checked').value;
const evaluaciondesc = document.getElementById('evaluaciondesc').value;
const porqueno = document.getElementById('porqueno').value;
const requericalif = document.querySelector('input[name="reqcalificacion"]:checked').value;
const nocalif = document.getElementById('nocalificacion').value;
const aprre = document.getElementById('resultado').value;
const pruebas = document.getElementById('pruebas').value;
const Responsablemod = document.getElementById('responsable').value;
const fechaini = document.getElementById('fechainicio').value;
const fechater = document.getElementById('fechatermino').value;
const archivo = document.getElementById('anexo').files[0];
const token = localStorage.getItem('token');

const Alcance = [];
valcance.forEach(checkbox => {
  Alcance.push(checkbox.value);
})

// Crear objeto FormData
const formData = new FormData();
formData.append('nombredelsolicitante', nombredelsolicitante);
formData.append('folio', folio);
formData.append('area', area);
formData.append('fechadesoli', fechadesoli);
formData.append('fechadeefect', fechadeefect);
formData.append('razoncambio', razoncambio);
formData.append('Alcance', JSON.stringify(Alcance));
formData.append('epytit', epytit);
formData.append('cambiod', cambiod);
formData.append('cambioa', cambioa);
formData.append('capacitacion', capacitacion);
formData.append('capacitaciondesc', capacitaciondesc);
formData.append('evaluacion', evaluacion);
formData.append('evaluaciondes', evaluaciondesc);
formData.append('porqueno', porqueno);
formData.append('requericalif', requericalif);
formData.append('nocalif', nocalif);
formData.append('aprre', aprre);
formData.append('pruebas', pruebas);
formData.append('Responsablemod', Responsablemod);
formData.append('fechaini', fechaini);
formData.append('fechater', fechater);
formData.append('archivo', archivo);

fetch('http://localhost:4600/api/soli', {
  method: 'POST',
  headers: {
    'x-access-token': token
  },
  body: formData
})
.then(response => {
  if (response.ok) {
    // Inicio de sesión exitoso, redirecciona al usuario
    Swal.fire({
      title:'Solicitud enviada!',
      text:'Continuar!',
      icon:'success',
      timer: 2000,
      showConfirmButton: false, // ocultar el botón "OK"
    }).then(() => {
      // redirigir a una nueva página después de que se muestra la alerta
      //window.location.href ='/';
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error!',
      timer: 2000,
      showConfirmButton: false // ocultar el botón "OK" 
    });
  }
})
.catch(error => {
  console.error(error);
  // Manejo de errores de inicio de sesión
});
});






















