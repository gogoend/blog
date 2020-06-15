<?php
    $someVal = rand(1,2000);
    header('Content-type: application/json');
    echo "{someVal:$someVal}";