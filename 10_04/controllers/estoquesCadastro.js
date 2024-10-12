const EstoqueDAO = require('../dao/EstoqueDao');
const Estoque = require('../models/Estoque');

module.exports = app => {
    app.post('/estoques', (req, res) => {
        const content = req.body;
        if (content.nome == null || content.valor == null || content.quantidade == null) {
            return res.status(400).send('Os campos nome, valor e quantidade são obrigatórios');
        }
        if (typeof content.nome !== 'string' || content.nome === "") {
            return res.status(400).send('O campo nome não está em formato válido');
        }
        if (!Number.isFinite(content.valor) || content.valor <= 0) {
            return res.status(400).send('O campo valor não está em formato válido');
        }
        if (!Number.isInteger(content.quantidade) || content.quantidade < 0) {
            return res.status(400).send('O campo quantidade não está em formato válido');
        }
        const estoque = new Estoque(content.nome, content.valor, content.quantidade);
        EstoqueDAO.adicionar(estoque);
        return res.send('Estoque inserido com sucesso');
    });
}