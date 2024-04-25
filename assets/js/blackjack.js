
        var timer = 0;
        var mon_paris = 0;
        var mon_solde = JSON.parse(localStorage.getItem('auth_user')).user.solde;
        var mes_cartes = [];
        var scores = {
            "croupier" : 0,
            "joueur" : 0,
        }

        $('header').load('/header.html')
        $('#mon_solde').text(mon_solde)

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

        $(document).ready(() => {
            join_group({
                "group" : "blackjack",
                "nom" : "Fouss Djo"
            });
        })


        // add_carte = (clss) => {
        //     let carte = cartes[Math.floor(Math.random() * 52) + 1];
        //     mes_cartes.push(carte);

        //     if (clss === "joueur_get_carte") {
        //         $('.mes_cartes').append(`<img src="` + carte.carte + `" class="cartes ${clss}">`);
        //         scores.joueur += carte.point;
        //         setTimeout(() => {
        //             $('#victoire').text(scores.joueur);
        //         }, 500)

        //         setTimeout(() => {
        //             if(scores.joueur === 21) {
        //                 $('#message').modal('show');
        //                 $('#message-head').text("Blackjack !!!");
        //                 $('#message-content').text("Vous avez gagner : " + mon_paris * 2 + " €");

        //                 mon_solde += mon_paris * 2
        //                 // fin_partie();
        //             }

        //             if(scores.joueur > 21) {
        //                 $('#message').modal('show');
        //                 $('#message-head').text("Fin de la partie !!!");
        //                 $('#message-content').text("Vous avez perdu");

        //                 // fin_partie();
        //             }
        //         }, 1000)

        //     } else {
        //         $('.croupier_cartes').append(`<img src="` + carte.carte + `" class="cartes ${clss}">`);
        //         scores.croupier += carte.point;
        //         setTimeout(() => {
        //             $('#defaite').text(scores.croupier);
        //         }, 1500)

        //         setTimeout(() => {
        //             if(scores.croupier === 21) {
        //                 $('#message').modal('show');
        //                 $('#message-head').text("Fin de la partie !!!");
        //                 $('#message-content').text("Vous avez perdu");

        //                 // fin_partie();
        //             }

        //             if(scores.croupier > 21) {
        //                 $('#message').modal('show');
        //                 $('#message-head').text("Blackjack !!!");
        //                 $('#message-content').text("Vous avez gagner : " + mon_paris * 2 + " €");

        //                 mon_solde += mon_paris * 2
        //                 // fin_partie();
        //             }
        //         }, 1000)
        //     }
        // }

        joueur_add_carte = () => {
            let carte = cartes[Math.floor(Math.random() * 52) + 1];
            mes_cartes.push(carte);

            $('.mes_cartes').append(`<img src="` + carte.carte + `" class="cartes joueur_get_carte">`);
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
                    refresh_solde(mon_paris * 2, true);
                    // fin_partie();
                }

                if(scores.joueur > 21) {
                    $('#message').modal('show');
                    $('#message-head').text("Fin de la partie !!!");
                    $('#message-content').text("Vous avez perdu");

                    // fin_partie();
                }
            }, 1000)
        }

        croupier_add_carte = () => {
            let carte = cartes[Math.floor(Math.random() * 52) + 1];

            $('.croupier_cartes').append(`<img src="` + carte.carte + `" class="cartes croupier_get_card">`);
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
                        refresh_solde(mon_paris * 2, true);
                        // fin_partie();
                    }
                }, 1000)
        }

        move_cartes = (clss) => {
            document.querySelectorAll('.' + clss).forEach((piece, index) => {
                let nbr = document.querySelectorAll('.' + clss).length - index;
                piece.style.transform = 'translatex(' + (nbr * 20) + 'px)';
            })
        }

        jouer = () => {

            // if (timer <= 0) {
            //     socket.emit('jouer_blackjack');
            // }

            if(mon_solde < 5) {
                // Message de solde inssufisant
                alert("Vous n'avez pas assez d'argent sur votre compte !");
            } else {
                mon_paris === 0 && $('#my-piece').css('opacity', 1);

                mon_paris += 5;
                mon_solde -= 5;

                refresh_solde(mon_paris, false);

                $('#mon_paris').text(mon_paris);
                $('#mon_solde').text(mon_solde);
            }
        }

        demander_carte = () => {
            if(mon_paris === 0) {
            } else {
                move_cartes("joueur_get_carte");
                move_cartes("croupier_get_card");

                joueur_add_carte();
                croupier_add_carte();

                // if(scores.croupier < 17) {
                //     add_carte("croupier_get_card");
                //     move_cartes("croupier_get_card");
                // }
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
                    refresh_solde(mon_paris * 2, true);
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


        socket.on('nouveau_joueur', (data) => {
            toastr.info(data["message"], 'Nouveau joueur')

            autres_jouer(data["members"]);
        });

        socket.on("get_members", (data) => {
            autres_jouer(data);
        });

        socket.on("joueur_tour", (timer) => {
            $('#timer').text(timer);
            $('#evenement').text("Tour du joueur");
        });
        socket.on("croupier_tour", (carte) => {
            $('#timer').text(0);
            $('#evenement').text("Tour du croupier");

            if(scores.croupier < 17) {
                croupier_add_carte(carte);
                move_cartes("croupier_get_card");
            }
        });

        autres_jouer = (data) => {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                $('#my-piece' + (i + 2)).css('opacity', 1);
            }
        }

        refresh_solde = (mnt, add) => {
            const token = JSON.parse(localStorage.getItem('auth_user')).token

            fetch( add ? `${api_url}/recharge` : `${api_url}/pari`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    montant: mnt
                })
            }).then(response => {
                if (!response.ok) {
                    if (response.status == 403) {
                        window.location = '/login.html';
                    }
                    throw new Error('La requête a échoué avec le statut ' + response.status);
                }
                return response.json(); // convertit la réponse en JSON
            }).then(async data => {
                alert(data.message);

                localStorage.setItem('auth_user', JSON.stringify(data.data));
                mon_solde = data.data.user.solde;
            }).catch(error => {
                console.error(error);
                alert('Une erreur s\'est produite: ' + error.message);
            })
        }