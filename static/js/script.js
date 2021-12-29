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
            html += '<p><svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg> '+movie.votes.avg+'/10</p>';
            html += '<a href="https://www.themoviedb.org/movie/'+movie.id+'" target="_blank"><button class="watch">Watch Now</button></a>';
          html += '</div>';
        html += '</div>';
      }else{
        var poster = 'https://images.weserv.nl/?url='+encodeURIComponent('https://image.tmdb.org/t/p/w154/'+movie.images.poster);
        more_movies_html += '<div class="movie-element">';
          more_movies_html += '<img class="poster" src="'+poster+'" alt="Poster of '+title+'" loading="lazy">';
          more_movies_html += '<p>'+title+'</p>';
        more_movies_html += '</div>';
      }
    });
    html += '<h2>More movies</h2>';
    html += '<div class="more-movies">'+more_movies_html+'</div>'
    $('#content').html(html);
  });
});


// escape html (https://stackoverflow.com/a/13371349)
function htmlencode(text){
  return text.replace(/[\"&<>]/g, function(str){
    return { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' }[str];
  });
}
