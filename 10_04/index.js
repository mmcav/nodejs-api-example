const express = require('express');
const port = 3000;
const consign = require('consign');
const Tabelas = require('./config/Tabelas');

Tabelas.init();
Tabelas.seed();

const app = express();
app.use(express.json());
consign().include('controllers').into(app);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.get('/', (req, res) => res.send('Servidor rodando, tudo OK!'));