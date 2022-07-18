function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
var docOpen = ''
var secOpen = ''
function alternate(id){
    var element = document.getElementById(id)
    if (element.style.display == 'none'){
        element.style.display = 'block'
        console.log(id[0])
        if (id[0]=='d'){
            if (docOpen != ''){document.getElementById(docOpen).style.display = 'none'}
            docOpen = id
        } else {
            if (secOpen != ''){document.getElementById(secOpen).style.display = 'none'}
            secOpen = id
        }
    }
    else {
        element.style.display = 'none'
        if (id[0]=='d'){docOpen = ''} else {secOpen = ''}
    }
}

function start(){
    var metadata = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/school/practicas/metadata.json')
    result = '<h2>Practicas</h2>'
    for (doc = 0; doc<metadata.length; doc++){
        result += '<input type="button" value="Documento '+(doc + 1)+'" onclick="alternate(\'d'+(doc + 1)+'\')" class="docButton">\n'
        result += '<section class="document" id="d'+(doc + 1)+'" style="display: none;">'
        for (sec = 0; sec<metadata[doc].length; sec++){
            result += '<input type="button" value="Sector '+(sec + 1)+'" onclick="alternate(\'s'+(sec + 1)+'d'+(doc + 1)+'\')" class="secButton">\n'
            result += '<section class="section" id="s'+(sec + 1)+'d'+(doc + 1)+'" style="display: none;">'
                for (prc = 0; prc<metadata[doc][sec].length; prc++){
                    result += '<input type="button" value="Practica '+(prc + 1)+'" onclick="window.location.href=\'practica?doc='+(doc + 1)+'&sec='+(sec + 1)+'&prc='+(prc + 1)+'\'" class="prcButton">\n'
                }
            result += '</section><br>'
        }
        result += '</section><br>'
    }
    document.getElementsByClassName('practices')[0].innerHTML = result
}

window.onload = start()
