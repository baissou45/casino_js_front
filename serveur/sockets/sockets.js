const blackjack = require('./blackjack_socket.js');

module.exports = (io) => {
    io.on('connection', socket => {
        console.log('connection received from' + socket.toString());

        socket.on('join', (snapshot) => {
            console.log(snapshot);

            var data = {};
            data['message'] = snapshot['nom'] + ' a join la partie';

            const membres = io.sockets.adapter.rooms.get(snapshot['group']);
            if (membres && membres.size > 0) {
                const members = Array.from(membres);
                data['members'] = members;
            } else {
                socket.emit('membres', []); // Envoyer un tableau vide si la room est vide ou n'existe pas
            }

            socket.join(snapshot['group']);
            socket.to(snapshot['group']).emit('nouveau_joueur', data);
            io.to(user_id).emit("get_members", membres);
        })

        socket.on('leave', (room) => {
            socket.leave(room);
        })

        socket.on('disconnecting', () => {
            socket.rooms.forEach(room => {
                socket.to(room).emit('notif-receved', socket.id + ' a quitter le groupe');
                socket.leave(room);
            });
        })

        blackjack(socket);

        socket.on('disconnect', () => {
            console.log(socket.rooms);
        })
    })
}