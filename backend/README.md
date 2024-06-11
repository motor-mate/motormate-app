# Backend

## Come far partire il server
Dalla cartella `backend`, dopo aver fatto partire MariaDB:
```bash 
npm i # Installa i moduli node relativi al progetto
npm start # Fa partire il server
```

## Come far partire MariaDB (Mac)
Installare e avviare MariaDB con Homebrew:
 ```bash 
 brew install mariadb
 brew services start mariadb
```
Avviare la console MySQL:
 ```bash 
sudo mysql -u root
```
Dalla console:
 ```sql
CREATE DATABASE motormate;
```

Il resto delle istruzioni si può trovare [qui](https://dev.to/timo_reusch/quickly-setting-up-mariadb-on-macos-441l)




