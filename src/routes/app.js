const express = require('express');
const router = express.Router();
const helpers = require('../helpers/password');
const pool = require('../db');

//Ruta de contacto
router.get('/login', async (req, res) => {
    res.render('./app/login', { titulo: 'Inicio de sesión' });
});

router.get('/registro', async (req, res) => {
    const csrf = req.csrfToken();
    res.render('./app/registro', { titulo: 'Registrar usuario', csrf });
});

router.post('/registro', async (req, res) => {
    // console.log(req.body);
    const {
        nombre,
        apellido,
        correo,
        password,
        rol,
        estado
    } = req.body;

    const passwordEncriptada = await helpers.encryptPassword(password);

    // La primera es nombre del campo BD : mi variable
    const newUser = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: passwordEncriptada,
        rol: rol,
        estado: estado
    }

    const setUser = await pool.query('INSERT INTO `personas` SET ?', [newUser]);
    return res.status(200).json({ msg: 'Usuario registrado' });
});

module.exports = router; //Exporto las rutas para usarlas en otros archivos JS