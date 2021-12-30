<?php
$start_time = microtime(true);

include_once __DIR__.'/functions.php';

// copy the content of the /static/ folder into the output directory
copy_dir(__DIR__.'/static', $output_dir);

// do stuff

$movie_data = getPopularMovies();
$save_data = [
  'time' => time(),
  'source' => 'https://developers.themoviedb.org/',
  'movies' => []
];
foreach($movie_data['results'] as $movie){
  $save_data['movies'][] = [
    'id' => $movie['id'],
    'title' => $movie['title'],
    'description' => $movie['overview'],
    'release_date' => $movie['release_date'],
    'popularity' => $movie['popularity'],
    'votes' => [
      'avg' => $movie['vote_average'],
      'count' => $movie['vote_count']
    ],
    'images' => [
      'backdrop' => $movie['backdrop_path'],
      'poster' => $movie['poster_path']
    ],

  ];
}
saveFile($output_dir.'/data.json', json_encode($save_data));

$html = file_get_contents($output_dir.'/index.html');
$data = json_encode($save_data);
$data = addslashes($data); // escape quotes
$html = preg_replace('/{{\s*data\s*}}/', $data, $html);
$html = preg_replace('/{{\s*base\s*}}/', $base, $html); // set base URL
saveFile($output_dir.'/index.html', $html);

$time_elapsed = round((microtime(true) - $start_time), 6); // execution time in seconds
echo 'OK - Site built successfully in '.$time_elapsed.'s'.PHP_EOL;
exit;
