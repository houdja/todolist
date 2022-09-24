<?php
require_once 'connexiondb.php';

$success = false;
$msg = '';

if(isset($_GET['id']) && !empty($_GET['id'])){
    $id = $_GET['id'];
    $sql = 'DELETE FROM completed_tasks WHERE id = :id';
    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $success = true;
    $msg = 'Suppression éffectué';
}else{
    $msg = 'ERREUR survenue';
}

$data = [
    'success' => $success,
    'msg' => $msg
];

echo json_encode($data);