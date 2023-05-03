window.addEventListener('load', () => {
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
        folio.setAttribute('disabled', 'disabled');
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

        const procedformato = document.getElementById('procedformato');
        procedformato.setAttribute('disabled', 'disabled');

        const producto = document.getElementById('producto');
        producto.setAttribute('disabled', 'disabled');

        const matprima = document.getElementById('matprima');
        matprima.setAttribute('disabled', 'disabled');

        const especificaciones = document.getElementById('especificaciones');
        especificaciones.setAttribute('disabled', 'disabled');

        const proceso = document.getElementById('proceso');
        proceso.setAttribute('disabled', 'disabled');

        const metanalisis = document.getElementById('metanalisis');
        metanalisis.setAttribute('disabled', 'disabled')

        const equipos = document.getElementById('equipos');
        equipos.setAttribute('disabled', 'disabled');

        const siscomputo = document.getElementById('siscomputo');
        siscomputo.setAttribute('disabled', 'disabled');

        const instalaciones = document.getElementById('instalaciones');
        instalaciones.setAttribute('disabled', 'disabled');

        const alcance = data.Alcance;
        alcance.forEach(item => {
        switch (item) {
            case '1':
              procedformato.setAttribute('checked', 'checked');
              break;
            case '2':
              producto.setAttribute('checked', 'checked'); 
              break;
            case '3':
              matprima.setAttribute('checked', 'checked');
              break;
            case '4':
              especificaciones.setAttribute('checked', 'checked');
              break;
            case '5':
              proceso.setAttribute('checked', 'checked');
              break;
            case '6':
              metanalisis.setAttribute('checked', 'checked');
              break;
            case '7':
              equipos.setAttribute('checked', 'checked');
              break;
            case '8':
              siscomputo.setAttribute('ceckered', 'checked');
              break;
            case '9':
              instalaciones.setAttribute('checked', 'checked');
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
})