const ProdutoDAO = require('../dao/ProdutoDao');

module.exports = app => {
    app.post('/produtos', (req, res) => {
        const {nome_produto, preco, estoque} = req.body;
        if (nome_produto == null || preco == null || estoque == null) {
            return res.status(400).json({message: 'Nome do produto, preço e estoque são obrigatórios'});
        }

        if (typeof nome_produto !== 'string' || nome_produto === "") {
            return res.status(400).json({message: 'Entrada nome do produto em formato inválido'});
        }

        if (!Number.isFinite(preco) || preco <= 0) {
            return res.status(400).json({message: 'Entrada preço em formato inválido'});
        }

        if (!Number.isInteger(estoque) || estoque < 0) {
            return res.status(400).json({message: 'Entrada estoque em formato inválido'});
        }

        const produto = [nome_produto, preco, estoque];
        ProdutoDAO.adicionar(produto, (err, resdb) => {
            res.header('Access-Control-Allow-Origin', '*');
            if (err) {
                console.error('Erro ao inserir os dados', err);
                return res.status(500).json({message: 'Erro ao inserir os dados'});
            }
            return res.status(201).json({message: 'Produto inserido com sucesso', prodId: resdb.insertId});
        });
    });
}