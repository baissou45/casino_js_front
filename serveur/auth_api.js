// authApi.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db/db.js');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middleware.js');

// Inscription avec mysql2
router.post('/register', async (req, res) => {
    const nomComplet = req.body.nomComplet;
    const uname = req.body.uname;
    const pass = req.body.pass;
    const email = req.body.email;
    const pass_hash = bcrypt.hashSync(pass, 10);

    try {
        db.con.query('INSERT INTO users (username, password, email, nom_complet) VALUES (?,?,?,?)', [uname, pass_hash, email, nomComplet], (err, result) => {
            if (err) {
                console.error(err);
                res.json({ message: 'Inscription échouée', error: err });
            } else {
                res.json({ message: 'Inscription réussie' });
            }
        });
    } catch (err) {
        console.error(err);
        res.json({ message: 'Inscription échouée', error: err });
    }
});

// Connexion avec mysql2
router.post('/login', async (req, res) => {
    try {
        db.con.query('SELECT * FROM users WHERE username = ?', [req.body.username], async (err, rows) => {
            if (err) {
                console.error(err);
                res.json({ message: 'Connexion échouée', error: err });
            } else {
                if (rows.length > 0) {
                    const match = await bcrypt.compare(req.body.password, rows[0].password);
                    if (match) {
                        const token = jwt.sign({ userId: rows[0].id }, 'secret_key', { expiresIn: '1h' });
                        const data = {
                            user: rows[0],
                            token: token
                        }
                        res.json({ data: data, message: 'Connexion réussie' });
                    } else {
                        res.status(510).json({ message: "Nom d'utilisateur ou mot de passe incorrecte" });
                    }
                } else {
                    res.status(510).json({ message: "Nom d'utilisateur ou mot de passe incorrecte" });
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.json({ message: 'Connexion échouée', error: err });
    }
});

router.post('/recharge', verifyToken, function(req, res) {
    var solde = req.body.montant;
    const id = req.userId;

    var user;
    var data;

    db.con.query('SELECT * FROM users WHERE id = ?', [id], async (err, rows) => {
        const token = jwt.sign({ userId: rows[0].id }, 'secret_key', { expiresIn: '1h' });
        user = rows[0];
        data = {
            user: rows[0],
            token: token
        }
        user.solde = parseInt(user.solde) + parseInt(solde);

        db.con.query('UPDATE users SET solde =? WHERE id =?', [user.solde, id], (err, result) => {
            if (err) {
                console.error(err);
                res.json({ message: 'Rechargement échouée', error: err });
            } else {
                res.json({ data: data, message: 'Rechargement réussie' });
            }
        });
    });
});

router.post('/pari', verifyToken, function (req, res) {
    var solde = req.body.montant;
    const id = req.userId;

    var user;
    var data;

    db.con.query('SELECT * FROM users WHERE id = ?', [id], async (err, rows) => {
        const token = jwt.sign({ userId: rows[0].id }, 'secret_key', { expiresIn: '1h' });
        user = rows[0];
        data = {
            user: rows[0],
            token: token
        }
        user.solde = parseInt(user.solde) - parseInt(solde);

        db.con.query('UPDATE users SET solde =? WHERE id =?', [user.solde, id], (err, result) => {
            if (err) {
                console.error(err);
                res.json({ message: 'Pari échouée', error: err });
            } else {
                res.json({ data: data, message: 'Pari réussie' });
            }
        });
    });
});


module.exports = router;
