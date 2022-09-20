<?php

require_once 'connexiondb.php';

try{
    $sql = 'SELECT * FROM tasks';
    $stmt = $connection->query($sql);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
}catch(PDOException $e){
    echo $e->getMessage();
}

echo json_encode($tasks);