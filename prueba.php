<?php
    $md5 = password_hash ("pastor2020++" ,PASSWORD_DEFAULT, ['cost' => 12]);

    echo $md5;
?>