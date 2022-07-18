function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
var metadata = ''
var carrito = []
var ingresos = {'ventas': 0, 'credito': 0}
function load(){
    metadata = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/school/tienda/productos/productos.json')
    updateInventario()
}
function updateInventario(){
    document.getElementById('btnInventario').style.borderBottomStyle = 'solid'
    document.getElementById('btnFacturacion').style.borderBottomStyle = 'none'
    document.getElementById('btnControl').style.borderBottomStyle = 'none'
    var data = '<h2>Inventario</h2><b>Producto: </b><select id="producto" onchange="document.getElementById(\'cantidad\').value = metadata[document.getElementById(\'producto\').value][\'cantidad\']">'
    for (i=0;i<metadata.length;i++){data += '<option value="'+i+'">'+metadata[i]['nombre']+'</option>'}
    data += '</select><br><b>Cantidad: </b><input min="0" type="number" id="cantidad" value="'+metadata[0]['cantidad']+'"><br><input type="button" value="Aceptar" onclick="metadata[document.getElementById(\'producto\').value][\'cantidad\']=document.getElementById(\'cantidad\').value; alert(\'Cambios realizados exitosamente\')">'
    document.getElementById('admin').innerHTML = data
}
function addCarrito(id, cantidad){
    if (cantidad<1){alert('Se necesita un numero positivo de cantidad')}
    else if (cantidad <= metadata[id]['cantidad']){
        carrito.push({id: id, cantidad: cantidad})
        metadata[id]['cantidad'] -= cantidad
        document.getElementById('carrito').innerHTML += metadata[id]['nombre']+': ' + cantidad + ' ('+metadata[id]['precio']*cantidad+')\n'
    }
    else{alert('No hay suficiente en inventario')}
} 
function facturacionPagar(credito){
    var subtotal = 0
    for (i=0;i<carrito.length;i++){subtotal += parseInt(metadata[carrito[i]['id']]['precio']) * parseInt(carrito[i]['cantidad'])}
    document.getElementById('carrito').innerHTML = 'Subtotal: ' + subtotal + '\nCredito: ' + credito + '% (' + subtotal * (credito/100) + ')\nTotal: ' + (subtotal + subtotal * (credito/100))
    ingresos['ventas'] += subtotal
    ingresos['credito'] += subtotal * (credito/100)
}
function calcularControl(){
    var recibos = parseInt(document.getElementById('recibos').value)
    var salario = parseInt(document.getElementById('salario').value)
    var facturas = parseInt(document.getElementById('facturas').value)
    document.getElementById('total').innerHTML = 'Total: ' + (ingresos['ventas'] + ingresos['credito'] - recibos - salario - facturas)
    if ((ingresos['ventas'] + ingresos['credito'] - recibos - salario - facturas) > 0){document.getElementById('total').style.color = 'green'}
    else{document.getElementById('total').style.color = 'red'}
}
function updateControl(){
    document.getElementById('btnInventario').style.borderBottomStyle = 'none'
    document.getElementById('btnFacturacion').style.borderBottomStyle = 'none'
    document.getElementById('btnControl').style.borderBottomStyle = 'solid'
    var data = '<h2>Ingresos</h2><b>Ventas: ' + ingresos['ventas'] + '</b><br><b>Credito: ' + ingresos['credito'] + '</b><h2>Gastos</h2><b>Recibos: </b><input type="number" id="recibos" value="0" onchange="calcularControl()"><br><b>Salario: </b><input type="number" id="salario" value="0" onchange="calcularControl()"><br><b>Facturas: </b><input type="number" id="facturas" value="0" onchange="calcularControl()"><br><h2 id="total">Total: </h2>'
    document.getElementById('admin').innerHTML = data
}
function updateFacturacion(){
    document.getElementById('btnInventario').style.borderBottomStyle = 'none'
    document.getElementById('btnFacturacion').style.borderBottomStyle = 'solid'
    document.getElementById('btnControl').style.borderBottomStyle = 'none'
    var data = '<h2>Facturacion</h2><b>Producto: </b><select id="producto" onchange="document.getElementById(\'cantidad\').value = 0">'
    for (i=0;i<metadata.length;i++){data += '<option value="'+i+'">'+metadata[i]['nombre']+'</option>'}
    data += '</select><br><b>Cantidad: </b><input min="0" type="number" id="cantidad" value="0"><br><input type="button" value="Agregar" onclick="addCarrito(document.getElementById(\'producto\').value, document.getElementById(\'cantidad\').value)"><select id="pago"><option value="0">Contado</option><option value="5">Credito (+5%)</option></select><input type="button" value="Pagar" onclick="facturacionPagar(document.getElementById(\'pago\').value)"><input type="button" value="Limpiar" onclick="document.getElementById(\'carrito\').innerHTML=\'\'"><br><textarea id="carrito" cols="30" rows="5" disabled></textarea>'
    document.getElementById('admin').innerHTML = data
}
window.onload = load()