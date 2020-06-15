<?php
    $callback = $_GET['callback'];
    $someVal = rand(1,2000);
    header('Content-type: application/javascript');
    echo "$callback({someVal:$someVal})";