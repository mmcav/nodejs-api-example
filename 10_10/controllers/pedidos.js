const PedidoDAO = require('../dao/PedidoDao');

module.exports = app => {
    app.post('/pedidos', (req, res) => {
        const {id_cliente, id_produto, data_pedido, quantidade, valor_total} = req.body;
        if (id_cliente == null || id_produto == null || data_pedido == null || quantidade == null || valor_total == null) {
            return res.status(400).json({message: 'Cliente, produto, data do pedido, quantidade e valor total são obrigatórios'});
        }

        if (!Number.isInteger(id_cliente) || id_cliente <= 0) {
            return res.status(400).json({message: 'Entrada cliente em formato inválido'});
        }

        if (!Number.isInteger(id_produto) || id_produto <= 0) {
            return res.status(400).json({message: 'Entrada produto em formato inválido'});
        }

        if (typeof data_pedido !== 'string' || isNaN(Date.parse(data_pedido))) {
            return res.status(400).json({message: 'Entrada data em formato inválido'});
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return res.status(400).json({message: 'Entrada quantidade em formato inválido'});
        }

        if (!Number.isFinite(valor_total) || valor_total <= 0) {
            return res.status(400).json({message: 'Entrada valor total em formato inválido'});
        }

        const pedido = [id_cliente, id_produto, data_pedido, quantidade, valor_total];
        PedidoDAO.adicionar(pedido, (err, resdb) => {
            res.header('Access-Control-Allow-Origin', '*');
            if (err) {
                console.error('Erro ao inserir os dados', err);
                return res.status(500).json({message: 'Erro ao inserir os dados'});
            }
            return res.status(201).json({message: 'Pedido inserido com sucesso', orderId: resdb.insertId});
        });
    });
}