const db = require("../config/conexao");

class EstoqueDAO {
    adicionar(estoque) {
        let sql = '';
        if (estoque.id !== undefined) {
            sql = `UPDATE estoques SET nome = '${estoque.nome}', valor = '${estoque.valor}',
                quantidade = '${estoque.quantidade}' WHERE id = ${estoque.id}`;
        } else {
            sql = `INSERT INTO estoques(nome, valor, quantidade)
                VALUES('${estoque.nome}', '${estoque.valor}', '${estoque.quantidade}')`;
        }
        db.run(sql);
    }

    get(id, callback) {
        db.get('SELECT * FROM estoques WHERE id = ?', [id], (err, estoque) => {
            if (err || estoque == undefined ){
                callback("not found", null);
            } else {
                callback(null, estoque);
            }
        });
    }

    all(callback) {
        db.all('SELECT * FROM estoques', [], (err, estoques) => {
            if (err || estoques == undefined ){
                callback("not found", null);
            } else {
                callback(null, estoques);
            }
        });
    }

    total(callback) {
        db.get('SELECT count(*) as count FROM estoques', [], (err, total) => {
            if (err || total == undefined ){
                callback("not found", null);
            } else {
                callback(null, total.count);
            }
        });
    }
}

module.exports = new EstoqueDAO();