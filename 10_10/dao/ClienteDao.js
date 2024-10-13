const db = require("../config/conexao");

class ClienteDAO {
    adicionar(cliente, callback) {
        const query = 'INSERT INTO clientes(nome, email, telefone, endereco) VALUES (?, ?, ?, ?)';
        db.query(query, cliente, (err, resdb) => {
            if (err) {
                callback('not found', null);
            } else {
                callback(null, resdb);
            }
        });
    }
}

module.exports = new ClienteDAO();