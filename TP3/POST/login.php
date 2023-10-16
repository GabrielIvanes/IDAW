 <?php 
    session_start();
    session_unset();
    session_destroy(); 
    if (isset($_GET['css'])) {
        setcookie('style', $_GET['css']);
    }
    if (isset($_GET['css']) && $GET['css'] === 'style1') {
        $css = '<link rel="stylesheet" href="style1.css">';
    } else {
        $css = '<link rel="stylesheet" href="style2.css">';
}
?>

 <!DOCTYPE html>
 <html lang="fr">

 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <?php echo $css; ?>
     <title>Formulaire</title>
 </head>



 <body>


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

     <form action="index.php" method="POST">
         <input type="submit" value="Changer le style">
     </form>
 </body>

 </html>