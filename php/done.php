<?php

$success = false;
$msg = '';

$o = json_decode($_GET['data'], true);

require_once 'connexiondb.php';

if(isset($o['id']) && isset($o['content'])){
    $id = htmlspecialchars($o['id']);
    $content = htmlspecialchars($o['content']);

    try{
        $sql = 'INSERT INTO completed_tasks (task) VALUES (:task)';
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(':task', $content, PDO::PARAM_STR);
        $stmt->execute();

        try{
            $sql = 'DELETE FROM `tasks` WHERE id = :id';
            $stmt = $connection->prepare($sql);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            $success = true;
            $msg = 'Tache effectué...';
        }catch(PDOException $e){
            echo $e->getMessage();  
        }

    }catch(PDOException $e){
        echo $e->getMessage();
    }
}else{
    $msg = 'Une erreur est survenue...';
}

$data = [
    'success' => $success,
    'msg' => $msg
];


echo json_encode($data);