function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
function start(){
    lyrics = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/hello/data.json')
    lyrics.forEach(elm => {
        setTimeout(function(){
            document.getElementById('text').innerHTML = elm[1]
        }, elm[0] * 1000);
    });
}
window.onload = start()
