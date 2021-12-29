// our js will go here

$(function(){
  $.getJSON('data.json', function(data){
    var html = '';
    var more_movies_html = '';
    var i = 0;
    $.each(data.movies, function(key, movie){
      i++;
      var title = htmlencode(movie.title);
      var desc = htmlencode(movie.description);
      if(i == 1){
        var poster = 'https://images.weserv.nl/?url='+encodeURIComponent('https://image.tmdb.org/t/p/w342/'+movie.images.poster);
        var backdrop = 'https://images.weserv.nl/?darken=5&url='+encodeURIComponent('https://image.tmdb.org/t/p/w342/'+movie.images.backfrop);
        html += '<div class="row top-movie">';
          html += '<div class="col">';
            html += '<img class="poster" src="'+poster+'" alt="Poster of '+title+'" loading="lazy">';
          html += '</div>';
          html += '<div class="col">';
            html += '<h2>'+title+'</h2>';
            html += '<p>'+desc+'</p>';
          html += '</div>';
        html += '</div>';
      }else{
        var poster = 'https://images.weserv.nl/?url='+encodeURIComponent('https://image.tmdb.org/t/p/w185/'+movie.images.poster);
        more_movies_html += '<div class="movie-element">';
          more_movies_html += '<img class="poster" src="'+poster+'" alt="Poster of '+title+'" loading="lazy">';
          more_movies_html += '<p>'+title+'</p>';
        more_movies_html += '</div>';
      }
    });
    html += '<h2>More movies</h2>';
    html += '<div class="more-movies">'+more_movies_html+'</div>'
    $('#data').html(html);
  });
});


// escape html (https://stackoverflow.com/a/13371349)
function htmlencode(text){
  return text.replace(/[\"&<>]/g, function(str){
    return { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' }[str];
  });
}
