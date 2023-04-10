const axios  = require("axios").default;

const API_URL = axios.create({
    baseURL : process.env.API_URL
});


const MESSAGES_UI = {
    completeField : 'Complete todos los campos',
    rowConfirmDelete : '¿Desea eliminar el registro?',
    errorGeneric : 'No se pudo iniciar sesion'
};

module.exports = {
    API_URL,
    MESSAGES_UI
}

