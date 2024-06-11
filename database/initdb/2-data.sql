-- Dummy data for Utenti table
INSERT INTO Utenti (id, hashPassword, salt, email, residenza, consenso) VALUES
('user1', 'hash1', 'salt1', 'user1@example.com', 'Rome', TRUE),
('user2', 'hash2', 'salt2', 'user2@example.com', 'Milan', FALSE),
('user3', 'hash3', 'salt3', 'user3@example.com', 'Naples', TRUE),
('user4', 'hash4', 'salt4', 'user4@example.com', 'Turin', TRUE),
('user5', 'hash5', 'salt5', 'user5@example.com', 'Palermo', FALSE);

-- Dummy data for Aziende table
INSERT INTO Aziende (partitaIva, ragioneSociale) VALUES
('user1', 'Company One'),
('user3', 'Company Three'),
('user5', 'Company Five');
