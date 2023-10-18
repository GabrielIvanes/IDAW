<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once("../../../config.php");

require_once ($ROOT_API.'core.php');
require_once ($ROOT_API.'api/shared/utilities.php');

require_once($ROOT_API.'database.php');
require_once($ROOT_API.'api/objects/user.php');
  
$database = new Database();
$db = $database->getConnection();

$utilities = new Utilities();

$user = new User($db);
  
$stmt = $user->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();
  
if($num > 0){
  
    $users_arr = array();
    $users_arr["records"] = array();
    $users_arr["paging"] = array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
  
        $user_item = array(
            "id" => $id,
            "name" => $name,
            "email" => $email,
        );
  
        array_push($users_arr["records"], $user_item);
    }
  
    $total_rows = $user->count();
    $page_url = "{$ROOT_API}/api/user/read_paging.php?";
    $paging = $utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $users_arr["paging"] = $paging;
  
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