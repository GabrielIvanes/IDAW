<?php
session_start();
$users = array(
'riri' => 'fifi',
'yoda' => 'maitrejedi' );

$login = "anonymous";

$errorText = "";

$successfullyLogged = false;

if($_POST['login'] && $_POST['password']) {

    $tryLogin=$_POST['login'];
    $tryPwd=$_POST['password'];

    // si login existe et password correspond
    if( array_key_exists($tryLogin,$users) && $users[$tryLogin] == $tryPwd ) {
        
        $successfullyLogged = true;
        $login = $tryLogin;
        $_SESSION["login"] = $tryLogin;
        
    } else
    
    $errorText = "Erreur de login/password";
    
} else

    $errorText = "Merci d'utiliser le formulaire de login";
    
    if(!$successfullyLogged) {
        echo $errorText;
    } else {
        
    echo "<h1>Bienvenu ".$login."</h1>";
    }
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body>
    <?php 
    require_once('nav.php');
    ?>
    <form action="login.php" method="post">
        <input type="submit" value="Se déconnecter" />
    </form>


</body>

</html>