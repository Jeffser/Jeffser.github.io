function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText);
}
var metadata
function getProduct(i){
    var services = []
    var result = '<div class="product"><h1>ERROR</h1></div>'
    metadata[i]['service'].forEach(element => {services += "<li class='service'>" + element + "</li>"});
    if (metadata[i]['type'] == 1){
        result = '<div class="product" id="' + i + '" onClick="buy(' + i + ')"><h1>' + metadata[i]['name'] + '</h1><div class="prices">'
        result += '<p class="quantity"><b>Equipos: </b>' + metadata[i]['quant'] + '</p>'
        result += '<p class="added"><b>Equipo Adicional: </b>' + metadata[i]['added'] + '</p>'
        result += '<p class="price"><b>03 Meses: </b>' + metadata[i]['price'][0] + '</p>'
        result += '<p class="price"><b>12 Meses: </b>' + metadata[i]['price'][1] + '</p>'
        result += '<p class="price"><b>24 Meses: </b>' + metadata[i]['price'][2] + '</p>'
        result += '<p class="price"><b>36 Meses: </b>' + metadata[i]['price'][3] + '</p></div>'
        result += '<div class="services">' + services + '</div></div>'
    }
    else{
        result = '<div class="product" id="' + i + '" onClick="buy(' + i + ')"><h1>' + metadata[i]['name'] + '</h1><div class="prices">'
        result += '<p class="price"><b>Precio Unico: </b>' + metadata[i]['price'][0] + '</p></div>'
        result += '<div class="services">' + services + '</div></div>'
    }
    return result
}
function updatePrice(precioBase, cant, added){
    console.log(parseInt(precioBase) + parseInt(cant) * parseInt(added))
    document.getElementById('precioTotal').innerHTML = 'Total: ' + parseInt(precioBase) + parseInt(cant) * parseInt(added)
}
function buy(i){
    var result = getProduct(i)
    result += '<br><div id="check"><b>Equipos Incluidos: ' + metadata[i]['quant'] + '</b><br>'
    result += '<b>Equipos Adicionales (' + metadata[i]['added'] + ' c/u): </b><input type="number" name="added" id="added" max="999" min="0" value="0" onchange="updatePrice(this.value, document.getElementById(\'added\').value"><br>'
    result += '<b>Plan: </b><select name="plan" id="plan" onchange="updatePrice(this.value, document.getElementById(\'added\').value, \'' + metadata[i]['added'] + '\')">'
    result += '<option value="' + metadata[i]['price'][0] + '">03 Meses</option>'
    result += '<option value="' + metadata[i]['price'][1] + '">12 Meses</option>'
    result += '<option value="' + metadata[i]['price'][2] + '">24 Meses</option>'
    result += '<option value="' + metadata[i]['price'][3] + '">36 Meses</option>'
    result += '</select><br>'
    result += '<h2 id="precioTotal">Total:</h2>'
    result += '<input type="button" value="Salir" onclick="document.getElementById(\'buy\').style.display = \'none\'" style="width: 23vmax;"><input type="button" value="Comprar" onclick="alert(document.getElementById(\'precioTotal\').innerHTML)" style="width: 23vmax;">'
    result += '</div>'
    document.getElementById('buy').innerHTML = result
    document.getElementById('buy').style.display = 'table'
}
function fetcher(type, name){
    metadata = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/cyphermain/metadata.json');
    document.getElementById('main').innerHTML = "";
    if (type!="ALL"){metadata=metadata.filter(function(a){return a['type']==type;})}
    if (name!=""){metadata=metadata.filter(function(a){return a['name'].toUpperCase().includes(name.toUpperCase())})}
    for (let i = 0; i < metadata.length; i++){document.getElementById('main').innerHTML += getProduct(i)}
}
window.onload = fetcher("ALL", "");