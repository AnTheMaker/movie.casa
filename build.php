<?php
$start_time = microtime(true);

include_once __DIR__.'/functions.php';

// copy the content of the /static/ folder into the output directory
copy_dir(__DIR__.'/static', __DIR__.'/dist');

// do stuff

$time_elapsed = round((microtime(true) - $start_time), 6); // execution time in seconds
echo 'OK - Site built successfully in '.$time_elapsed.'s'.PHP_EOL;
exit;
