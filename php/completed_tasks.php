<?php 

require_once 'connexiondb.php';

$success = false;

try{
    $sql = 'SELECT * FROM completed_tasks';
    $stmt = $connection->query($sql);
    $completed_tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $success = true;
    $data = [
        'success' => $success,
        'data' => json_encode($completed_tasks)
    ];
    echo json_encode($data);
}catch(PDOException $e){
    echo $e->getMessage();
}