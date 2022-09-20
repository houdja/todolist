<?php
/* Connexion à une base MySQL avec l'invocation de pilote */
try{

    $dsn = 'mysql:dbname=todolist1;host=127.0.0.1';
    $user = 'root';
    $password = '';
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_CASE => PDO::CASE_NATURAL
    ];

    $connection = new PDO($dsn, $user, $password, $options);
}catch(PDOException $e){
    echo $e->getMessage();
}


?>