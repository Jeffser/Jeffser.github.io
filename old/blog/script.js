function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
var data = null
function refreshContent(){
    var num = Object.keys(data).length - document.getElementById('entry').value
    document.getElementsByClassName('widget')[0].id = num
    document.getElementById('title').innerHTML = data[num]['title']
    document.getElementById('date').innerHTML = data[num]['date']
    document.getElementById('content').innerHTML = data[num]['content']
    document.getElementById('id').innerHTML = 'ID: ' + num
}
function changeEntry(num){
    entry = parseInt(document.getElementById("entry").value) + num
    if (entry > 0){
        if (entry < Object.keys(data).length){document.getElementById("entry").value = entry}
        else{document.getElementById("entry").value = 1}
    }
    else{document.getElementById("entry").value = Object.keys(data).length - 1}
    refreshContent()
}
function refreshData(){
    data = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/blog/blog.json')
    if ((new URLSearchParams(window.location.search)).has('id')){document.getElementById('entry').value = Object.keys(data).length - parseInt(new URLSearchParams(window.location.search).get('id'))}
    refreshContent()
}
window.onload = refreshData()