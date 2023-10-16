<?php 
require_once('../config.php');

$connectionString = "mysql:host=" . _MYSQL_HOST;
if (defined('_MYSQL_PORT')) {
    $connectionString .= ";port=" . _MYSQL_PORT;
}
$connectionString .= ";dbname=" . _MYSQL_DBNAME;
$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
$pdo = NULL;
try {
    $pdo = new PDO($connectionString, _MYSQL_USER, _MYSQL_PASSWORD, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo 'Connexion réussie';
} catch (PDOException $erreur) {
    echo 'Erreur : ' . $erreur->getMessage();
}

if ($_POST['id']) {
    $request = $pdo->prepare("DELETE FROM users where id=:id");
    $request->bindParam(':id', $_POST['id']);
    $request->execute();
    header("Location: ". $_SERVER['HTTP_REFERER']);
    exit;
    
}
?>