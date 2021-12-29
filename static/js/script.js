// our js will go here


$.getJSON('data.json', function(data){
  var html = '';
  var i = 0;
  $.each(data.movies, function(key, movie){
    i++;
    var title = htmlencode(movie.title);
    var poster = 'https://images.weserv.nl/?url='+encodeURIComponent('https://image.tmdb.org/t/p/w342/'+movie.images.poster)
    var backdrop = 'https://images.weserv.nl/?darken=5&url='+encodeURIComponent('https://image.tmdb.org/t/p/w342/'+movie.images.backfrop)
    html += '<img class="poster" src="'+poster+'" alt="Poster of '+title+'" loading="lazy"><br>';
  });
  $('#data').html(html);
});


// escape html (https://stackoverflow.com/a/13371349)
function htmlencode(text){
  return text.replace(/[\"&<>]/g, function(str){
    return { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' }[str];
  });
}
