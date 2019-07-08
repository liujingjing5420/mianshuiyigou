<?php
require "conn.php";
$conn->query("SET NAMES UTF8");

if(isset($_POST['username'])&&isset($_POST['password'])){
    $name=$_POST['username'];
    $pass=sha1($_POST['password']);
    $result=$conn->query("select * from usertable where username='$name' and password='$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}else{
    echo "非法操作";
}