module.exports = {
    estaLaSesion(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/app/login');
    },
    noEstaLaSesion(req, res, next) {
        if (req.user) {
            return res.redirect('/app/home');
        } else {
            if (!req.isAuthenticated()) {
                return next();
            }
            return res.redirect('/app/login');
        }
    }
};