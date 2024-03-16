const express = require('express');
const router = express.Router();

//Ruta de contacto
router.get('/formulario', async (req, res) => {
    res.render('./app/contacto', { titulo: 'Formulario de contacto' });
});

module.exports = router; //Exporto las rutas para usarlas en otros archivos JS