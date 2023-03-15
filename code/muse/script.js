id = null;

function showSong(id, hue = 0){
    if (hue == 0) hue = Math.floor(Math.random()*358);
    $(':root').get(0).style.setProperty('--color-hue', hue);
    $.getJSON('http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=' + id + '&format=json', function(data){
        $('#title').html('<a style="text-decoration: none;" href="https://music.youtube.com/watch?v=' + id + '">' + data['title'] + '</a>');
        $('#author').html('<a style="text-decoration: none;" href="' + data['author_url'].replace('www.', 'music.') + '">' + data['author_name'].replace(' - Topic', '') + '</a>');
        $('#youtube-container').css('background-image', 'url(https://i3.ytimg.com/vi/' + id + '/maxresdefault.jpg)')
        $("#youtube-container").mousedown(function(){$('#youtube-container').html('<iframe autoplay width="100%" height="100%" src="https://www.youtube.com/embed/' + id + '?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');});
    });
}

$(window).on('load', function(){
    search = new URL(window.location.href).searchParams;
    if (search.has('id')){
        if (search.has('hue')) showSong(search.get('id'), search.get('hue'));
        else showSong(search.get('id'));
    }
    else{
        $.getJSON('data.json', function(data){
            song = data[Math.floor(Math.random()*data.length)];
            showSong(song['id'], song['hue']);
        });
    }
});