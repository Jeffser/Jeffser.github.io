function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
const base = getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/school/biologia/test/questions.json')
var num = 0
function refreshData(){
    document.getElementsByTagName('body')[0].innerHTML = '<header><div id="title">Biología</div></header><section><div id="question">'+base[num]['question']+'</div><div id="options"><button id="a" onclick="select('+"'a'"+')">'+base[num]['options']['a']+'</button><button id="b" onclick="select('+"'b'"+')">'+base[num]['options']['b']+'</button><br><button id="c" onclick="select('+"'c'"+')">'+base[num]['options']['c']+'</button><button id="d" onclick="select('+"'d'"+')">'+base[num]['options']['d']+'</button></div></section>'
}
function finished(){
    correctAns= 0
    base.forEach(element => {if (element['correctSelected']){correctAns++}})
    document.getElementsByTagName('body')[0].innerHTML = '<header><div id="title">Biología</div></header><div id="results">Has hacertado:<br><p id="big">'+correctAns+'/'+base.length+'</p><br>Eso da un total de<br><p id="big">'+correctAns/base.length*100+'%</p></div>'
}
function select(option){
    console.log(base.length)
    console.log(num)
    if (base[num]['correctOption'] == option){
        base[num]['correctSelected'] = true
        window.alert('Correcto')
    }
    else{
        window.alert('Incorrecto')
    }
    if (num + 1<base.length){
        num++
        refreshData()
    }
    else {finished()}
}
window.onload = refreshData()