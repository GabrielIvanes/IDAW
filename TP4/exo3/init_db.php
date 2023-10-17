<?php

require(__DIR__ . '/../config.php');
$connectionString = "mysql:host=". _MYSQL_HOST;
if(defined('_MYSQL_PORT'))
    $connectionString .= ";port=". _MYSQL_PORT;
$connectionString .= ";dbname=" . _MYSQL_DBNAME;
$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8' );
$pdo = NULL;
try {
    $pdo = new PDO($connectionString, _MYSQL_USER, _MYSQL_PASSWORD, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlFile = file_get_contents(__DIR__.'/sql/create_db.sql');
    $pdo -> exec($sqlFile);
    
    echo 'Connexion réussie';
}
catch (PDOException $erreur) {
    echo 'Erreur : '.$erreur->getMessage();
}


$pdo = null;

?>