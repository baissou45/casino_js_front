const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket_logic = require('./sockets/sockets.js');
const db = require('./db/db.js');
const blackjackApi = require('./blackjack_api.js');
const authApi = require('./auth_api.js');
const cors = require('cors');
const io = require("socket.io")(server,  {
    cors: { origin: "*" }
})

app.use(express.json());

socket_logic(io);

app.use(cors());
app.use('/', authApi);
app.use('/blackjack', blackjackApi);


db.con.connect((err) => {
    if (err) {
        console.log(err);
        throw err
    };

    console.log(`Connexion a la base données etavlie avec success`);
    server.listen(3000, () => {
        console.log(`Le serveur est sur le port 3000`);
    });
});