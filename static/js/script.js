// our js will go here

$(function(){
  var data = JSON.parse(json_data);
  if(data.time > 0){
    var html = '';
    var more_movies_html = '';
    var i = 0;
    $.each(data.movies, function(key, movie){
      i++;
      var title = htmlencode(movie.title);
      var desc = htmlencode(movie.description);
      if(i == 1){
        var poster = 'https://images.weserv.nl/?url='+encodeURIComponent('https://image.tmdb.org/t/p/w342/'+movie.images.poster);
        html += '<div class="row top-movie">';
          html += '<div class="col">';
            html += '<img class="poster" src="'+poster+'" alt="Poster of '+title+'" loading="lazy">';
          html += '</div>';
          html += '<div class="col">';
            html += '<h3 class="special"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/></svg> Trending movie</h3>';
            html += '<h2>'+title+'</h2>';
            html += '<p>'+desc+'</p>';
            html += '<p><svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg> '+movie.votes.avg+'/10</p>';
            html += '<p><a href="https://www.themoviedb.org/movie/'+movie.id+'" target="_blank"><button class="watch">Watch Now</button></a></p>';
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
    html += '<h2 class="special">More movies</h2>';
    html += '<div class="more-movies">'+more_movies_html+'</div>'
    $('#content').html(html);
  }
});


// escape html (https://stackoverflow.com/a/13371349)
function htmlencode(text){
  return text.replace(/[\"&<>]/g, function(str){
    return { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' }[str];
  });
}
