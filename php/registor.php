<?php
require "conn.php";

$conn->query("SET NAMES UTF8");

if(isset($_GET['name'])){
    $username=$_GET['name'];
    $result=$conn->query("select * from usertable where username='$username'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}else{
    echo  "非法操作";
}

if(isset($_POST['registorname'])&&isset($_POST['registorpass'])){
    $registorname=$_POST['registorname'];
    $registorpass=sha1($_POST['registorpass']);
    $conn->query("insert usertable values(null,'$registorname','$registorpass',NOW())");
}