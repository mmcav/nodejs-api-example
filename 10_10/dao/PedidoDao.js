const db = require("../config/conexao");

class PedidoDAO {
    adicionar(pedido, callback) {
        const query = 'INSERT INTO pedidos(id_cliente, id_produto, data_pedido, quantidade, valor_total) VALUES (?, ?, ?, ?, ?)';
        db.query(query, pedido, (err, resdb) => {
            if (err) {
                callback('not found', null);
            } else {
                callback(null, resdb);
            }
        });
    }
}

module.exports = new PedidoDAO();