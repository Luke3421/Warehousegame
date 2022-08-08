<?php session_start(); print("==".$_SESSION['tag']."=="); ?>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="styles.css">
        <title>Puzzle List</title>
    </head>
    <body>
        <h1> Warehouse Puzzles </h1>
        <div> <h2 style =' text-align: center'>
            <?php $tag = isset($_SESSION["tag"]) ? $_SESSION['tag'] : "guest"; print $tag; ?>
        </h2>
        </div> 
        <nav>
            <?php print("<a href = 'signup.php'> Register </a><br> <a href = 'signin.php'> Sign in </a>"); ?>
        </nav>
        <ul>
         
        <?php
            require('dblogin.php'); //download or copy: defines $db_host,...,$db_name
            $con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
            if(!$con){
                die("could not connect to db: <br />".mysqli_error($con));
             }
             
            $q = "SELECT * FROM `puzzles`";
            $result = mysqli_query($con, $q);
            if(!$result){
                die("could not connect to db: <br />".mysqli_error($con));
            }
            while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
                $puz =$row['puzname'];
                $nm  = $row['name'];
                $sc  = $row['score'];
                $seed = $row['seedlev'];
                print "<li> <a href = 'index.html?seed=$seed'> $puz </a> = = = $nm = = = $sc </li>";
            }
            
        
        ?>
    </ul>

    </body>
</html>
