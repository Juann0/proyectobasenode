const mysql = require('mysql2');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'juandavid',
    database: 'electiva',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 3
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA BASE DE DATOS FUE CERRADA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE MÁS DE UNA CONEXIÓN');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('LA CONEXIÓN A LA BASE DE DATOS FUE RECHAZADA');
        }
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.error('NO SE RECONOCE NINGUNA BASE DE DATOS CON ESE NOMBRE');
        }
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('ACCESO DENEGADO ' + err.sqlMessage);
        }
    }

    if (connection) {
        connection.release();
        console.log('BASE DE DATOS CONECTADA');
    }
    return;
});

// Utilizando promisify para convertir el método query a una versión basada en promesas
pool.query = promisify(pool.query);

module.exports = pool;
