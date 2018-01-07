<?php
 header("Access-Control-Allow-Origin: *");
    $root = realpath($_SERVER["DOCUMENT_ROOT"]);
    include($root.'/app/models/bookmarks.php');  
    header('Content-Type: application/json; charset=UTF-8');
    if($_POST['action']=='add'){
        $params_array['name']=$_POST['name'];
        $params_array['link']=$_POST['link'];
        $params_array['description']=$_POST['description'];
        $params_array['categoryid']=$_POST['categoryid'];
        addBookmark($db_connect,$params_array);
    }
    else if($_POST['action']=='edit'){
        $params_array['id']=$_POST['id'];
        $params_array['name']=$_POST['name'];
        $params_array['link']=$_POST['link']; 
        $params_array['description']=$_POST['description'];
        $params_array['categoryid']=$_POST['categoryid'];
        updateBookmark($db_connect,$params_array);
    }
    else if($_POST['action']=='delete'){
        $params_array['id']=$_POST['id'];
        deleteBookmark($db_connect,$params_array['id']);
    }
    
    $tarifs=array();
    $result=getAllBookmarks($db_connect);
    while($row = mysqli_fetch_assoc($result))
    {
        array_push($tarifs, $row);
        
    }
    
$array = array("bookmarks" => $tarifs);
$result_json=json_encode($array);
print_r($result_json);
?>