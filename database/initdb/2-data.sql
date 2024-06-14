INSERT INTO Admin (username, hashPassword) VALUES
('admin', 'hashedPassAdmin');


INSERT INTO Utenti (id, hashPassword, email, residenza, consenso) VALUES
('user1', 'hashedPass1', 'user1@example.com', 'Via Roma 1, Milano', TRUE),
('user2', 'hashedPass2', 'user2@example.com', 'Via Milano 2, Roma', FALSE),
('user3', 'hashedPass3', 'user3@example.com', 'Via Torino 3, Napoli', TRUE);

INSERT INTO Aziende (partitaIva, ragioneSociale) VALUES
('user1', 'Azienda Alpha'),
('user2', 'Azienda Beta');

INSERT INTO Privati (codiceFiscale, nome, cognome) VALUES
('user3', 'Mario', 'Rossi');


INSERT INTO Garage (id_utente) VALUES
('user1'),
('user2'),
('user3');

INSERT INTO Modelli (marca, modello, versione) VALUES
('Fiat', '500', 'Sport'),
('Tesla', 'Model S', 'Plaid'),
('BMW', 'X5', 'xDrive40i');


-- Inserire prima una select sui garage e sui modelli per ottenere gli id corretti
SELECT id INTO @id_garage1 FROM Garage WHERE id_utente = 'user1';
SELECT id INTO @id_garage2 FROM Garage WHERE id_utente = 'user2';
SELECT id INTO @id_garage3 FROM Garage WHERE id_utente = 'user3';

SELECT id INTO @id_modello1 FROM Modelli WHERE marca = 'Fiat' AND modello = '500';
SELECT id INTO @id_modello2 FROM Modelli WHERE marca = 'Tesla' AND modello = 'Model S';
SELECT id INTO @id_modello3 FROM Modelli WHERE marca = 'BMW' AND modello = 'X5';

INSERT INTO Veicoli (targa, primaImmatricolazione, cartaDiCircolazione, id_modello, id_garage) VALUES
('AB123CD', '2020-01-15', 'cdp12345', @id_modello1, @id_garage1),
('EF456GH', '2021-05-20', 'cdp67890', @id_modello2, @id_garage2),
('IJ789KL', '2019-03-10', 'cdp13579', @id_modello3, @id_garage3);


INSERT INTO Spese (id, descrizione, importo, categoria, targa) VALUES
(1, 'Tagliando', 100.00, 'Tagliando', 'AB123CD'),
(2, 'Cambio gomme', 200.00, 'Manutenzione', 'AB123CD'),
(3, 'Revisione', 50.00, 'Revisione', 'EF456GH');

INSERT INTO SpeseSingole (id, data) VALUES
(2, '2021-02-01'),
(3, '2021-03-01');

INSERT INTO SpeseRicorrenti (id, primaRicorrenza, termineRicorrenza, periodoGiorni, periodoMesi, periodoAnni) VALUES
(1, '2021-01-01', '2021-12-31', 0, 6, 0);