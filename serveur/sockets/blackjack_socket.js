// blackjack.js
const cartes = require('../../assets/js/cartes.js');

module.exports = function(socket) {
    blackjack_users = [];
    blackjack_croupeur_score = 0;

    user_id = socket.id;
    console.log("User " + user_id + " connected");

    blackjack_joueur_tour = () => {
        var timer = 5;

        var joueur_interval = setInterval(() => {
            if (timer > 0) {
                timer--;
                socket.to("blackjack").emit('joueur_tour', timer);
            } else {
                clearInterval(joueur_interval);

                let carte = cartes[Math.floor(Math.random() * 52) + 1];

                // blackjack_croupeur_score += carte['point'];
                socket.to("blackjack").emit('croupier_tour', carte);

                setTimeout(() => {
                    if (blackjack_joueur_tour < 17) {
                        blackjack_joueur_tour();
                    }
                }, 2000);
            }
        }, 1000);
    }

    socket.on('jouer_blackjack', () => {
        blackjack_joueur_tour();
    });

    socket.on('notif_to_group', (snapshot) => {
        socket.to(snapshot['group']).emit('notif-receved', snapshot['message'])
    });

};
