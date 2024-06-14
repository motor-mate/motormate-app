/* ---------- CREAZIONE UTENTI ---------- */

CREATE TABLE IF NOT EXISTS Utenti (
  id VARCHAR(100) PRIMARY KEY,
  hashPassword VARCHAR(300) NOT NULL,
  /*salt VARCHAR(10) NOT NULL,*/
  email VARCHAR(100) NOT NULL,
  residenza VARCHAR(100) NOT NULL,
  consenso BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Aziende (
    partitaIva VARCHAR(100) PRIMARY KEY,
    ragioneSociale VARCHAR(100) NOT NULL,
    CONSTRAINT fk_partitaIva FOREIGN KEY (partitaIva) REFERENCES Utenti(id)
);

CREATE TABLE IF NOT EXISTS Privati (
    codiceFiscale VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    CONSTRAINT fk_codiceFiscale FOREIGN KEY (codiceFiscale) REFERENCES Utenti(id)
);

/* ---------- CREAZIONE GARAGE ---------- */

CREATE TABLE IF NOT EXISTS Garage (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_utente VARCHAR(100) NOT NULL,
  CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES Utenti(id)
);

/* ---------- CREAZIONE MODELLO ---------- */

CREATE TABLE IF NOT EXISTS Modelli (
  id INT PRIMARY KEY AUTO_INCREMENT,
  marca VARCHAR(100) NOT NULL,
  modello VARCHAR(100) NOT NULL,
  versione VARCHAR(100) NOT NULL
);

/* ---------- CREAZIONE VEICOLO ---------- */

CREATE TABLE IF NOT EXISTS Veicoli (
  targa VARCHAR(10) PRIMARY KEY,
  primaImmatricolazione DATE NOT NULL,
  cartaDiCircolazione VARCHAR(50) NOT NULL, /* link a file */
  id_modello INT NOT NULL,
  id_garage INT NOT NULL,
  CONSTRAINT fk_id_garage FOREIGN KEY (id_garage) REFERENCES Garage(id),
  CONSTRAINT fk_id_modello FOREIGN KEY (id_modello) REFERENCES Modelli(id)
);
