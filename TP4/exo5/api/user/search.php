<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once("../../../config.php");

require_once($ROOT_API.'database.php');
require_once($ROOT_API.'api\\objects\\user.php');
  
$database = new Database();
$db = $database->getConnection();
  
$user = new User($db);

$keyword=isset($_GET["name"]) ? $_GET["name"] : "";
  
$stmt = $user->search($keyword);
$num = $stmt->rowCount();
  
if($num > 0){
  
    $users_arr=array();
    $users_arr["records"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
  
        $user_item = array(
            
            "id" => $id,
            "name" => $name,
            "email" => $email,
        );
  
        array_push($users_arr["records"], $user_item);
    }
  
    http_response_code(200);
  
    echo json_encode($users_arr);
}
  
else{
    http_response_code(404);
  
    echo json_encode(
        array("message" => "No users found.")
    );
}
?>