<?php
require "conn.php";

$conn->query('SET NAMES UTF8');

$result=$conn->query('select * from piclist');
$arr=array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}
echo json_encode($arr);