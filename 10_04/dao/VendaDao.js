const db = require("../config/conexao");

class VendaDAO {
    adicionar(venda) {
        let sql = '';
        if (venda.id !== undefined) {
            sql = `UPDATE vendas SET id_cliente = '${venda.id_cliente}', id_estoque = '${venda.id_estoque}',
                valor_total = '${venda.valor_total}', quantidade = '${venda.quantidade}' WHERE id = ${venda.id}`;
        } else {
            sql = `INSERT INTO vendas(id_cliente, id_estoque, valor_total, quantidade)
                VALUES('${venda.id_cliente}', '${venda.id_estoque}', '${venda.valor_total}', '${venda.quantidade}')`;
        }
        db.run(sql);
    }

    get(id, callback) {
        db.get('SELECT * FROM vendas WHERE id = ?', [id], (err, venda) => {
            if (err || venda == undefined ){
                callback("not found", null);
            } else {
                callback(null, venda);
            }
        });
    }

    all(callback) {
        db.all('SELECT * FROM vendas', [], (err, vendas) => {
            if (err || vendas == undefined ){
                callback("not found", null);
            } else {
                callback(null, vendas);
            }
        });
    }

    total(callback) {
        db.get('SELECT count(*) as count FROM vendas', [], (err, total) => {
            if (err || total == undefined ){
                callback("not found", null);
            } else {
                callback(null, total.count);
            }
        });
    }
}

module.exports = new VendaDAO();