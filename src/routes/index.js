const express = require('express');
const router = express.Router();

//Ruta de contacto
router.get('/', async (req, res) => {
    res.render('./app/index', { titulo: 'Inicio' });
});

module.exports = router; //Exporto las rutas para usarlas en otros archivos JS