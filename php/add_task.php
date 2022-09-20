<?php

require_once 'connexiondb.php';

$success = false;
$msg = '';

if(isset($_POST['task']) && !empty($_POST['task'])){

    $task = htmlspecialchars($_POST['task']);
   
    try{
        $sql = 'INSERT INTO tasks (task) VALUES (:task)';
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(':task', $task, PDO::PARAM_STR);
        $stmt->execute();
    
        $success = true;
        $msg = 'Tâche bien enregistré';
    }catch(PDOException $e){
        echo $e->getMessage();
    }

}else{
    $msg = 'Veuillez entrez une tâche';
}

$data = [
    'success' => $success,
    'msg' => $msg
];

echo json_encode($data);