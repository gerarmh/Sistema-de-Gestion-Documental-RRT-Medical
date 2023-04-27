window.addEventListener('load', () => {

  fetch('http://localhost:4600/api/manual')
  .then(response => response.json())
  .then(data => {
    if (data.vigencia === "obsoleto") {


    //nombre
    const username = localStorage.getItem('username');
    const form = document.getElementById('form');
    const divnombre = document.getElementById('divnombre');
    const divEnd = document.getElementById('alcance');

    const lnombre = document.createElement('label');
    lnombre.setAttribute('for', 'nombre');
    lnombre.setAttribute('class', 'form-label');
    lnombre.textContent = "Nombre del Solicitante:";
    divnombre.appendChild(lnombre);

    const hr = document.createElement('hr');
    divnombre.appendChild(hr);

    const inombre = document.createElement('input');
    inombre.setAttribute('type', 'text');
    inombre.setAttribute('class', 'form-control');
    inombre.value = username;
    inombre.setAttribute('readOnly', 'true');
    inombre.id = "nombre";
    inombre.maxLength = "35";
    divnombre.appendChild(inombre);

    //espectitulo

    const divContenedor = document.createElement('div');
    divContenedor.setAttribute('class', 'row mb-3');
    form.appendChild(divContenedor);
    divEnd.insertAdjacentElement('afterend', divContenedor);

    const divContent = document.createElement('div');
    divContent.setAttribute('class', 'col-md-12');
    divContenedor.appendChild(divContent);

    const divInterior = document.createElement('div');
    divContent.appendChild(divInterior);

    const lespectitulo = document.createElement('label');
    lespectitulo.setAttribute('for', 'espectitulo');
    lespectitulo.setAttribute('class', 'form-label');
    lespectitulo.textContent = 'Especificacion y titulo:'
    divInterior.appendChild(lespectitulo);

    const br = document.createElement('br');
    divInterior.appendChild(br);

    //select

    const sprocedimiento1 = document.createElement('select');
    sprocedimiento1.setAttribute('id', 'espectitulo1');
    divInterior.appendChild(sprocedimiento1);

    const mensaje1 = document.createElement('option');
    mensaje1.textContent = "Seleccionar...";
    mensaje1.value = "";
    sprocedimiento1.add(mensaje1);

    data.forEach(dato => {

      const id = dato._id;
      const nombre = dato.nombre;
      const folio = dato.folio;

    const optionelement1 = document.createElement('option');
    optionelement1.textContent = nombre;
    optionelement1.value = id;
    sprocedimiento1.add(optionelement1);
    
   })

   const sprocedimiento2 = document.createElement('select');
    sprocedimiento2.setAttribute('id', 'espectitulo2');
    divInterior.appendChild(sprocedimiento2);

    const mensaje2 = document.createElement('option');
    mensaje2.textContent = "Seleccionar...";
    mensaje2.value = "";
    sprocedimiento2.add(mensaje2);

    data.forEach(dato => {

      const id = dato._id;
      const nombre = dato.nombre;
      const folio = dato.folio;

    const optionelement2 = document.createElement('option');
    optionelement2.textContent = nombre;
    optionelement2.value = id;
    sprocedimiento2.add(optionelement2);
    
   })

   const sprocedimiento3 = document.createElement('select');
    sprocedimiento3.setAttribute('id', 'espectitulo3');
    divInterior.appendChild(sprocedimiento3);

    const mensaje3 = document.createElement('option');
    mensaje3.textContent = "Seleccionar...";
    mensaje3.value = "";
    sprocedimiento3.add(mensaje3);

    data.forEach(dato => {

      const id = dato._id;
      const nombre = dato.nombre;
      const folio = dato.folio;

    const optionelement3 = document.createElement('option');
    optionelement3.textContent = nombre;
    optionelement3.value = id;
    sprocedimiento3.add(optionelement3);
    
   })

   const sprocedimiento4 = document.createElement('select');
    sprocedimiento4.setAttribute('id', 'espectitulo4');
    divInterior.appendChild(sprocedimiento4);

    const mensaje4 = document.createElement('option');
    mensaje4.textContent = "Seleccionar...";
    mensaje4.value = "";
    sprocedimiento4.add(mensaje4);

    data.forEach(dato => {

      const id = dato._id;
      const nombre = dato.nombre;
      const folio = dato.folio;

    const optionelement4 = document.createElement('option');
    optionelement4.textContent = nombre;
    optionelement4.value = id;
    sprocedimiento4.add(optionelement4);
    
   })

   const divContent2 = document.createElement('div');
    divContent2.setAttribute('class', 'col-md-12');
    divContenedor.appendChild(divContent2);

    const divInterior2 = document.createElement('div');
    divContent2.appendChild(divInterior2);

    const sprocedimiento5 = document.createElement('select');
    sprocedimiento5.setAttribute('id', 'espectitulo5');
    divInterior2.appendChild(sprocedimiento5);

    const mensaje5 = document.createElement('option');
    mensaje5.textContent = "Seleccionar...";
    mensaje5.value = "";
    sprocedimiento5.add(mensaje5);

    data.forEach(dato => {

      const id = dato._id;
      const nombre = dato.nombre;
      const folio = dato.folio;

    const optionelement5 = document.createElement('option');
    optionelement5.textContent = nombre;
    optionelement5.value = id;
    sprocedimiento5.add(optionelement5);
    
   })

   const sprocedimiento6 = document.createElement('select');
    sprocedimiento6.setAttribute('id', 'espectitulo6');
    divInterior2.appendChild(sprocedimiento6);

    const mensaje6 = document.createElement('option');
    mensaje6.textContent = "Seleccionar...";
    mensaje6.value = "";
    sprocedimiento6.add(mensaje6);

    data.forEach(dato => {

      const id = dato._id;
      const nombre = dato.nombre;
      const folio = dato.folio;

    const optionelement6 = document.createElement('option');
    optionelement6.textContent = nombre;
    optionelement6.value = id;
    sprocedimiento6.add(optionelement6);
    
   })

   const sprocedimiento7 = document.createElement('select');
    sprocedimiento7.setAttribute('id', 'espectitulo7');
    divInterior2.appendChild(sprocedimiento7);

    const mensaje7 = document.createElement('option');
    mensaje7.textContent = "Seleccionar...";
    mensaje7.value = "";
    sprocedimiento7.add(mensaje7);

    data.forEach(dato => {

      const id = dato._id;
      const nombre = dato.nombre;
      const folio = dato.folio;

    const optionelement7 = document.createElement('option');
    optionelement7.textContent = nombre;
    optionelement7.value = id;
    sprocedimiento7.add(optionelement7);
    
   })
   
   const sprocedimiento8 = document.createElement('select');
    sprocedimiento8.setAttribute('id', 'espectitulo8');
    divInterior2.appendChild(sprocedimiento8);

    const mensaje8 = document.createElement('option');
    mensaje8.textContent = "Seleccionar...";
    mensaje8.value = "";
    sprocedimiento8.add(mensaje8);

    data.forEach(dato => {

      const id = dato._id;
      const nombre = dato.nombre;
      const folio = dato.folio;

    const optionelement8 = document.createElement('option');
    optionelement8.textContent = nombre;
    optionelement8.value = id;
    sprocedimiento8.add(optionelement8);
    
   })
  }

  })
});

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

