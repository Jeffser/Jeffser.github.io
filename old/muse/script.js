function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
var music
var childWidth
var counter
function play(id){
    var songData = getRequest('https://youtube.com/oembed?url=https://www.youtube.com/watch?v='+id+'&format=json')
    document.getElementById('playing').innerHTML = '<div id="insidePlaying"><h1>Playing: ' + songData['title'] + '</h1></div>'
    document.getElementById('playing').style.backgroundImage = 'url(' + songData['thumbnail_url'].slice(0, songData['thumbnail_url'].length - 13) + 'maxresdefault.jpg' + ')'
    document.getElementById('playing').style.opacity = "100%"
    if (document.getElementById('yt')){document.getElementById('yt').remove()}
    yt = document.createElement('iframe')
    yt.id = 'yt'
    yt.src = 'https://www.youtube.com/embed/' + id + '?controls=0&rel=0&loop=1&autoplay=1&modestbranding=0&loop=1'
    yt.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media;'
    yt.style.display = 'none'
    document.getElementById('insidePlaying').appendChild(yt)
    document.getElementById('playing').addEventListener('click', () => {document.getElementById('playing').style.display='none'; document.getElementById('yt').remove()})
}
function load(){
    music = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/old/muse/metadata.json')
    music.forEach(cSong => {
        var songData = getRequest('https://youtube.com/oembed?url=https://www.youtube.com/watch?v='+cSong+'&format=json')
        songData['author_name'] = songData['author_name'].slice(0, songData['author_name'].length - 8)
        songData['thumbnail_url'] = songData['thumbnail_url'].slice(0, songData['thumbnail_url'].length - 13) + 'maxresdefault.jpg'
        var song = document.createElement('div')
        song.className = 'song'
        song.id = cSong
        song.addEventListener('click', () => {play(song.id)})
        song.addEventListener('mouseover', () => {document.getElementById('musicTitle').innerHTML = '<div><h1>' + songData['title'] + '</h1><h2>' + songData['author_name'] + '</h2></div>'; document.getElementById('musicTitle').style.opacity='100%'; document.getElementById('musicTitle').style.backgroundImage = 'url(' + songData['thumbnail_url'] + ')'})
        song.onmousedown = (e) => {if (e.button === 1) {window.open('https://music.youtube.com/watch?v=' + song.id +'&list=PLCy_w2xSsI7GCcXDzmQa_bw80aZ_3PxTW', '_blank').focus()}}
        var image = document.createElement('div')
        image.style.backgroundImage = 'url(' + songData['thumbnail_url'] + ')'
        document.getElementById('music').appendChild(song)
        song.appendChild(image)
    });
    childWidth = document.getElementById(music[0]).offsetWidth;
    counter = music.length
    document.getElementById('music').addEventListener('mouseleave', () => {document.getElementById('musicTitle').innerHTML = ''; document.getElementById('musicTitle').style.opacity='0%'})
    setInterval(function(){document.getElementById('music').scrollBy(childWidth / 200, 0);}, 1);
    
}
window.onload = load()
//---------------
function checkEdge(event) {
    var parent = document.getElementById("music");
    if ( parent.scrollLeft == parent.scrollWidth-parent.offsetWidth ) {
        //Detected scroll to the edge of the right
        counter = ((counter+1)%(music.length+1));
        parent.appendChild(document.getElementById(music[counter+1])); 
        parent.scrollLeft -= childWidth;
    }
    
    if ( ! parent.scrollLeft ) {
        //Left edge
        counter = ((counter-1)%(music.length+1));
        if ( counter == -2 ) counter = music.length - 1;
        parent.insertBefore((document.getElementById(music[counter+2])),parent.firstChild);
        parent.scrollLeft += childWidth;
    }
}
//---------------
