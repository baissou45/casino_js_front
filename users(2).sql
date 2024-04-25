-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 25 avr. 2024 à 12:44
-- Version du serveur : 8.1.0
-- Version de PHP : 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cours_js_casino`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom_complet` varchar(255) NOT NULL,
  `solde` double NOT NULL DEFAULT '0',
  `salle_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nom_complet`, `solde`, `salle_id`, `email`) VALUES
(1, 'user', '$2b$10$6DKijP/ogXt5ZAjfRlCuSu9GTT/o1z2N56quuJOUkqgwQ7Sj9pF9S', 'test', 41055, NULL, 'a@a.aa'),
(3, 'sozuzicivu', '$2b$10$DQjwShHJ4P/g.4NH4Ipr.eYx0MMH5Rm8wxpTpKrIJ2.dDMvRk98k6', 'Alexa Preston', 0, NULL, 'dumonij@mailinator.com'),
(4, 'sucugipe', '$2b$10$K/sCJE3LURzCo0pzRnbAouPgiwku2rM9YgY5S7QnXs6yVQ/2.fxI2', 'Lester Kinney', 0, NULL, 'qezukufam@mailinator.com'),
(5, 'nekip', '$2b$10$O2AVEbTRWbKnr8erK4cFHu.NRIDSQMgXfRVgvQ2KOf/px7Ddtaipa', 'Iris Newman', 0, NULL, 'kepu@mailinator.com'),
(6, 'zasopu', '$2b$10$vbtdbeVuk9CyBZ4L7ZBcbujLphdfW7SCrnasmojlgNYQolG.1S3Hy', 'Nichole Silva', 0, NULL, 'dowe@mailinator.com'),
(7, 'momudoxif', '$2b$10$Dr277ynCaV894q/lZTdaX.H.LmRcbgOKArMdZB1KhFu/JXKBMNzfS', 'Nerea Nolan', 0, NULL, 'bocojeqaky@mailinator.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `email_6` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
