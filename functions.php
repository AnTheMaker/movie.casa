<?php

// variabbles
$tmdb_key = getenv('tmdb_key'); // the tmdb api key, stored as a Netlify secret

$base = getenv('url'); // set by netlify
if(!empty($base)){
  $base .= '/';
}

$output_dir = __DIR__.'/dist'; // also change in /netlify.toml


// function to recursively copy an entire directory (with all files and sub-directories) from on place to another
function copy_dir($src, $dst){
  $dir = opendir($src);
  if(!is_dir($dst)){ // destination folder does not exists, let's create it
    mkdir($dst);
  }
  while($file = readdir($dir)){ // go through all objects in the source folder
    if(($file != '.' ) && ($file != '..')){
      $src_path = $src.'/'.$file;
      $dst_path = $dst.'/'.$file;
      if(is_dir($src_path)){ // its's a folder
        copy_dir($src_path, $dst_path);
      }else{ // it's a file
        copy($src_path, $dst_path);
      }
    }
  }
  closedir($dir);
}

// really, really basic templating engine. input some html and some variables and it will replace them and
function generateHTML($html, $vars=[]){
  foreach($vars as $var->$value){
    $var = strtolower($var);
    $var = preg_quote($var, '/');
    $html = preg_replace('/{{\s*'.$var.'\s*}}/', $value, $html);
  }
  $html .= '<!-- generated: '.date("l jS \of F Y h:i:s A").' -->';
  return $html;
}

// expects a destination path and some content and it will create a file
function saveFile($path, $content){
  return file_put_contents($path, $content);
}

function getPopularMovies($page=1){
  global $tmdb_key;
  $data = file_get_contents('https://api.themoviedb.org/3/movie/popular?api_key='.urlencode($tmdb_key).'&page='.urlencode($page));
  return json_decode($data, true);
}
