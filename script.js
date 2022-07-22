let kaomoji = []
let categories = []
let pages = []
var colors = []
var mode = 0 //0=Dark 1=Light
function setModeColor(){
    document.getSelection().removeAllRanges() 
    var pc = null
    if (mode==0){pc = 'white'}
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
    for (let category of document.getElementById('main').getElementsByClassName('category')){
        category.style.backgroundColor = 'rgb(' + categories[category.id]['color'][mode].toString() + ')'
        category.style.color = 'rgb(' + categories[category.id]['color'][1 - mode].toString() + ')'
    }
    for (let post of document.getElementById('main').getElementsByClassName('post')){
        post.style.backgroundColor = 'rgb(' + pages[pages.findIndex(p => p.id == post.id)]['color'][mode].toString() + ')'
        post.style.color = 'rgb(' + pages[pages.findIndex(p => p.id == post.id)]['color'][1 - mode].toString() + ')'
    }
    for (let sb of document.getElementById('main').getElementsByClassName('searchBar')){
        for (let i = 0; i<2; i++){sb.childNodes[i].style.backgroundColor = 'rgb('+colors[1 - mode].toString()+')'; sb.childNodes[i].style.color = 'rgb('+colors[mode].toString()+')'}
        sb.childNodes[0].style.caretColor = 'rgb('+colors[mode].toString()+')'
    }
    document.body.style.backgroundColor = 'rgb(' + colors[mode].toString() + ')'
    document.getElementById('theme-color').content = 'rgb(' + colors[mode].toString() + ')'
}

function invertMode(){    
    if (mode==0){mode=1}else{mode=0}
    setModeColor()
}

function search(searchBar){
    var sInput = searchBar.childNodes[0].value
    var sCategory = parseInt(searchBar.childNodes[1].value)
    var sResults = searchBar.parentElement.childNodes[1]
    sResults.innerHTML = ''
    for (let page of pages){
        if ((page['title'].toUpperCase().includes(sInput.toUpperCase())||sInput=='*') && (page['category'].includes(sCategory) || sCategory==0) && sInput!=''){
            sResults.innerHTML += '<div class="post" id="'+page['id']+'" style="padding: 1vmin; margin 1vmin; " title="URL: '+page['id']+'\n'+page['date']+'" onclick="window.location.href=\'./?p='+page['id']+'\'">'+page['title']+'</div>'
        }
    }
    if (sResults.innerHTML!=''){sResults.style.display='block'}
    else{sResults.style.display='none'}
    setModeColor()
}

function updateWidgets(){
    //Fixed Posts List (FPL)
    for (let FPL of document.getElementById('main').getElementsByClassName('FPL')){
        for (let post of FPL.id.split('-')){
            post = pages[pages.findIndex(p => p.id == post)]
            FPL.innerHTML += '<div class="post" id="' + post['id'] + '" style="padding: 1vmin; margin: 1vmin;"></div>'
        }
    }
    //Searchable Posts List (SPL)
    for (let SPL of document.getElementById('main').getElementsByClassName('SPL')){
        let ih = '<div class="searchBar"><input type="text" id="searchInput" onchange="search(this.parentElement)"><select id="searchCategories" onchange="search(this.parentElement)"><option value="0">All</option>'
        for (let i = 1; i < categories.length; i++){ih += '<option value="' + i + '">' + categories[i]['name'] + '</option>'}
        ih += '</select></div><div class="searchResults"></div>'
        SPL.innerHTML = ih
    }
}

function load(){    
    var pageID = new URLSearchParams(window.location.search).get('p')
    $.getJSON('https://raw.githubusercontent.com/Jeffser/Blog-Data/main/kaomoji.json', function(data){kaomoji = data
    $.getJSON('https://raw.githubusercontent.com/Jeffser/Blog-Data/main/categories.json', function(data){categories = data
    $.getJSON('https://raw.githubusercontent.com/Jeffser/Blog-Data/main/pages.json', function(data){pages = data
        if (pageID == null){pageID = "home"}
        if (pages[pages.findIndex(d => d.id == pageID)] == undefined){
            var url = new URL(window.location.href)
            var sp = url.searchParams
            sp.set('p', '404')
            url.search = sp.toString()
            window.location.href = url.toString()
        }
        var page = pages[pages.findIndex(d => d.id == pageID)]
        kaomoji.forEach(km => {
            km[0] = '~~' + km[0] + '~~'
            page['content'] = page['content'].split(km[0]).join(km[1])
        })
        if (page['id']=='home'){document.getElementById('main').innerHTML = '<div class="SPL"></div><h1 id="title">' + page['title'] + '</h1>'}
        else{document.getElementById('main').innerHTML = '<h1 id="title">' + page['title'] + '</h1>'}
        if (page['category'][0]!=0){
            page['category'].forEach(ct => {document.getElementById('main').innerHTML +=  '<h2 class="category" id="' + ct + '">' + categories[ct]['name'] + '</h2>'})
        }
        document.getElementById('main').innerHTML += '<br>' + page['content']
        if (page['id']!='404'){document.getElementById('main').innerHTML += '<div id="date"><b>Created: </b>'+page['date']+'<br><b>Last Updated: </b>'+page['lastUpdated']+'</div>'}
        for (let img of document.getElementById('main').getElementsByTagName('img')){img.src = 'https://raw.githubusercontent.com/Jeffser/Blog-Data/main/media/' + page['id'] + '/' + img.alt}
        for (let code of document.getElementById('main').getElementsByTagName('code')){code.innerHTML = code.innerHTML.replace(/\n/g, '<br />')}
        colors = [page['color'][0], page['color'][1]]
        updateWidgets()
        for (let post of document.getElementById('main').getElementsByClassName('post')){
            post.title = 'URL: ' + post.id + '\n' + pages[pages.findIndex(p => p.id == post.id)]['date']
            post.addEventListener('click', () => {location.href = '?p=' + post.id})
            if (post.innerHTML == ''){post.innerHTML = pages[pages.findIndex(p => p.id == post.id)]['title']}
        }
        document.getElementsByTagName('footer')[0].innerHTML = 'Made by <a href="https://www.github.com/jeffser">JeffSER</a> with ❤️'
        setModeColor()
    })})})
}
window.onload = load()