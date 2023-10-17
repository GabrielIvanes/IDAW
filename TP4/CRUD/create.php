<?php 
require_once(__DIR__.'/../connectDb.php');

if ($_POST['name'] && $_POST['email']) {
    
    $request = $pdo->prepare("INSERT INTO users(name, email) VALUES(:name, :email)");
    $request->bindParam(':name', $_POST['name']);
    $request->bindParam(':email', $_POST['email']);
    $request->execute();
    header("Location: ". $_SERVER['HTTP_REFERER']);
    exit;
    
}
?>