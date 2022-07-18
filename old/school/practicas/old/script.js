function practica1(){

    var annos = parseInt(document.getElementById('1').getElementsByClassName('annos')[0].value)
    var sueldo = parseInt(document.getElementById('1').getElementsByClassName('sueldo')[0].value)
    //caso A
    if (sueldo < 500 && annos >= 10){
        //20
        document.getElementById('1').getElementsByClassName('resultado')[0].innerHTML = 'Total: ' + sueldo * 1.2
        //document.getElementById('resultado1').innerHTML
    }
    if (sueldo < 500 && annos < 10){
        //5
        document.getElementById('1').getElementsByClassName('resultado')[0].innerHTML = 'Total: ' + sueldo * 1.05
    }
    if (sueldo >= 500){
        //0
        document.getElementById('1').getElementsByClassName('resultado')[0].innerHTML = 'Total: ' + sueldo
    }
}

function practica2(){
    for(var i = 0; i < 20; i++){
        document.getElementById('2').getElementsByClassName('resultado')[0].innerHTML += i * 5 + ', '
    }
}

function practica3(){
    var cantCensadas = 0
    var cantHombres = 0
    var cantMujeres = 0
    var cantEdad = 0
    do{
        var cedula = prompt('Ingrese Cedula (0 para terminar):', '')
        var edad = prompt('Ingrese edad:', '')
        var sexo = prompt('Ingrese sexo (h/m):', '')
        if (parseInt(cedula) > 0)
        {
            cantCensadas += 1
            if (sexo = 'h'){cantHombres += 1}
            else {cantMujeres += 1}
            if (edad > 16 && edad < 65) {cantEdad += 1}
        }
    } while(cedula != '0')
    document.getElementById('3').getElementsByClassName('resultado')[0].innerHTML = 'Censados: '+cantCensadas+' Hombres: '+cantHombres+' Mujeres: '+cantMujeres+' Entre 16 y 65 años: '+cantEdad
}

function practica4(){
    var turnos = {'mannana': [14, 15, 21, 12, 32], 'tarde': [12, 11, 13, 14, 12, 17], 'noche': [21, 32, 12, 32, 15, 17, 16, 15, 14, 16, 12]}
    var promedios = {'mannana': 0, 'tarde': 0, 'noche': 0}
    promedios['mannana'].forEach(num => {promedios['mannana']+=num})
    promedios['tarde'].forEach(num => {promedios['tarde']+=num})
    promedios['noche'].forEach(num => {promedios['noche']+=num})
    promedios['mannana'] /= 5
    promedios['tarde'] /= 6
    promedios['noche'] /= 11
    if (promedios['mannana'] > promedios['tarde'] && promedios['mannana'] > promedios['noche']){
        alert('Mannana mayor')
    }
    else{
        if (promedios['tarde'] > promedios['noche']){
            alert('Tarde mayor')
        }
        else{
            alert('Noche mayor')
        }
    }
}

function practica5(){
    num1 = document.getElementById('5').getElementsByClassName('n1')[0].value
    num2 = document.getElementById('5').getElementsByClassName('n2')[0].value
    num3 = document.getElementById('5').getElementsByClassName('n3')[0].value
    if (num1<num2 && num1<num3){document.getElementById('5').getElementsByClassName('resultado')[0].innerHTML  = "Menor: num1("+num1+")"}
    else {if (num2<num1 && num2<num3){document.getElementById('5').getElementsByClassName('resultado')[0].innerHTML = "Menor: num2("+num2+")"}
    else {if (num3<num1 && num3<num2){document.getElementById('5').getElementsByClassName('resultado')[0].innerHTML = "Menor: num3("+num3+")"}}}
}

function practica6(){
    lado = document.getElementById('6').getElementsByClassName('lado')[0].value
    document.getElementById('6').getElementsByClassName('resultado')[0].innerHTML = (lado * lado)
}
function practica7(){
    var precio = document.getElementById('7').getElementsByClassName('tipo')[0].value
    var cantidad = document.getElementById('7').getElementsByClassName('cantidad')[0].value
    document.getElementById('7').getElementsByClassName('resultado')[0].value = precio * cantidad
}
function practica8Focus(control){
    control.style.backgroundColor = 'white'
    if (control.value!=''){control.value=''}
}
function practica8Blur(control){
    if (control.value==''){alert('Debe ingresar datos')}
}
function practica8(){
    if (document.getElementById('8').getElementsByClassName('email')[0].value != 'test@gmail.com'){
        document.getElementById('8').getElementsByClassName('email')[0].value = ''
        document.getElementById('8').getElementsByClassName('email')[0].style.backgroundColor = 'red'
    }
    if (document.getElementById('8').getElementsByClassName('pass')[0].value != '1234'){
        document.getElementById('8').getElementsByClassName('pass')[0].value = ''
        document.getElementById('8').getElementsByClassName('pass')[0].style.backgroundColor = 'red'
    }
    if (document.getElementById('8').getElementsByClassName('email')[0].value == 'test@gmail.com' && document.getElementById('8').getElementsByClassName('pass')[0].value == '1234'){alert('Datos correctos')}
}
function suma(){
    this.n1 = 0
    this.n2 = 0
}
function setNum(num, val){
    if (num==1){this.n1 = val}
    if (num==2){this.n2 = val}
}
function returnSuma(){return this.n1 + this.n2}
function practica9(){
    operacion = new suma()
    setNum(1, parseInt(document.getElementById('9').getElementsByClassName('n1')[0].value))
    setNum(2, parseInt(document.getElementById('9').getElementsByClassName('n2')[0].value))
    alert(returnSuma())
}

function practica10(){
    var vector = [8]
    var suma1 = 0
    var suma2 = 0
    var suma3 = 0
    for (i = 0; i<8; i++){
        vector[i] = parseInt(prompt('Ingrese valor #'+(i+1)))
        suma1 += vector[i]
        if (vector[i]>36){suma2+=vector[i]}
        if (vector[i]>50){suma3+=1}
    }
    alert('Valor total: '+suma1)
    alert('Valor total de mayores a 36: '+suma2)
    alert('Cantidad de valores mayores a 50: '+suma3)
}

function practica11(){
    var vector1 = []
    var vector2 = []
    var vector3 = []
    cantidad = parseInt(prompt('Cantidad de sumas'))
    for (i=0; i<cantidad; i++){
        alert('Suma #'+(i+1))
        vector1.push(parseInt(prompt('Ingrese el primer valor')))
        vector2.push(parseInt(prompt('Ingrese el segundo valor')))
        vector3.push(vector1[i] + vector2[i])
    }
    alert('Respuestas bajo el boton en orden')
    vector3.forEach(resultado => document.getElementById('11').getElementsByClassName('resultado')[0].innerHTML += resultado+'<br>')
}

function practica12(){
    document.getElementById('12').getElementsByClassName('n')[0].value = Math.pow(parseInt(document.getElementById('12').getElementsByClassName('n')[0].value), 3)
}

function practica13(){
    document.getElementById('13').getElementsByClassName('n')[0].value = Math.sqrt(parseInt(document.getElementById('13').getElementsByClassName('n')[0].value))
}
