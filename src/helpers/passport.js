const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./../db');
const passwordHelper = require('./password');

passport.use('local.iniciar', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, correo, password, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await passwordHelper.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user);
        } else {
            done(null, false, req.flash('error', 'Usuario o contraseña incorrectos'));
        }
    } else {
        done(null, false, req.flash('error', 'Usuario o contraseña incorrectos'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [user.correo]);
    done(null, rows[0]);
});