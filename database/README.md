# Far partire MariaDB con Docker

Questo documento descrive come avviare un server MariaDB con Docker e caricare automaticamente tabelle e dati all'avvio.


## Scaricare Docker
Docker si può scaricare da [qui](https://www.docker.com/products/docker-desktop).
Assicurarsi che Docker sia in esecuzione sulla propria macchina.

## Far partire il container 
Da questa cartella:
 ```bash
docker-compose up -d
docker exec -it mariadb-server mariadb -u root -p
```
La password da inserire, quando richiesto, è toor

Per verificare che i dati siano stati caricati correttamente:
 ```bash
USE motormate;
SHOW TABLES;
SELECT * FROM Users;
```
(Per qualche motivo l'ultima volta che ho testato funziona solo con USE mydatabase)

## Fermare il container o verificare che stia runnando
Verificare che il container stia runnando: 
 ```bash
docker ps
```
Prendere nota del container ID e terminare il container con:
 ```bash
docker kill <container_id>
```

## Riavviare il container 
 ```bash
docker-compose down
docker-compose up
```


