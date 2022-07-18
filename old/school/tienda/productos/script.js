function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
var metadata = ''
function load(){
    metadata = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/school/tienda/productos/productos.json')
    var data = ''
    for (i=0;i<metadata.length;i++){
        data += '<div id="producto" onclick="change('+i+')">'
        data += '<img src="imagenes/'+metadata[i]['nombre']+'.png" alt="'+metadata[i]['nombre']+'"><br>'
        data += '<b>'+metadata[i]['nombre']+'</b><br>'
        data += metadata[i]['precio']
        data += '</div>'
    }
    document.getElementById('lista').innerHTML = data
}
function change(id){
    document.getElementById('nombre').innerHTML = metadata[id]['nombre']
    document.getElementById('marca'),innerHTML = 'Marca: ' + metadata[id]['marca']
    document.getElementById('desc').innerHTML = 'Descripción: ' + metadata[id]['descripcion']
    document.getElementById('precio').innerHTML = 'Precio: ' + metadata[id]['precio']
    document.getElementById('medio').innerHTML = 'Medio de compra: ' + metadata[id]['medios']
    document.getElementById('pago').innerHTML = 'Pago: ' + metadata[id]['pagos']
    document.getElementById('envio').innerHTML = 'Envío: ' + metadata[id]['envio']
    document.getElementById('descripcion').getElementsByTagName('img')[0].src = 'imagenes/'+metadata[id]['nombre']+'.png'
    document.getElementById('descripcion').getElementsByTagName('img')[0].alt = metadata[id]['nombre']
}
window.onload = load()