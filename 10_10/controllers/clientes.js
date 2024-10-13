const ClienteDAO = require('../dao/ClienteDao');

module.exports = app => { 
    app.post('/clientes', (req, res) => {
        const {nome, email, telefone, endereco} = req.body;
        if (nome == null || email ==  null || telefone == null || endereco == null) {
            return res.status(400).json({message: 'Nome, email, telefone e endereço são obrigatórios'});
        }

        if (typeof nome !== 'string' || nome === "") {
            return res.status(400).json({message: 'Entrada nome do cliente em formato inválido'});
        }

        if (typeof email !== 'string' || email === "") {
            return res.status(400).json({message: 'Entrada email do cliente em formato inválido'});
        }

        if (typeof telefone !== 'string' || telefone === "") {
            return res.status(400).json({message: 'Entrada telefone do cliente em formato inválido'});
        }

        if (typeof endereco !== 'string' || endereco === "") {
            return res.status(400).json({message: 'Entrada endereço do cliente em formato inválido'});
        }

        const cliente = [nome, email, telefone, endereco];
        ClienteDAO.adicionar(cliente, (err, resdb) => {
            res.header('Access-Control-Allow-Origin', '*');
            if (err) {
                console.error('Erro ao inserir os dados', err);
                return res.status(500).json({message: 'Erro ao inserir os dados'});
            }
            return res.status(201).json({message: 'Cliente inserido com sucesso', userId: resdb.insertId});
        });
    });
}