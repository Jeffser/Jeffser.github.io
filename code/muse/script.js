id = null;
$(window).on('load', function(){
    $.getJSON('data.json', function(data){
        song = data[Math.floor(Math.random()*data.length)];
        $(':root').get(0).style.setProperty('--color-hue', song['hue']);
        $('#title').html('<a style="text-decoration: none;" href="https://music.youtube.com/watch?v=' + song['id'] + '">' + song['title'] + '</a>');
        $('#author').html('<a style="text-decoration: none;" href="https://music.youtube.com/channel/' + song['author_id'] + '">' + song['author'] + '</a>');
        $('#youtube-container').css('background-image', 'url(https://i3.ytimg.com/vi/' + song['id'] + '/maxresdefault.jpg)')
        id = song['id'];
        $("#youtube-container").mousedown(function(){$('#youtube-container').html('<iframe autoplay width="100%" height="100%" src="https://www.youtube.com/embed/' + id + '?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');});
    });
});