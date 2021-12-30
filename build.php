<?php
$start_time = microtime(true);

include_once __DIR__.'/functions.php';

// copy the content of the /static/ folder into the output directory
copy_dir(__DIR__.'/static', $output_dir);

// do stuff

$movie_ids = [];
$popular_data = getPopularMovies();
$popular_movies = [
  'time' => time(),
  'source' => 'https://developers.themoviedb.org/',
  'movies' => []
];
foreach($popular_data['results'] as $movie){
  if(!in_array($movie['id'], $movie_ids)){ // prevent duplicates
    $movie_ids[] = $movie['id'];
    $popular_movies['movies'][] = [
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
      ]
    ];
  }
}
$upcoming_data = getUpcomingMovies();
$upcoming_movies = [
  'time' => time(),
  'source' => 'https://developers.themoviedb.org/',
  'movies' => []
];
foreach($upcoming_data['results'] as $movie){
  if(!in_array($movie['id'], $movie_ids)){ // prevent duplicates
    $movie_ids[] = $movie['id'];
    $upcoming_movies['movies'][] = [
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
      ]
    ];
  }
}

$html = file_get_contents($output_dir.'/index.html');
$data = addslashes(json_encode($popular_movies));
$html = preg_replace('/{{\s*popular_data\s*}}/', addslashes(json_encode($popular_movies)), $html);
$html = preg_replace('/{{\s*upcoming_data\s*}}/', addslashes(json_encode($upcoming_movies)), $html);
$html = preg_replace('/{{\s*base\s*}}/', $base, $html); // set base URL
saveFile($output_dir.'/index.html', $html);

$time_elapsed = round((microtime(true) - $start_time), 6); // execution time in seconds
echo 'OK - Site built successfully in '.$time_elapsed.'s'.PHP_EOL;
exit;
