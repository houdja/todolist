<?php

require_once 'connexiondb.php';
$success = false;
$msg = '';

if(isset($_POST['id_task']) && !empty($_POST['id_task']) && isset($_POST['task']) && !empty($_POST['task'])){
    $task = htmlspecialchars($_POST['task']);
    $id_task = htmlspecialchars($_POST['id_task']);
    try{
        $sql = 'UPDATE tasks SET task = :task WHERE id = :id_task';
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(':task', $task, PDO::PARAM_STR);
        $stmt->bindValue(':id_task', $id_task, PDO::PARAM_INT);
        $stmt->execute();
        $success = true;
        $msg = 'Modification éffectué';
    }catch(PDOException $e){
        echo $e->getMessage();
    }
}else{
    $msg = 'Veuillez remplir le champs';
}

$data = [
    'success' => $success,
    'msg' => $msg
];

echo json_encode($data);