const db = require("../config/conexao");

class ProdutoDAO {
    adicionar(produto, callback) {
        const query = 'INSERT INTO produtos(nome_produto, preco, estoque) VALUES (?, ?, ?)';
        db.query(query, produto, (err, resdb) => {
            if (err) {
                callback('not found', null);
            } else {
                callback(null, resdb);
            }
        });
    }
}

module.exports = new ProdutoDAO();