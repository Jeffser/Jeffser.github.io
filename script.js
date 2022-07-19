let kaomoji = [['smile', '(´• ω •`)']]
var color = null
function setModeColor(){
    var pc = null
    if (color['r'] + color['g'] + color['b']<382){pc = 'white'}
    else{pc = 'black'}
    document.body.style.color = pc
    for (let img of document.getElementById('main').getElementsByTagName('img')){img.style.borderTop = 'solid ' + pc; img.style.borderBottom = 'solid' + pc}
    for (let a of document.body.getElementsByTagName('a')){a.style.color = pc}
    for (let code of document.body.getElementsByClassName('code')){
        if (code.tagName == 'DIV'){
            if (pc == 'white'){code.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
            else {code.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'}
        }
    }
    document.body.style.backgroundColor = 'rgb(' + color['r'] + ',' + color['g'] + ',' + color['b'] + ')'
    document.getElementById('theme-color').content = 'rgb(' + color['r'] + ',' + color['g'] + ',' + color['b'] + ')'
}
function setColor(){
    ['r', 'g', 'b'].forEach(c => {
        if (color[c]<127){color[c]+=127}
        else{color[c]-=127}
    })
    setModeColor()
}
function load(){
    var pageID = new URLSearchParams(window.location.search).get('p')
    $.getJSON('https://raw.githubusercontent.com/Jeffser/Blog-Data/main/pages.json', function(data){
        if (pageID == null){pageID = "home"}
        if (data[data.findIndex(d => d.id == pageID)] == undefined){
            var url = new URL(window.location.href)
            var sp = url.searchParams
            sp.set('p', '404')
            url.search = sp.toString()
            window.location.href = url.toString()
        }
        var page = data[data.findIndex(d => d.id == pageID)]
        kaomoji.forEach(km => {
            km[0] = '~~' + km[0] + '~~'
            page['content'] = page['content'].split(km[0]).join(km[1])
        })//.replace(/\n/g, '<br />');
        document.getElementById('main').innerHTML = '<h1 id="title">' + page['title'] + '</h1>' + page['content']
        if (page['id']!='404'){document.getElementById('main').innerHTML += '<div id="date"><b>Created: </b>'+page['date']+'<br><b>Last Updated: </b>'+page['lastUpdated']+'</div>'}
        for (let img of document.getElementById('main').getElementsByTagName('img')){img.src = 'https://raw.githubusercontent.com/Jeffser/Blog-Data/main/media/' + page['id'] + '/' + img.alt}
        for (let code of document.getElementById('main').getElementsByTagName('code')){code.innerHTML = code.innerHTML.replace(/\n/g, '<br />')}
        color = page['color']
        setModeColor()
    })
}
window.onload = load()