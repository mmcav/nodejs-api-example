const EstoqueDAO = require('../dao/EstoqueDao');

module.exports = app => {
    app.get('/estoques', (req, res) => {
        EstoqueDAO.all((err, estoques) => {
            res.header('Access-Control-Allow-Origin', '*');
            if (err == null) {
                res.send(estoques);
            } else {
                res.status(404).send('Recurso não encontrado');
            }
        })
    });
}