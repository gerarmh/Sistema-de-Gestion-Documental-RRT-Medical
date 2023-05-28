window.addEventListener('load', () => {

const rol = localStorage.getItem('rol');
const token = localStorage.getItem('token');
if (token) {
if (rol === "SuperUser") {

 fetch('http://localhost:4600/api/soli')
 .then(response => response.json())
 .then(data => {
 
   const tbody = document.getElementById('contenedor');
 
   data.forEach(dato => {
    if (dato.estado.length === 0) {
     const nombre = dato.nombredelsolicitante;
     const folio = dato.folio;
     const area = dato.area;
     const alcance = dato.Alcance;
     const id = dato._id;
     const estado = dato.estado;
     const aprobacion = dato.aprobacions;
     const archivo = dato.archivo;
     const concluido = dato.concluido;
 
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
 
     const LAlcance = document.createElement('td');
     LAlcance.setAttribute('data-label', 'Alcance');
     LAlcance.setAttribute('class', 'alcance');
     interior.appendChild(LAlcance);
     const listAlcance = document.createElement('ul');
     LAlcance.appendChild(listAlcance);
     alcance.forEach(item => {
       const itemlist = document.createElement('li');
       switch (item) {
         case '1':
           itemlist.textContent = "- Proced. y/o Formato";
           break;
         case '2':
           itemlist.textContent = "- Producto";
           break;
         case '3':
           itemlist.textContent = "- Materia prima/Fabricante";
           break;
         case '4':
           itemlist.textContent = "- Especificaciones";
           break;
         case '5':
           itemlist.textContent = "- Proceso";
           break;
         case '6':
           itemlist.textContent = "- Metodos de análisis";
           break;
         case '7':
           itemlist.textContent = "- Equipos";
           break;
         case '8':
           itemlist.textContent = "- Sistemas de cómputo";
           break;
         case '9':
           itemlist.textContent = "- Instalaciones";
           break;
       }
       listAlcance.appendChild(itemlist);
     })
 
     const Lfolio = document.createElement('td');
     Lfolio.setAttribute('data-label', 'Folio');
     Lfolio.textContent = folio;
     interior.appendChild(Lfolio);

     const solicitud = document.createElement('td');
     solicitud.setAttribute('data-label', 'Solicitud');
     interior.appendChild(solicitud);

     const refsolicitud = document.createElement('div');
     refsolicitud.setAttribute('class', 'boton-modal');
     solicitud.appendChild(refsolicitud);
   
     const lsolicitud = document.createElement('label');
     lsolicitud.setAttribute('for', 'btn-modal');
     lsolicitud.textContent = 'Ver';
     refsolicitud.appendChild(lsolicitud);

     lsolicitud.addEventListener ('click', () => {
      window.location.href = `/versoli?id=${id}`;
     })
  
     //estado
     const Lestado = document.createElement('td');
     Lestado.setAttribute('data-label', 'Estado');
     if (estado.length === 0) {
     Lestado.textContent = 'Aceptado';
     } else {
     Lestado.textContent = 'Pendiente';
     }
     interior.appendChild(Lestado);
 
     const Laplicados = document.createElement('td');
     Laplicados.setAttribute('data-label', 'Subir Archivos');
     interior.appendChild(Laplicados);
 
     // Modal

     const modal = document.createElement('div');
     modal.setAttribute('class', 'boton-modal');
     Laplicados.appendChild(modal);
     
     if ((archivo.length === 0) && (concluido === false)) {
 
     const lmodal = document.createElement('label');
     lmodal.setAttribute('for', 'btn-modal');
     lmodal.textContent = 'Subir';
     modal.appendChild(lmodal);
 
     modal.addEventListener('click', () => {
      window.location.href = `/archivo?id=${id}`;
     });
    }else if (concluido === true) {
      Laplicados.textContent = "Concluido";
    } else {
      const lmodal = document.createElement('label');
     lmodal.setAttribute('for', 'btn-modal');
     lmodal.textContent = 'Cambiar';
     modal.appendChild(lmodal);

     modal.addEventListener('click', () => {
      window.location.href = `/archivo?id=${id}`;
     });
    }

     //Enviar Cambios
     const Lenviar = document.createElement('td');
     Lenviar.setAttribute('data-label', 'Enviar Cambios');
     interior.appendChild(Lenviar);

     if ((aprobacion === true) && (concluido === false)) {
 

     const emodal = document.createElement('div');
     emodal.setAttribute('class', 'boton-modal');
     Lenviar.appendChild(emodal);
 
     const lemodal = document.createElement('label');
     lemodal.setAttribute('for', 'btn-modal');
     lemodal.textContent = 'Enviar';
     emodal.appendChild(lemodal);
 
     emodal.addEventListener('click', () => {
      window.location.href = `/enviar?id=${id}`;
     });
    } else if (concluido === true) {
      Lenviar.textContent = "Concluido";
    } else {
      Lenviar.textContent = "En espera";
    }

    
      }
       })
    })
    .catch(error => {
      // Manejar los errores de la solicitud
      console.error(error);
    });

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tiene permiso de acceder a esta interfaz!',
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