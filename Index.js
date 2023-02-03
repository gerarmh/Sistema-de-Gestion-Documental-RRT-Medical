const express = require('express');
const port = 4000;
const app = express();

app.use('/static', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Se indica el directorio donde se almacenarán las plantillas 
app.set('Views', './Views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');

app.get('/hello', (req, res) => {
  res.render('index.pug', { mensaje: 'Usando Pug JS en Express' });
});

app.get('/urlparam', (req, res) => {
  res.send(req.query);
});

app.post('/urljson', (req, res) => {
  res.send(req.body);
});

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));