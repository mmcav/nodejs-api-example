const VendaDAO = require('../dao/VendaDao');
const Venda = require('../models/Venda');

module.exports = app => {
    app.post('/vendas', (req, res) => {
        const content = req.body;
        if (content.id_cliente == null || content.id_estoque == null || content.valor_total == null || content.quantidade == null) {
            return res.status(400).send('Os campos id_cliente, id_estoque, valor total e quantidade são obrigatórios');
        }
        if (!Number.isInteger(content.id_cliente) || content.id_cliente <= 0) {
            return res.status(400).send('O campo id_cliente não está em formato válido');
        }
        if (!Number.isInteger(content.id_estoque) || content.id_estoque <= 0) {
            return res.status(400).send('O campo id_estoque não está em formato válido');
        }
        if (!Number.isFinite(content.valor_total) || content.valor_total <= 0) {
            return res.status(400).send('O campo valor total não está em formato válido');
        }
        if (!Number.isInteger(content.quantidade) || content.quantidade <= 0) {
            return res.status(400).send('O campo quantidade não está em formato válido');
        }
        const venda = new Venda(content.id_cliente, content.id_estoque, content.valor_total, content.quantidade);
        VendaDAO.adicionar(venda);
        return res.send('Venda inserida com sucesso');
    });
}