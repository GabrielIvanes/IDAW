<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Users</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css">
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <?php

    // require_once('./exo3/init_db.php');
    require_once('./config.php');

    $isUpdatingUser = false;
    $updatingId = -1;
    $updatingUser = "";
    $updatingEmail = "";

    if (isset($_POST['id']) && isset($_POST['name']) && isset($_POST['email'])) {
        
        $isUpdatingUser = true;
        $updatingId = $_POST['id'];
        $updatingUser = $_POST['name'];
        $updatingEmail = $_POST['email'];
       
    }

    require_once(__DIR__.'/connectDb.php');

    $request = $pdo->prepare("select * from users");
    $request->execute();

    $users = $request->fetchAll(PDO::FETCH_ASSOC);

    echo "<table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>";

        foreach($users as $user) {
            echo "<tr>";
            echo "<td>" . $user['id'] . "</td>";
            echo "<td>" . $user['name'] . "</td>";
            echo "<td>" . $user['email'] . "</td>";
            echo "<td><form method='PUT' action='users.php' id='update'><input name='id' type='hidden' value='".$user['id']."' /><input name='name' type='hidden' value='".$user['name']."' /><input name='email' type='hidden' value='".$user['email']."' /><button type='submit'><i class='fas fa-pen-to-square icon'></i></button></form></td>";
            echo "<td><form method='DELETE' action='./CRUD/delete.php' id='delete'><input name='id' type='hidden' value='".$user['id']."' /><button type='submit'><i class='fas fa-trash icon'></i></button></form></td>";
            echo "</tr>";

        }


        echo "</tbody>
        </table>";

        echo '<br/><form action="' . (!$isUpdatingUser ? "./CRUD/create.php" : "./CRUD/update.php") . '" method="POST" id="user">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="' . ($isUpdatingUser ? $updatingUser : "").'" required ><br><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="' . ($isUpdatingUser ? $updatingEmail : "").'" required><br><br>';

        if ($isUpdatingUser) {
            echo '<input name="id" type="hidden" value="' . $updatingId . '"/>';
        }

        echo '<input type="submit" value="' . (!$isUpdatingUser ? "Add" : "Update") . '">
        </form>';


    $pdo = null;

    ?>
</body>

</html>