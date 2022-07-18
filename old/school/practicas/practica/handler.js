metadata = ''

function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}

function download(){
    var text = '<body>\n<script src="https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/school/practicas/practica/extras.js"></script><script>\n' + metadata['script'] + '\n</script>\n' + metadata['elements'] + '\n<div class="richAlert"><p onclick="richAlertHide()"></p></div>\n</body>'
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'code.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


function getPractice(doc, sec, prc){
    metadata = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/school/practicas/metadata.json')[doc][sec][prc]
    document.getElementById('instructions').innerHTML = '<h2>Instrucciones</h2>' + '<b>Documento: ' + String(doc + 1) + ' Sector: '+ String(sec + 1) +' Practica: '+ String(prc + 1) +'</b><br>' + String(metadata['instructions']).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
    document.getElementById('code').innerHTML = '<h2>Codigo</h2>' + String(metadata['script']).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>') + '<br><input type="button" value="Descargar codigo completo" onclick="download()">'
    document.getElementsByClassName('practice')[0].innerHTML = '<h2>Practica</h2>' + metadata['elements']
    document.getElementById('customScript').innerHTML = metadata['script']
} 

function load(){
    if (new URLSearchParams(window.location.search).has('doc') && new URLSearchParams(window.location.search).has('sec') && new URLSearchParams(window.location.search).has('prc')){getPractice(parseInt(new URLSearchParams(window.location.search).get('doc'))-1, parseInt(new URLSearchParams(window.location.search).get('sec'))-1, parseInt(new URLSearchParams(window.location.search).get('prc'))-1)}
    else{
        alert('Error de parametros')
        window.location.href='../'
    }
}
window.onload = load()
