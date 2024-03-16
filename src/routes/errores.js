const express = require('express');
const router = express.Router();

//Ruta de contacto
router.get('/404', async (req, res) => {
    res.render('./app/error/404');
});

module.exports = router; //Exporto las rutas para usarlas en otros archivos JS