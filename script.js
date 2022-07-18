var color = null
function setModeColor(){
    var pc = null
    if (color['r'] + color['g'] + color['b']<382){pc = 'white'}
    else{pc = 'black'}
    document.body.style.color = pc
    for (let img of document.getElementById('main').getElementsByTagName('img')){img.style.borderTop = 'solid ' + pc; img.style.borderBottom = 'solid' + pc}
    for (let a of document.body.getElementsByTagName('a')){a.style.color = pc}
    document.body.style.backgroundColor = 'rgb(' + color['r'] + ',' + color['g'] + ',' + color['b'] + ')'
}
function setColor(){
    ['r', 'g', 'b'].forEach(c => {color[c] = 255 - color[c]})
    setModeColor()
    console.log(color)
}
function load(){
    $.getJSON('https://api.github.com/users/jeffser', function(data){
        document.getElementById('header').getElementsByTagName('b')[0].innerHTML = data.name
        document.getElementById('header').getElementsByTagName('img')[0].src = data.avatar_url
        document.getElementById('favicon').href = data.avatar_url
    })
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
        document.getElementById('main').innerHTML = '<h1 id="title">' + page['title'] + '</h1>' + page['content']
        color = page['color']
        setModeColor()
    })
}
window.onload = load()