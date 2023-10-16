<?php

class Database {
    
    private $connectionString = "mysql:host=" . _MYSQL_HOST . ";port=" . _MYSQL_PORT . ";dbname=" . _MYSQL_DBNAME;
    private $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
    private $pdo;

    public function getConnection() {
        $this->pdo = NULL;
        
        try {
            $this->pdo = new PDO($this->connectionString, _MYSQL_USER, _MYSQL_PASSWORD, $this->options);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $erreur) {
            echo 'Erreur : ' . $erreur->getMessage();
        }

        return $this->pdo;
    }
}
?>