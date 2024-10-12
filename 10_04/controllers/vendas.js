const VendaDAO = require('../dao/VendaDao');

module.exports = app => {
    app.get('/vendas', (req, res) => {
        VendaDAO.all((err, vendas) => {
            res.header('Access-Control-Allow-Origin', '*');
            if (err == null) {
                res.send(vendas);
            } else {
                res.status(404).send('Recurso não encontrado');
            }
        })
    });
}