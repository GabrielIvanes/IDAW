<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php echo '<link href="'.(isset($_COOKIE['style']) ? $_COOKIE['style'] : 'style1').'.css" rel="stylesheet" />' ?>
    <title>Formulaire</title>
</head>



<body>
    <?php 
    session_start();
    session_unset();
session_destroy(); 
?>

    <form id="login_form" action="connected.php" method="POST">
        <table>
            <tr>
                <th>Login :</th>
                <td><input type="text" name="login"></td>
            </tr>
            <tr>
                <th>Mot de passe :</th>
                <td><input type="password" name="password"></td>
            </tr>
            <tr>
                <th></th>
                <td><input type="submit" value="Se connecter..." /></td>
            </tr>
        </table>
    </form>
</body>

</html>