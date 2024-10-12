const ClienteDAO = require('../dao/ClienteDao');

module.exports = app => {
    app.get('/clientes', (req, res) => {
        ClienteDAO.all((err, clientes) => {
            res.header('Access-Control-Allow-Origin', '*');
            if (err == null) {
                res.send(clientes);
            } else {
                res.status(404).send('Recurso não encontrado');
            }
        })
    });
}