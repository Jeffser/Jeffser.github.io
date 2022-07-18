function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
var metadata = ''
function play(id){
    document.getElementById('headerText').innerHTML = '<b onclick="change(-1)" style="float: left; margin-left: 20px">&lt;</b><b id="currentTrackTitle" onclick="document.getElementById(\''+id+'\').scrollIntoView(true)">' + getRequest('https://youtube.com/oembed?url=https://www.youtube.com/watch?v='+id+'&format=json')['title'] + '</b><b onclick="change(1)" style="float: right; margin-right: 20px">&gt;</b>'
    if (document.getElementById('yt')){
        document.getElementById('yt').parentElement.parentElement.style.animation = 'deactivate 3s forwards'
        document.getElementById('yt').remove()
    }
    document.getElementById(id).style.animation = 'activate 3s forwards'
    div = document.getElementById(id).getElementsByTagName('div')[0]
    yt = document.createElement('iframe')
    yt.id = 'yt'
    yt.width = '100%'
    yt.height = '100%'
    yt.src = 'https://www.youtube.com/embed/' + id + '?controls=0&rel=0&loop=1&autoplay=1&modestbranding=0&loop=1'
    yt.style.borderWidth = 0
    yt.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media;'
    div.appendChild(yt)
}
function change(num){
    if (document.getElementById('yt')){
        if (metadata.indexOf(document.getElementById('yt').parentElement.parentElement.id) + num > -1 && metadata.indexOf(document.getElementById('yt').parentElement.parentElement.id) + num < metadata.length){
            play(metadata[metadata.indexOf(document.getElementById('yt').parentElement.parentElement.id)+num])
        }
    }
}
function start(){
    metadata = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/muse/metadata.json')
    metadata.forEach(id => {
        var videoData = getRequest('https://youtube.com/oembed?url=https://www.youtube.com/watch?v='+id+'&format=json')
        var div = document.createElement('div')
        div.id = id
        div.className = 'track'
        var img = document.createElement('div')
        img.style.backgroundImage = 'url(https://img.youtube.com/vi/'+id+'/maxresdefault.jpg)'
        img.addEventListener('click', function(){play(id)})
        div.appendChild(img)
        div.appendChild(document.createElement('br'))
        var h1 = document.createElement('h1')
        h1.innerHTML = videoData['title']
        div.appendChild(h1)
        div.appendChild(document.createElement('br'))
        var h3 = document.createElement('h3')
        if (videoData['author_name'].substr(videoData['author_name'].length - 8) == ' - Topic'){h3.innerHTML = videoData['author_name'].slice(0, videoData['author_name'].length - 8)}
        else{h3.innerHTML = videoData['author_name']}
        div.appendChild(h3)
        div.appendChild(document.createElement('br'))
        document.getElementById('main').appendChild(div)
    });
}
window.onload = start()