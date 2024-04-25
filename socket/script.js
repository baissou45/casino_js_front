const socket = io('localhost:3000')
// let beat = new Audio('socket/sng/sng_1.wav');

// Liste des functions de helper
get_user_id = () => {
    return socket.id;
}

join_group = (snapshot) => {
    socket.emit('join', snapshot);
}

leave_group = (group) => {
    socket.emit('leave', group);
}



send_notif_to_user = (snapshot) => {
    socket.emit('notif_to_user', snapshot);
}

send_notif_to_group = (snapshot) => {
    socket.emit('notif_to_group', snapshot);
}

send_notif_to_all = (message) => {
    socket.emit('notif_to_all', message);
}



// Liste des functions de socket
socket.on('notif-receved', (message) => {
    toastr.info(message, 'Nouvelle notification')
    // beat.play();
});

// socket.on('nouveau_joueur', (message) => {
//     toastr.info(message["message"], 'Nouveau joueur')
//     //$('#my-piece2').css('opacity', 1);
//     //$('#my-piece3').css('opacity', 1);
//     //$('#my-piece4').css('opacity', 1);
//     //$('#my-piece5').css('opacity', 1);
// });

socket.on('connect', () => {
    console.log(socket.id);
    socket.username = "NomUtilisateur_" + Math.floor(Math.random() * 2) + 1;
    socket.emit('userInfo', { username: socket.username });
})