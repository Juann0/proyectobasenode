const express = require('express');
const router = express.Router();
const helpers = require('../helpers/password');
const pool = require('../db');
const passport = require('passport');
const { estaLaSesion, noEstaLaSesion } = require('../helpers/auth');

//Ruta de contacto
router.get('/login', noEstaLaSesion, async (req, res) => {
    const csrf = req.csrfToken();
    res.render('./app/login', { titulo: 'Inicio de sesión', csrf });
});

router.post('/login', noEstaLaSesion, async (req, res, next) => {
    try {
        const row = await pool.query('SELECT correo, id FROM usuarios WHERE correo = ?', [req.body.correo]);
        if (req.body.usuario == "" || req.body.password == "") {
            req.flash('error', 'Campos vacios');
            return res.redirect('/app/login');
        }
        if (row.length > 0) {
            if (req.body.correo != "" && req.body.password != "") {
                passport.authenticate('local.iniciar', {
                    successRedirect: '/app/home',
                    failureRedirect: '/app/login',
                    failureFlash: true
                })(req, res, next);
            } else {
                req.flash('error', 'Campos vacios');
                res.redirect('/app/login');
            }
        } else {
            req.flash('error', 'Usuario o contraseña incorrectos');
            res.redirect('/app/login');
        }
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/app/login');
    }
});

router.get('/registro', async (req, res) => {
    const csrf = req.csrfToken();
    res.render('./app/registro', { titulo: 'Registrar usuario', csrf });
});


router.get('/home', estaLaSesion, async (req, res, next) => {
    const csrf = req.csrfToken();
    res.render('./app/home', { titulo: 'Incio de la app', csrf });
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

    const setUser = await pool.query('INSERT INTO `usuarios` SET ?', [newUser]);
    return res.status(200).json({ msg: 'Usuario registrado' });
});

module.exports = router; //Exporto las rutas para usarlas en otros archivos JS