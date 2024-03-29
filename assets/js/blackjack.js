var mon_paris = 0;
        var mon_solde = 500;
        var mes_cartes = [];
        var scores = {
            "croupier" : 0,
            "joueur" : 0,
        }

        $('header').load('/header.html')

        // Charger les modals
        $('#message_zone').load('/modals/message_blackjack.html')

        quitter = () => {
            fin_partie();
            $('#message').modal('hide');
            window.location.href = '/index.html';
        }

        rejouer = () => {
            fin_partie();
            $('#message').modal('hide');
        }

        // $(document).ready(() => {
        //     join_group({
        //         "group" : "blackjack",
        //         "nom" : "Fouss Djo"
        //     });
        // })


        add_carte = (clss) => {
            let carte = cartes[Math.floor(Math.random() * 52) + 1];
            mes_cartes.push(carte);

            if (clss === "joueur_get_carte") {
                $('.mes_cartes').append(`<img src="` + carte.carte + `" class="cartes ${clss}">`);
                scores.joueur += carte.point;
                setTimeout(() => {
                    $('#victoire').text(scores.joueur);
                }, 500)

                setTimeout(() => {
                    if(scores.joueur === 21) {
                        $('#message').modal('show');
                        $('#message-head').text("Blackjack !!!");
                        $('#message-content').text("Vous avez gagner : " + mon_paris * 2 + " €");

                        mon_solde += mon_paris * 2
                        // fin_partie();
                    }

                    if(scores.joueur > 21) {
                        $('#message').modal('show');
                        $('#message-head').text("Fin de la partie !!!");
                        $('#message-content').text("Vous avez perdu");

                        // fin_partie();
                    }
                }, 1000)

            } else {
                $('.croupier_cartes').append(`<img src="` + carte.carte + `" class="cartes ${clss}">`);
                scores.croupier += carte.point;
                setTimeout(() => {
                    $('#defaite').text(scores.croupier);
                }, 1500)

                setTimeout(() => {
                    if(scores.croupier === 21) {
                        $('#message').modal('show');
                        $('#message-head').text("Fin de la partie !!!");
                        $('#message-content').text("Vous avez perdu");
    
                        // fin_partie();
                    }
    
                    if(scores.croupier > 21) {
                        $('#message').modal('show');
                        $('#message-head').text("Blackjack !!!");
                        $('#message-content').text("Vous avez gagner : " + mon_paris * 2 + " €");
    
                        mon_solde += mon_paris * 2
                        // fin_partie();
                    }
                }, 1000)
            }
        }

        move_cartes = (clss) => {
            document.querySelectorAll('.' + clss).forEach((piece, index) => {
                let nbr = document.querySelectorAll('.' + clss).length - index;
                piece.style.transform = 'translatex(' + (nbr * 20) + 'px)';
            })
        }

        jouer = () => {

            if(mon_solde < 5) {
                // Message de solde inssufisant
                alert("Vous n'avez pas assez d'argent sur votre compte !");
            } else {
                mon_paris === 0 && $('#my-piece').css('opacity', 1);

                mon_paris += 5;
                mon_solde -= 5;

                $('#mon_paris').text(mon_paris);
                $('#mon_solde').text(mon_solde);
            }

            //$('#my-piece2').css('opacity', 1);
            //$('#my-piece3').css('opacity', 1);
            //$('#my-piece4').css('opacity', 1);
            //$('#my-piece5').css('opacity', 1);
        }

        demander_carte = () => {
            if(mon_paris === 0) {
            } else {
                move_cartes("joueur_get_carte");
                add_carte("joueur_get_carte");

                if(scores.croupier < 17) {
                    add_carte("croupier_get_card");
                    move_cartes("croupier_get_card");
                }
            }
        }

        fin_partie_click = () => {

            if(scores.croupier < 17 && scores.croupier < scores.joueur) {
                move_cartes("croupier_get_card");
                add_carte("croupier_get_card");

                setTimeout(() => {
                    fin_partie_click();
                }, 2000)
            } else {
                if(scores.croupier < scores.joueur) {
                    $('#message').modal('show');
                    $('#message-head').text("Fin de la partie !!!");
                    $('#message-content').text("Félicitation vous avez gagné");

                    mon_solde += mon_paris * 2
                } else if(scores.croupier === scores.joueur) {
                    $('#message').modal('show');
                    $('#message-head').text("Fin de la partie !!!");
                    $('#message-content').text("Manche null");

                    mon_solde += mon_paris
                } else {
                    $('#message').modal('show');
                    $('#message-head').text("Fin de la partie !!!");
                    $('#message-content').text("Vous avez perdu");
                }

                // setTimeout(() => {
                //     fin_partie();
                // }, 1000)
            }
        }

        fin_partie = () => {
            scores.croupier = 0;
            scores.joueur = 0;
            mon_paris = 0;

            $('#mon_paris').text(mon_paris);
            $('#mon_solde').text(mon_solde);
            $('#victoire').text(scores.joueur);
            $('#defaite').text(scores.croupier);

            $('#my-piece').css('opacity', 0);
            $('#my-piece2').css('opacity', 0);
            $('#my-piece3').css('opacity', 0);
            $('#my-piece4').css('opacity', 0);
            $('#my-piece5').css('opacity', 0);

            $('.croupier_cartes').empty();
            $('.mes_cartes').empty();

            $('#mes_cartes').empty();
            $('#croupier_cartes').empty();
        }

        //document.querySelectorAll('.cartes').forEach((piece) => {
        //    piece.style.transform = 'translatex(20px)';
        //})

        //setInterval(() => {
        //    add_carte();
        //     console.log('hi');
        //}, 1000);
