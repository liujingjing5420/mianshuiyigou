<?php
require "conn.php";
$conn->query("SET NAMES UTF8");

if(isset($_GET['id'])){
    $picid=$_GET['id'];
    $result=$conn->query("select * from piclist where picid='$picid'");
    echo json_encode($result->fetch_assoc());
}else{
    echo "非法操作";
}