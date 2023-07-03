window.addEventListener('load', () => {

const rol = localStorage.getItem('rol');
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
if (token) {
if ((rol === "Revisor") || (rol === "SuperUser")) {

 fetch('http://localhost:4600/api/soli')
 .then(response => response.json())
 .then(data => {
 
   const tbody = document.getElementById('contenedor');
 
   data.forEach(dato => {
     const nombre = dato.nombredelsolicitante;
     const folio = dato.folio;
     const area = dato.area;
     const id = dato._id;
     const estado = dato.estado;
     const token = localStorage.getItem('token');
     const userid = localStorage.getItem('id');
     const espectitulo = dato.epytit;
     const revisados = dato.revisados;
     const rechazaron = dato.rechazaron;
 
     const interior = document.createElement('tr');
     interior.setAttribute('class', 'tr-interior');
     tbody.appendChild(interior);
 
     const Lnombre = document.createElement('td');
     Lnombre.setAttribute('data-label', 'Solicitante');
     Lnombre.textContent = nombre;
     interior.appendChild(Lnombre);
 
     const Larea = document.createElement('td');
     Larea.setAttribute('data-label', 'Area');
     Larea.textContent = area;
     interior.appendChild(Larea)

     const procedimientos = document.createElement('td');
     procedimientos.setAttribute('data-label', 'Procedimientos'); 
     procedimientos.setAttribute('class', 'alcance');
     interior.appendChild(procedimientos)

     const listaproc = document.createElement('ul');
     procedimientos.appendChild(listaproc);

     
     espectitulo.forEach(procedimiento => {
      fetch(`http://localhost:4600/api/manual/${procedimiento}`)
    .then(response => response.json())
    .then(data => {
      const nombreproc = data.nombre;
      const proclist = document.createElement('li');
      proclist.textContent = `- ${nombreproc}`;
      listaproc.appendChild(proclist);
     })
    })

 
    // const LAlcance = document.createElement('td');
    // LAlcance.setAttribute('data-label', 'Alcance');
    // LAlcance.setAttribute('class', 'alcance');
    // interior.appendChild(LAlcance);
    // const listAlcance = document.createElement('ul');
    // LAlcance.appendChild(listAlcance);
    // alcance.forEach(item => {
    //   const itemlist = document.createElement('li');
    //   switch (item) {
    //     case '1':
    //       itemlist.textContent = "- Proced. y/o Formato";
    //       break;
    //     case '2':
    //       itemlist.textContent = "- Producto";
    //       break;
    //     case '3':
    //       itemlist.textContent = "- Materia prima/Fabricante";
    //       break;
    //     case '4':
    //       itemlist.textContent = "- Especificaciones";
    //       break;
    //     case '5':
    //       itemlist.textContent = "- Proceso";
    //       break;
    //     case '6':
    //       itemlist.textContent = "- Metodos de análisis";
    //       break;
    //     case '7':
    //       itemlist.textContent = "- Equipos";
    //       break;
    //     case '8':
    //       itemlist.textContent = "- Sistemas de cómputo";
    //       break;
    //     case '9':
    //       itemlist.textContent = "- Instalaciones";
    //       break;
    //   }
    //   listAlcance.appendChild(itemlist);
    // })
 
     const Lfolio = document.createElement('td');
     Lfolio.setAttribute('data-label', 'Folio');
     Lfolio.textContent = folio;
     interior.appendChild(Lfolio);
     const anexos = document.createElement('td');
     anexos.setAttribute('data-label', 'Anexos');
     interior.appendChild(anexos);
     // Anexos
     if (dato.anexo) {
       const archivoBuffer = new Uint8Array(dato.anexo.data);
       const archivoBlob = new Blob([archivoBuffer], { type: 'application/pdf' });
       const fileReader = new FileReader();
       
       fileReader.readAsDataURL(archivoBlob);
     
       fileReader.onloadend = () => {
       const dataUrl = fileReader.result;
       const refanexos = document.createElement('div');
       refanexos.setAttribute('class', 'boton-modal');
       anexos.appendChild(refanexos);
   
       const lanexos = document.createElement('label');
       lanexos.setAttribute('for', 'btn-modal');
       lanexos.textContent = 'Ver';
       refanexos.appendChild(lanexos);
   
       refanexos.addEventListener('click', () => {
         const newWindow = window.open();
         const iframe = document.createElement('iframe');
         iframe.setAttribute('src', `${dataUrl}#toolbar=0`);
         iframe.style.width = '100%';
         iframe.style.height = '100%';
         newWindow.document.body.appendChild(iframe);
       });
     }
      } else { 
        anexos.textContent = "No hay anexos";
      }

      //aprobar
       
       const Lsolicitudes = document.createElement('td');
       Lsolicitudes.setAttribute('data-label', 'Aprobar/Rechazar');
       interior.appendChild(Lsolicitudes);

      if (estado.includes(userid)){
        if (!rechazaron.includes(username)) {
        const aprobar = document.createElement('div');
        aprobar.setAttribute('class', 'boton-modal');
        Lsolicitudes.appendChild(aprobar);
    
        const laprobar = document.createElement('label');
        laprobar.setAttribute('for', 'btn-modal');
        laprobar.textContent = 'Aprobar';
        aprobar.appendChild(laprobar);
        aprobar.addEventListener('click', () => {
          fetch(`http://localhost:4600/api/soli/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify({userid, username})
          })
          .then(response => {
            if (response.ok) {
              Swal.fire({
                title:'Has aceptado la solicitud!',
                text:'Continuar!',
                icon:'success',
                timer: 2000, // tiempo en milisegundos (3 segundos)
                showConfirmButton: false, // ocultar el botón "OK"
              })
              Lsolicitudes.textContent = "Aprobado";
            }
          })
          .catch(error => console.error(error));
        });

        const br = document.createElement('br');
        Lsolicitudes.appendChild(br)

        const rechazar = document.createElement('div');
        rechazar.setAttribute('class', 'boton-modal');
        Lsolicitudes.appendChild(rechazar);

        const lrechazar = document.createElement('label');
        lrechazar.setAttribute('for', 'btn-modal');
        lrechazar.textContent = 'Rechazar';
        rechazar.appendChild(lrechazar);
        rechazar.addEventListener('click', () => {
        fetch(`http://localhost:4600/api/soli/${id}/${folio}/${rol}/${username}/${userid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify({userid, username})
          })
          .then(response => {
            if (response.ok) {
              Swal.fire({
                title:'Has rechazado la solicitud!',
                text:'Continuar!',
                icon:'success',
                timer: 2000, // tiempo en milisegundos (3 segundos)
                showConfirmButton: false, // ocultar el botón "OK"
              })
              Lsolicitudes.textContent = "Rechazado";
            }
          })
          .catch(error => console.error(error));
        });
      } else {
        Lsolicitudes.textContent = "Rechazado";
      }
      } else {
        Lsolicitudes.textContent = "Aprobado";
      }

      // autorizaron
      const autorizaron = document.createElement('td');
      autorizaron.setAttribute('data-label', 'Autorizaron');
      autorizaron.setAttribute('class', 'alcance');
      interior.appendChild(autorizaron);

      if (revisados.length === 0) {

        autorizaron.textContent = "No revisado";

      } else {

      const listautorizaron= document.createElement('ul');
     autorizaron.appendChild(listautorizaron);

      revisados.forEach(autorizados => {
        const autolist = document.createElement('li');
        autolist.textContent = `- ${autorizados}`;
        listautorizaron.appendChild(autolist);
      })

    }

    const rechazado = document.createElement('td');
    rechazado.setAttribute('data-label', 'Rechazaron');
    rechazado.setAttribute('class', 'alcance');
    interior.appendChild(rechazado);

      if (rechazaron.length === 0) {

        rechazado.textContent = "No revisado";
      } else {
        
        const listrechazaron = document.createElement('ul');
        rechazado.appendChild(listrechazaron);

        rechazaron.forEach(autorizados => {
        const rechlist = document.createElement('li');
        rechlist.textContent = `- ${autorizados}`;
        listrechazaron.appendChild(rechlist);
      })

      }

       //estado
       const Lestado = document.createElement('td');
       Lestado.setAttribute('data-label', 'Estado');
       if (estado.length === 0) {
       Lestado.textContent = 'Aceptado';
       } else if (rechazaron.length > 0) {
       Lestado.textContent = 'Rechazado';
       } else {
        Lestado.textContent = 'Pendiente';
       }
       interior.appendChild(Lestado);
   
       const Laplicados = document.createElement('td');
       Laplicados.setAttribute('data-label', 'Solicitud');
       interior.appendChild(Laplicados);
   
       // Modal
   
       const modal = document.createElement('div');
       modal.setAttribute('class', 'boton-modal');
       Laplicados.appendChild(modal);
   
       const lmodal = document.createElement('label');
       lmodal.setAttribute('for', 'btn-modal');
       lmodal.textContent = 'Ver';
       modal.appendChild(lmodal);
   
       modal.addEventListener('click', () => {
        window.location.href = `/versoli?id=${id}`;
       });
       })
       
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