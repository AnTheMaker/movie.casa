<?php
$start_time = microtime(true);

// do stuff

$time_elapsed = microtime(true)-$start; // execution time in seconds
echo 'OK - Site built successfully in '.$time_elapsed.'s'.PHP_EOL;
exit;
