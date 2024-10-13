const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());

const consign = require('consign');
consign().include('controllers').into(app);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.get('/', (req, res) => res.send('Servidor rodando, tudo OK!'));