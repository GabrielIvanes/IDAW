<?php 
require_once(__DIR__.'/../connectDb.php');

if ($_POST['id']) {
    $request = $pdo->prepare("DELETE FROM users where id=:id");
    $request->bindParam(':id', $_POST['id']);
    $request->execute();
    header("Location: ". $_SERVER['HTTP_REFERER']);
    exit;
    
}
?>