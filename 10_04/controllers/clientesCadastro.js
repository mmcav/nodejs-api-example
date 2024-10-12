const ClienteDAO = require('../dao/ClienteDao');
const Cliente = require('../models/Cliente');

module.exports = app => {
    app.post('/clientes', (req, res) => {
        const content = req.body;
        if (content.nome == null || content.email == null || content.senha == null) {
            return res.status(400).send('Os campos nome, email e senha são obrigatórios');
        }
        if (typeof content.nome !== 'string' || content.nome === "") {
            return res.status(400).send('O campo nome não está em formato válido');
        }
        if (typeof content.email !== 'string' || content.email === "") {
            return res.status(400).send('O campo email não está em formato válido');
        }
        if (typeof content.senha !== 'string' || content.senha === "") {
            return res.status(400).send('O campo senha não está em formato válido');
        }
        const cliente = new Cliente(content.nome, content.email, content.senha);
        ClienteDAO.adicionar(cliente);
        return res.send('Cliente inserido com sucesso');
    });
}