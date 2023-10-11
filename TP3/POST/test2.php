<!DOCTYPE html>
<html lang="fr">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <?php 
    session_start();
echo isset($_SESSION['login']) ? '<h1>Bienvenue ' .$_SESSION['login'].' !</h1>' :'<h1>Utilisateur non connecté !</h1>';
    require_once('nav.php');
    ?>

    <form action="login.php" method="post">
        <input type="submit" value="Se déconnecter" />
    </form>

</body>

</html>