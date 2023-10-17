<?php 
require_once(__DIR__.'/../connectDb.php');

if ($_POST['name'] && $_POST['email'] && $_POST['id']) {
    
    $request = $pdo->prepare("UPDATE users SET name=:name, email=:email WHERE id=:id");
    $request->bindParam(':name', $_POST['name']);
    $request->bindParam(':email', $_POST['email']);
    $request->bindParam(':id', $_POST['id']);
    $request->execute();
    
    header("Location: " . $_SERVER['HTTP_REFERER']);
    exit;
}

?>