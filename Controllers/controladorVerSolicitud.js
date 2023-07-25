window.addEventListener('load', () => {

  const rol = localStorage.getItem('rol');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const userid = localStorage.getItem('id');

  if (token) {

  if ((rol === "Revisor") || (rol === "SuperUser")) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    fetch(`http://localhost:4600/api/soli/${id}`)
    .then(response => response.json())
    .then(data => {

        const nombre = document.getElementById('nombre');
        nombre.setAttribute('disabled', 'disabled');
        nombre.value = data.nombredelsolicitante;
        
        const folio = document.getElementById('folio');
        folio.value = data.folio;

        const area = document.getElementById('area');
        area.setAttribute('disabled', 'disabled');
        area.value = data.area;

        const fechasoli = document.getElementById('fechasoli');
        fechasoli.setAttribute('disabled', 'disabled');
        fechasoli.value = data.fechadesoli;

        const fechaefec = document.getElementById('fechaefec');
        fechaefec.setAttribute('disabled', 'disabled');
        fechaefec.value = data.fechadeefect;

        const razon = document.getElementById('razon');
        razon.setAttribute('disabled', 'disabled');
        razon.value = data.razoncambio;

        const procesos = document.getElementById('procesos');
        procesos.setAttribute('disabled', 'disabled');

        const proveedores = document.getElementById('proveedores');
        proveedores.setAttribute('disabled', 'disabled');

        const siscriticos = document.getElementById('siscriticos');
        siscriticos.setAttribute('disabled', 'disabled');

        const siscomputacionales = document.getElementById('siscomputacionales');
        siscomputacionales.setAttribute('disabled', 'disabled');

        const areas = document.getElementById('areas');
        areas.setAttribute('disabled', 'disabled');

        const servicios = document.getElementById('servicios');
        servicios.setAttribute('disabled', 'disabled')

        const equipos = document.getElementById('equipos');
        equipos.setAttribute('disabled', 'disabled');

        const metanaliticos = document.getElementById('metanaliticos');
        metanaliticos.setAttribute('disabled', 'disabled');

        const especificaciones = document.getElementById('especificaciones');
        especificaciones.setAttribute('disabled', 'disabled');

        const documentacion = document.getElementById('documentacion');
        documentacion.setAttribute('disabled', 'disabled');

        const dispregulatorias = document.getElementById('dispregulatorias');
        dispregulatorias.setAttribute('disabled', 'disabled');

        const calidproduct = document.getElementById('calidproduct');
        calidproduct.setAttribute('disabled', 'disabled');

        const alcance = data.Alcance;
        alcance.forEach(item => {
        switch (item) {
            case '1':
              procesos.setAttribute('checked', 'checked');
              break;
            case '2':
              proveedores.setAttribute('checked', 'checked'); 
              break;
            case '3':
              siscriticos.setAttribute('checked', 'checked');
              break;
            case '4':
              siscomputacionales.setAttribute('checked', 'checked');
              break;
            case '5':
              areas.setAttribute('checked', 'checked');
              break;
            case '6':
              servicios.setAttribute('checked', 'checked');
              break;
            case '7':
              equipos.setAttribute('checked', 'checked');
              break;
            case '8':
              metanaliticos.setAttribute('checked', 'checked');
              break;
            case '9':
              especificaciones.setAttribute('checked', 'checked');
              break;
            case '10':
              documentacion.setAttribute('checked', 'checked');
              break;
            case '11':
              dispregulatorias.setAttribute('checked', 'checked');
              break;
            case '12':
              calidproduct.setAttribute('checked', 'checked');
              break;
          }

        })

        const cambiode = document.getElementById('cambiode');
        cambiode.setAttribute('disabled', 'disabled');
        cambiode.value = data.cambiod;

        const cambioa = document.getElementById('cambioa');
        cambioa.setAttribute('disabled', 'disabled');
        cambioa.value = data.cambioa;

        const capacitacionsi = document.getElementById('capacitacionsi');
        capacitacionsi.setAttribute('disabled', 'disabled');

        const capacitacionno = document.getElementById('capacitacionno');
        capacitacionno.setAttribute('disabled', 'disabled');

        const capacitacion = data.capacitacion;
        if (capacitacion === 1) {
            capacitacionsi.setAttribute('checked', 'checked');
        } else {
            capacitacionno.setAttribute('checked', 'checked');
        }

        const capacitaciondesc = document.getElementById('capacitaciondesc');
        capacitaciondesc.setAttribute('disabled', 'disabled');
        capacitaciondesc.value = data.capacitaciondesc

        const evaluacionsi = document.getElementById('evaluacionsi');
        evaluacionsi.setAttribute('disabled', 'disabled');

        const evaluacionno = document.getElementById('evaluacionno');
        evaluacionno.setAttribute('disabled', 'disabled');
        
        const evaluacion = data.evaluacion;
        if (evaluacion === 1) {
            evaluacionsi.setAttribute('checked', 'checked');
        } else {
            evaluacionno.setAttribute('checked', 'checked');
        }

        const evaluaciondesc = document.getElementById('evaluaciondesc');
        evaluaciondesc.setAttribute('disabled', 'disabled');
        evaluaciondesc.value = data.evaluaciondesc;

        const porqueno = document.getElementById('porqueno');
        porqueno.setAttribute('disabled', 'disabled');
        porqueno.value = data.porqueno;

        const reqsi = document.getElementById('reqsi');
        reqsi.setAttribute('disabled', 'disabled');

        const reqno = document.getElementById('reqno');
        reqno.setAttribute('disabled', 'disabled');

        const reqcalif = data.requericalif;
        if ( reqcalif === 1 ) {
            reqsi.setAttribute('checked', 'checked');
        } else {
             reqno.setAttribute('checked', 'checked');
        }

        const nocalif = document.getElementById('nocalificacion');
        nocalif.setAttribute('disabled', 'disabled');
        nocalif.value = data.nocalif;

        const resultado = document.getElementById('resultado');
        resultado.setAttribute('disabled', 'disabled');
        resultado.value = data.aprre;

        const pruebas = document.getElementById('pruebas');
        pruebas.setAttribute('disabled', 'disabled');
        pruebas.value = data.pruebas;

        responsable = document.getElementById('responsable');
        responsable.setAttribute('disabled', 'disabled');
        responsable.value = data.Responsablemod;

        const fechainicio = document.getElementById('fechainicio');
        fechainicio.setAttribute('disabled', 'disabled');
        fechainicio.value = data.fechaini;

        const fechatermino = document.getElementById('fechatermino');
        fechatermino.setAttribute('disabled', 'disabled');
        fechatermino.value = data.fechater;

    })

    const form = document.getElementById('form');

    if (rol === "SuperUser") {
     const divcontain = document.createElement('div');
     divcontain.setAttribute('class', "row mb-3");
     form.insertAdjacentElement('beforeend', divcontain);

     const divinterior1 = document.createElement('div');
     divinterior1.setAttribute('class', 'col-mb-6')
     divcontain.appendChild(divinterior1);
      
     const emodal = document.createElement('div');
     emodal.setAttribute('class', 'boton-modal');
     divinterior1.appendChild(emodal);
 
     const lemodal = document.createElement('label');
     lemodal.setAttribute('for', 'btn-modal');
     lemodal.textContent = 'Generar PDF';
     emodal.appendChild(lemodal);

     const divinterior2 = document.createElement('div');
     divinterior2.setAttribute('class', 'col-mb-6')
     divcontain.appendChild(divinterior2);

     const update = document.createElement('input') ;
     update.setAttribute('type', 'submit');
     update.setAttribute('value', 'Actualizar');
     update.setAttribute('class', 'boton');
     divinterior2.appendChild(update);
      
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const folio = document.getElementById('folio').value;
      const area = document.getElementById('area').value;

      fetch(`http://localhost:4600/api/soli/${id}/${folio}/${rol}/${username}/${userid}/${area}/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({ folio })
      })
      .then(response => {
        if (response.ok) {
          // Inicio de sesión exitoso, redirecciona al usuario
          Swal.fire({
            title:'Folio Actualizado!',
            text:'Continuar!',
            icon:'success',
            timer: 2000,
            showConfirmButton: false, // ocultar el botón "OK"
          }).then(() => {
            // redirigir a una nueva página después de que se muestra la alerta
            window.location.href ='/administrar';
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

    })

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