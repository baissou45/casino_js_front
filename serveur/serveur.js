const express = require('express')();
const server = require('http').createServer(express);
const io = require("socket.io")(server,  {
    cors: { origin: "*" }
})

users = {};

io.on('connection', socket => {
    user_id = socket.id;
    console.log("User " + user_id + " connected");

    socket.on('notif_to_group', (snapshot) => {
        socket.to(snapshot['group']).emit('notif-receved', snapshot['message'])
    });

    socket.on('join', (snapshot) => {
        console.log(snapshot);

        socket.join(snapshot['group']);
        socket.to(snapshot['group']).emit('nouveau_joueur', snapshot['nom'] + ' a join la partie');
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

    socket.on('disconnect', () => {
        console.log(socket.rooms);
    })
})

server.listen("3000", () => {
    console.log("serveur runing");
})