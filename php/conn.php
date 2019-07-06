<?php
header("content-type:text/html;charset=utf-8");

$conn=@new mysqli('localhost','root','','mianshuiyigou');

if($conn->connect_error){
    die("数据库连接失败".$conn->connect_error);
}