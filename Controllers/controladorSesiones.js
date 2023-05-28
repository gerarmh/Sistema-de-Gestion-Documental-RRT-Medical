window.addEventListener('load', () => {

    const rol = localStorage.getItem('rol');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token) {
        const navlinks = document.querySelector('.nav-links');

        const inicio = document.createElement('li');
        navlinks.appendChild(inicio);

        const hinicio = document.createElement('a');
        hinicio.setAttribute('href', '/');
        hinicio.textContent = "Inicio";
        inicio.appendChild(hinicio);

        const manual = document.createElement('li');
        navlinks.appendChild(manual);

        const hmanual = document.createElement('a');
        hmanual.setAttribute('href', '/manual');
        hmanual.textContent = "Manual";
        manual.appendChild(hmanual);

        const solicitudes = document.createElement('li');
        navlinks.appendChild(solicitudes);

        const hsolicitudes = document.createElement('a');
        hsolicitudes.setAttribute('href', '/solicitudes');
        hsolicitudes.textContent = "Solicitudes";
        solicitudes.appendChild(hsolicitudes);

        const sesion = document.createElement('li');
        navlinks.appendChild(sesion);

        const user = document.createElement('a');
        user.textContent = username;
        sesion.appendChild(user);

        const usesion = document.createElement('ul');
        usesion.setAttribute('class', 'Sub-menu');
        sesion.appendChild(usesion);


        // submenu

        const submenu = document.querySelector('.Sub-menu');
    
        const logout = document.createElement('li');
        submenu.appendChild(logout);

        const hlogout = document.createElement('a');
        hlogout.textContent = "Cerrar Sesión";
        logout.appendChild(hlogout);

        hlogout.addEventListener('click', () => {

            Swal.fire({
                title: '¿Estas seguro que quieres cerrar sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si'
              }).then((result) => {
                if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('id');
                localStorage.removeItem('rol');
                  Swal.fire({
                    title: 'Sesión cerrada!',
                    timer: 2000
                }).then(() => {
                  window.location.href ='/';
                })

                }
              })
                // Enviar una solicitud al servidor para invalidar el token
                //fetch('/api/logout', {
                //    method: 'POST',
                //    headers: {
                //      'Authorization': 'Bearer ' + token // Incluir el token en la cabecera de la solicitud
                //    }
                //  })
                //  .then(response => {
                //    if (!response.ok) {
                //      throw new Error('No se pudo cerrar sesión');
                //    }
                //    // Si la respuesta es exitosa, redirigir al usuario a la página de inicio de sesión
                //    window.location.href = '/login';
                //  })
                //  .catch(error => {
                //    console.error(error);
                //    // Mostrar un mensaje de error al usuario
                //    alert('No se pudo cerrar sesión');
                //  });

        });

        const solicitud = document.createElement('li');
        submenu.appendChild(solicitud);

        const hsolicitud = document.createElement('a');
        hsolicitud.setAttribute('href', '/solicitud');
        hsolicitud.textContent = "Solicitud";
        solicitud.appendChild(hsolicitud);

    if (rol === "Revisor") {
        const revisiones = document.createElement('li');
        manual.insertAdjacentElement('afterend', revisiones);
    
        const hrevisiones = document.createElement('a');
        hrevisiones.setAttribute('href', '/revisiones')
        hrevisiones.textContent = "Revisiones";
        revisiones.appendChild(hrevisiones);
    } else if (rol === "SuperUser") {
        const revisiones = document.createElement('li');
        manual.insertAdjacentElement('afterend', revisiones);
    
        const hrevisiones = document.createElement('a');
        hrevisiones.setAttribute('href', '/revisiones')
        hrevisiones.textContent = "Revisiones";
        revisiones.appendChild(hrevisiones);

        const submenu = document.querySelector('.Sub-menu');

        const liadministrar = document.createElement('li');
        submenu.appendChild(liadministrar);

        const hadministrar = document.createElement('a');
        hadministrar.setAttribute('href', '/administrar');
        hadministrar.textContent = "Administrar";
        liadministrar.appendChild(hadministrar);

        const liobsoletos = document.createElement('li');
        submenu.appendChild(liobsoletos);

        const hobsoletos = document.createElement('a');
        hobsoletos.setAttribute('href', '/obsoletos');
        hobsoletos.textContent = "Obsoletos";
        liobsoletos.appendChild(hobsoletos);

        const lirmanual = document.createElement('li');
        submenu.appendChild(lirmanual);

        const hrmanual = document.createElement('a');
        hrmanual.setAttribute('href', '/rmanual');
        hrmanual.textContent = "Registrar Procedimiento";
        lirmanual.appendChild(hrmanual);

        const liruser = document.createElement('li');
        submenu.appendChild(liruser);

        const hruser = document.createElement('a');
        hruser.setAttribute('href', '/registrar');
        hruser.textContent = "Registrar Usuario";
        liruser.appendChild(hruser);
        
    }
} else {
    const navlinks = document.querySelector('.nav-links');

    const sesion = document.createElement('li');
    navlinks.appendChild(sesion);

    const user = document.createElement('a');
    user.setAttribute('href', '/login');
    user.textContent = "Iniciar Sesión";
    sesion.appendChild(user);
}
})