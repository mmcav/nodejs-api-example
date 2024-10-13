const mysql = require('mysql');

require('dotenv').config({ path: `${__dirname}/db.env` });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados');
        return;
    }
    console.log('Banco de dados conectado com sucesso');
});

module.exports = db;