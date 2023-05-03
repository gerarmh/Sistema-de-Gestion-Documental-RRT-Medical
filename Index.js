const express = require('express');
const port = 3000;
const dotenv = require('dotenv');

const router = require("./router/router");   
const publicpath = __dirname.replace("app", "views")

require('dotenv').config()

const app = express();
app.use(express.static(publicpath))
app.use(express.urlencoded({
  extended: true
}))
// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', './views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index.pug');
});
app.get('/manual', (req, res) => {
  res.render('manual.pug');
});
app.get('/obsoletos', (req, res) => {
  res.render('obsoletos.pug');
});
app.get('/login', (req, res) => {
  res.render('login.pug');
});
app.get('/administrar', (req, res) => {
  res.render('administrar.pug');
});
app.get('/revisiones', (req, res) => {
  res.render('revisiones.pug');
});
app.get('/solicitudes', (req, res) => {
  res.render('solicitudes.pug');
});
app.get('/login', (req, res) => {
  res.render('login.pug');
});
app.get('/solicitud', (req, res) => {
  res.render('solicitud.pug');
});
app.get('/registrar', (req, res) => {
  res.render('registrar.pug');
});
app.get('/rmanual', (req, res) => {
  res.render('rmanual.pug');
});
app.get('/archivo', (req, res) => {
  res.render('rarchivo.pug');
});
app.get('/cambios', (req, res) => {
  res.render('vercambios.pug');
});
app.get('/enviar', (req, res) => {
  res.render('enviarcambios.pug');
});
app.get('/versoli', (req, res) => {
  res.render('versolicitud.pug');
});

app.listen(port, () => console.log(`Server listen on ${port}`));
console.log('RRT FRONT IS ON LINE')