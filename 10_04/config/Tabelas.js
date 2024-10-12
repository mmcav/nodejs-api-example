const conexao = require('./conexao');
const ClienteDAO = require('../dao/ClienteDao');
const Cliente = require('../models/Cliente');

class Tabelas {
    init() {
        conexao.serialize(() =>{
            conexao.run(`CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY, nome varchar(255)
                NOT NULL, email varchar(255) NOT NULL, senha varchar(255) NOT NULL)`);
            conexao.run(`CREATE TABLE IF NOT EXISTS estoques (id INTEGER PRIMARY KEY, nome
                varchar(255) NOT NULL, valor real NOT NULL, quantidade integer NOT NULL)`);
            conexao.run(`CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY, id_cliente INTEGER
                NOT NULL, id_estoque INTEGER NOT NULL, valor_total real NOT NULL, quantidade integer NOT NULL,
                FOREIGN KEY(id_cliente) REFERENCES clientes(id), FOREIGN KEY(id_estoque) REFERENCES
                estoques(id))`);
        });
    }

    seed() {
        ClienteDAO.total((err, total)=> {
            if (total == 0) {
                ClienteDAO.adicionar(new Cliente('Cliente 1', 'cliente1@teste.com', '123456'));
                ClienteDAO.adicionar(new Cliente('Cliente 2', 'cliente2@teste.com', '123456'));
                ClienteDAO.adicionar(new Cliente('Cliente 3', 'cliente3@teste.com', '123456'));
                ClienteDAO.adicionar(new Cliente('Cliente 4', 'cliente4@teste.com', '123456'));
                ClienteDAO.adicionar(new Cliente('Cliente 5', 'cliente5@teste.com', '123456'));
            }
        });
    }
}

module.exports = new Tabelas;