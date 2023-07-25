function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

window.addEventListener('load', async () => {
    const boton = document.querySelector('.boton-modal');
    boton.addEventListener('click', (e) => {
        e.preventDefault();

        let nombre = document.getElementById('nombre').value;
        let folio = document.getElementById('folio').value;
        let area = document.getElementById('area').value;
        let fechasoli = document.getElementById('fechasoli').value;
        let fechaefec = document.getElementById('fechaefec').value;
        let razon = document.getElementById('razon').value;
        let alcance = document.querySelectorAll('input[name="alcance"]:checked');
        //let espectitulo = document.getElementById('espectitulo').value;
        let cambiode = document.getElementById('cambiode').value;
        let cambioa = document.getElementById('cambioa').value;
        let capacitacion = document.querySelector('input[name="capacitacion"]:checked').value;
        let capacitaciondesc = document.getElementById('capacitaciondesc').value;
        let evaluacion = document.querySelector('input[name="evaluacion"]:checked').value;
        let evaluaciondesc = document.getElementById('evaluaciondesc').value;
        let porqueno = document.getElementById('porqueno').value;
        let reqcalificacion = document.querySelector('input[name="reqcalificacion"]:checked').value;
        let nocalificacion = document.getElementById('nocalificacion').value;
        let resultado = document.getElementById('resultado').value;
        let pruebas = document.getElementById('pruebas').value;
        let responsable = document.getElementById('responsable').value;
        let fechainicio = document.getElementById('fechainicio').value;
        let fechatermino = document.getElementById('fechatermino').value;


        generatePDF(nombre, folio, area, fechasoli, fechaefec, razon, alcance, cambiode, cambioa, capacitacion, capacitaciondesc, evaluacion, evaluaciondesc, porqueno, reqcalificacion, nocalificacion, resultado, pruebas, responsable, fechainicio, fechatermino);
    });
});

async function generatePDF(nombre, folio, area, fechasoli, fechaefec, razon, alcance, cambiode, cambioa, capacitacion, capacitaciondesc, evaluacion, evaluaciondesc, porqueno, reqcalificacion, nocalificacion, resultado, pruebas, responsable, fechainicio, fechatermino) {
    const image = await loadImage("../views/gen-pdf/formulario.png")
    const pdf = new jsPDF('p', 'pt', 'letter');
    pdf.addImage(image, 'PNG', 0, 0, 600, 756);

    pdf.setFontSize(9);
    pdf.text(nombre, 45, 85);
    pdf.text(folio, 520, 52);
    pdf.text(area, 300, 85);
    pdf.text(fechasoli, 415, 85);
    pdf.text(fechaefec, 500, 85);
    pdf.text(razon, 122, 117, {align:'left', lineHeightFactor: 1.5, maxWidth: 450});

    //pdf.text(espectitulo, 45, 220, {align:'justify', lineHeightFactor: 1.5, maxWidth: 510});
    pdf.text(cambiode, 42, 360, {align: 'justify', lineHeightFactor: 1.2, maxWidth: 230});
    pdf.text(cambioa, 280, 360, {align: 'justify', lineHeightFactor: 1.2, maxWidth: 275});
    pdf.text(capacitaciondesc, 162, 413, {align: 'left', lineHeightFactor: 1.2});
    pdf.text(evaluaciondesc, 162, 427, {align: 'left', lineHeightFactor: 1.2});
    pdf.text(porqueno, 122, 442, {align: 'justify', lineHeightFactor: 1.5, maxWidth: 230});
    pdf.text(nocalificacion, 510, 475, {align: 'justify', lineHeightFactor: 1.5});
    pdf.text(resultado, 42, 515, {align: 'justify', lineHeightFactor: 1.5, maxWidth: 510});
    pdf.text(pruebas, 280, 545, {align: 'justify', lineHeightFactor: 1.5});
    pdf.text(responsable, 45, 718);
    pdf.text(fechainicio, 415, 718);
    pdf.text(fechatermino, 500, 718);

    pdf.setFillColor(0,0,0);

    if (parseInt(capacitacion)===1) {
        pdf.circle(148, 415, 4, 'FD');
        } else {
        pdf.circle(389, 422, 4, 'FD');
        }

    if (parseInt(evaluacion)===1) {
        pdf.circle(148, 415, 4, 'FD');
        } else {
        pdf.circle(389, 422, 4, 'FD');
        }
    if (parseInt(reqcalificacion)===1) {
        pdf.circle(282.5, 478.5, 4, 'FD');
        } else {
        pdf.circle(349, 478.5, 4, 'FD');
        }
    
    alcance.forEach(checkbox => {
        const value = checkbox.value;
        switch (value) {
            case '1':
                pdf.circle(87, 161.5, 4, 'FD');
                break;
            case '2':
                pdf.circle(164.5, 161.5, 4, 'FD');
                break;
            case '3':
                pdf.circle(253.5, 161.5, 4, 'FD');
                break;
            case '4':
                pdf.circle(375.5, 161.5, 4, 'FD');
                break;
            case '5':
                pdf.circle(429, 161.5, 4, 'FD');
                break;
            case '6':
                pdf.circle(492, 161.5, 4, 'FD');
                break;
            case '7':
                pdf.circle(554, 161.5, 4, 'FD');
                break;
            case '8':
                pdf.circle(120, 173.5, 4, 'FD');
                break;
            case '9':
                pdf.circle(211.5, 173.5, 4, 'FD');
                break;
            case '10':
                pdf.circle(302, 173.5, 4, 'FD');
                break;
            case '11':
                pdf.circle(428, 173.5, 4, 'FD');
                break;
            case '12':
                pdf.circle(535, 173.5, 4, 'FD');
                break;
        }
    })
    
    pdf.save("example.pdf");

}