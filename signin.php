<?php session_start(); ?>

<?php


function dieWithMsg($msg){
    print "==$msg=="; header ("Refresh: 5, puzzlelist.php"); die();
}
function creds (){
    require('validate.php');
    $pass = $_POST['passwd']; $em = $_POST['email'];
 if(!validPass($pass) || !validEmail($em)) {
        dieWithMsg("Bad Input");
    }

    require('dblogin.php');
    
    $con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
    if(!$con){die("could not connect to db: <br />");}
    
    
    $query = "SELECT `email`, `tag`, `password` 
        FROM `users`
        WHERE `email` = `$em`
        LIMIT 1";
    $result = mysqli_query($con, $query);
    if(!$result){die("could not query the database: <br />".mysqli_error($con));}
    
    if(mysqli_num_rows($result) != 1 || !password_verify($pass, $row['password'])){dieWithMsg("Bad Credentials");}
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    session_regenerate_id();
    
    $_SESSION['tag'] = $row['tag'];
    $_SESSION['email'] = $row['email'];
    dieWithMsg("Successful Log In ". $_SESSION['tag']);
}
if(count($_POST)>0){creds();}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Sign In</title>
    </head>
    <body>
        <a href ='puzzlelist.php'> Home </a><br>
        
        <form id = "login" action ="signin.php" methods ="post"> <h1>
                <label for="email"> E Mail: </label>
                <input type="text" id ="email" name="email"/> <br>
                <label for ="password"> Password: </label>
                <input type ="password" id ="password" name ="passwd"/> <br>
                <br> <input type ="submit">
            </h1></form>

    </body>
</html>

  
           

