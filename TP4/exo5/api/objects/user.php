<?php
class User {
    private $pdo;

    public $id;
    public $name;
    public $email;

    public function __construct($db){
        $this->pdo = $db;
    }

    function read(){
  
            $query = "select * from users";
        
            $stmt = $this->pdo->prepare($query);
        
            $stmt->execute();
    
        return $stmt;
    }   

    function create() {
        
        $query = "INSERT INTO users(name, email) VALUES(:name, :email)";

        $stmt = $this->pdo->prepare($query);

        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);

       if ($stmt->execute()) {
        return true;
    }
        return false;
    }

    function readOne(){
  
        $query = "SELECT * FROM users WHERE id=:id";
    
        $stmt = $this->pdo->prepare( $query );
    
        $stmt->bindParam(":id", $this->id);
    
        $stmt->execute();
    
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        $this->name = $row['name'];
        $this->email = $row['email'];
    }
    function update(){
  
        $query = "UPDATE users SET name = :name, email=:email WHERE id = :id";
    
        $stmt = $this->pdo->prepare($query);
    
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':id', $this->id);

        $queryIsIn = "SELECT * FROM users WHERE id = :idIsIn";
        $request = $this->pdo->prepare($queryIsIn);
        $request->bindParam(':idIsIn', $this->id);
        
        if ($request->execute() && $request->rowCount() > 0) {
            if($stmt->execute()){
                return true;
            } else{
            return false;
            }
        } else {
            return false;
        }

    }

    function delete(){
    
        $query = "DELETE FROM users WHERE id = :id";
    
        $stmt = $this->pdo->prepare($query);
    
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        $stmt->bindParam(":id", $this->id);
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function search($keyword){
  
        $query = "SELECT * FROM users WHERE name LIKE :name";
    
        $stmt = $this->pdo->prepare($query);
    
        $keyword=htmlspecialchars(strip_tags($keyword));
        $keyword = "%{$keyword}%";
    
        $stmt->bindParam(":name", $keyword);

        $stmt->execute();
  
        return $stmt;
    }
    public function readPaging($from_record_num, $records_per_page){

        $query = "SELECT * FROM users LIMIT :firstPage, :lastPage";
    
        $stmt = $this->pdo->prepare( $query );
    
        $stmt->bindParam(":numPage", $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(":numValues", $records_per_page, PDO::PARAM_INT);
    
        $stmt->execute();
    
        return $stmt;
    }

    public function count(){
        $query = "SELECT COUNT(*) as total_rows FROM users";
    
        $stmt = $this->pdo->prepare( $query );
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        return $row['total_rows'];
    }
}


?>