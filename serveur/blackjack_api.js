// module2Routes.js
const express = require('express');
const router = express.Router();

router.get('/module2', (req, res) => {
    res.json({ message: 'Ceci est une route du module 2' });
});

module.exports = router;