const espectitulo1 = document.getElementById('espectitulo1').value;
const espectitulo2 = document.getElementById('espectitulo2').value;
const espectitulo3 = document.getElementById('espectitulo3').value;
const espectitulo4 = document.getElementById('espectitulo4').value;
const espectitulo5 = document.getElementById('espectitulo5').value;
const espectitulo6 = document.getElementById('espectitulo6').value;
const espectitulo7 = document.getElementById('espectitulo7').value;
const espectitulo8 = document.getElementById('espectitulo8').value;

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
const userid = localStorage.getItem('id');

const espectitulo = [];
if ((espectitulo1 !== "") && (espectitulo1 !== espectitulo2) && (espectitulo1 !== espectitulo3) && (espectitulo1 !== espectitulo4) && (espectitulo1 !== espectitulo5) && (espectitulo1 !== espectitulo6) && (espectitulo1 !== espectitulo7) && (espectitulo1 !== espectitulo8)){
  espectitulo.push(espectitulo1);
}
if ((espectitulo2 !== "") && (espectitulo2 !== espectitulo1) && (espectitulo2 !== espectitulo3) && (espectitulo2 !== espectitulo4) && (espectitulo2 !== espectitulo5) && (espectitulo2 !== espectitulo6) && (espectitulo2 !== espectitulo7) && (espectitulo2 !== espectitulo8)) {
  espectitulo.push(espectitulo2);
}
if ((espectitulo3 !== "") && (espectitulo3 !== espectitulo1) && (espectitulo3 !== espectitulo2) && (espectitulo3 !== espectitulo4) && (espectitulo3 !== espectitulo5) && (espectitulo3 !== espectitulo6) && (espectitulo3 !== espectitulo7) && (espectitulo3 !== espectitulo8)) {
  espectitulo.push(espectitulo3);
}
if ((espectitulo4 !== "") && (espectitulo4 !== espectitulo1) && (espectitulo4 !== espectitulo2) && (espectitulo4 !== espectitulo3) && (espectitulo4 !== espectitulo5) && (espectitulo4 !== espectitulo6) && (espectitulo4 !== espectitulo7) && (espectitulo4 !== espectitulo8)) {
  espectitulo.push(espectitulo4);
}
if ((espectitulo5 !== "") && (espectitulo5 !== espectitulo1) && (espectitulo5 !== espectitulo2) && (espectitulo5 !== espectitulo3) && (espectitulo5 !== espectitulo4) && (espectitulo5 !== espectitulo6) && (espectitulo5 !== espectitulo7) && (espectitulo5 !== espectitulo8)) {
  espectitulo.push(espectitulo5);
}
if ((espectitulo6 !== "") && (espectitulo6 !== espectitulo1) && (espectitulo6 !== espectitulo2) && (espectitulo6 !== espectitulo3) && (espectitulo6 !== espectitulo4) && (espectitulo6 !== espectitulo5) && (espectitulo6 !== espectitulo7) && (espectitulo6 !== espectitulo8)) {
  espectitulo.push(espectitulo6);
}
if ((espectitulo7 !== "") && (espectitulo7 !== espectitulo1) && (espectitulo7 !== espectitulo2) && (espectitulo7 !== espectitulo3) && (espectitulo7 !== espectitulo4) && (espectitulo7 !== espectitulo5) && (espectitulo7 !== espectitulo6) && (espectitulo7 !== espectitulo8)) {
  espectitulo.push(espectitulo7);
}
if ((espectitulo8 !== "") && (espectitulo8 !== espectitulo1) && (espectitulo8 !== espectitulo2) && (espectitulo8 !== espectitulo3) && (espectitulo8 !== espectitulo4) && (espectitulo8 !== espectitulo5) && (espectitulo8 !== espectitulo6) && (espectitulo8 !== espectitulo7)) {
  espectitulo.push(espectitulo8);
}

const Alcance = [];
valcance.forEach(checkbox => {
  Alcance.push(checkbox.value);
})

// Crear objeto FormData
const formData = new FormData();
formData.append('nombredelsolicitante', nombredelsolicitante);
formData.append('userid', userid);
formData.append('folio', folio);
formData.append('area', area);
formData.append('fechadesoli', fechadesoli);
formData.append('fechadeefect', fechadeefect);
formData.append('razoncambio', razoncambio);
formData.append('Alcance', JSON.stringify(Alcance));
formData.append('epytit', JSON.stringify(espectitulo));
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
      window.location.href ='/';
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






















