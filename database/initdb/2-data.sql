INSERT INTO Admin (username, hashPassword) VALUES
('admin', 'hashedPassAdmin');


INSERT INTO Utenti (id, hashPassword, email, residenza, consenso) VALUES
('user1', 'hashedPass1', 'user1@example.com', 'Via Roma 1, Milano', TRUE),
('user2', 'hashedPass2', 'user2@example.com', 'Via Milano 2, Roma', FALSE),
('user3', 'hashedPass3', 'user3@example.com', 'Via Torino 3, Napoli', TRUE),
('MRIRSS03409DJ2H2', '$2a$10$wUPgtJ59iC/oII7gA4p.z.rxeHholGI3OJbzgRjCbTSvSfJQaU4RG', 'mario.rossi@gmail.com', 'Via Zamboni, 45', FALSE);

INSERT INTO Aziende (partitaIva, ragioneSociale) VALUES
('user1', 'Azienda Alpha'),
('user2', 'Azienda Beta');

INSERT INTO Privati (codiceFiscale, nome, cognome) VALUES
('user3', 'Mario', 'Rossi');

INSERT INTO Garage (id_utente) VALUES
('user1'),
('user2'),
('user3'),
('MRIRSS03409DJ2H2');

INSERT INTO Modelli (marca, modello, versione) VALUES
('Fiat', '500', 'Sport'),
('Tesla', 'Model S', 'Plaid'),
('BMW', 'X5', 'xDrive40i');


-- Inserire prima una select sui garage e sui modelli per ottenere gli id corretti
SELECT id INTO @id_garage1 FROM Garage WHERE id_utente = 'user1';
SELECT id INTO @id_garage2 FROM Garage WHERE id_utente = 'user2';
SELECT id INTO @id_garage3 FROM Garage WHERE id_utente = 'user3';
SELECT id INTO @id_garage4 FROM Garage WHERE id_utente = 'MRIRSS03409DJ2H2';

SELECT id INTO @id_modello1 FROM Modelli WHERE marca = 'Fiat' AND modello = '500';
SELECT id INTO @id_modello2 FROM Modelli WHERE marca = 'Tesla' AND modello = 'Model S';
SELECT id INTO @id_modello3 FROM Modelli WHERE marca = 'BMW' AND modello = 'X5';
SELECT id INTO @id_modello4 FROM Modelli WHERE marca = 'Fiat' AND modello = '500';

INSERT INTO Veicoli (targa, primaImmatricolazione, cartaDiCircolazione, id_modello, id_garage) VALUES
('AB123CD', '2020-01-15', 'cdp12345', @id_modello1, @id_garage1),
('EF456GH', '2021-05-20', 'cdp67890', @id_modello2, @id_garage2),
('IJ789KL', '2019-03-10', 'cdp13579', @id_modello3, @id_garage3),
('MN012OP', '2020-07-01', 'cdp24680', @id_modello4, @id_garage4),
('QR345ST', '2018-12-05', 'cdp35791', @id_modello1, @id_garage4);



INSERT INTO Spese (id, descrizione, importo, categoria, targa) VALUES
(1, 'Tagliando', 100.00, 'Tagliando', 'AB123CD'),
(2, 'Cambio gomme', 200.00, 'Manutenzione', 'AB123CD'),
(3, 'Revisione', 50.00, 'Revisione', 'EF456GH'), 
(4, 'Assicurazione', 500.00, 'Assicurazione', 'IJ789KL'),
(5, 'Bollo', 100.00, 'Bollo', 'MN012OP'),
(6, 'Tagliando', 100.00, 'Tagliando', 'QR345ST'), 
(7, 'Cambio gomme', 200.00, 'Manutenzione', 'QR345ST');

INSERT INTO SpeseSingole (id, data) VALUES
(2, '2021-02-01'),
(3, '2021-03-01');

INSERT INTO SpeseRicorrenti (id, primaRicorrenza, termineRicorrenza, periodoGiorni, periodoMesi, periodoAnni) VALUES
(1, '2021-01-01', '2021-12-31', 0, 6, 0);