var search = new URLSearchParams(window.location.search)
var activityListsOnUse = []
var dictionary
var lastMax = 0
var toShowInLoad = 51

function makeActivityList(element){
    let dateTime = element[0]
    element.splice(0, 1)
    for (let i=0; i<element.length; i++){element[i]=dictionary[element[i]]}
    let html_div = document.createElement('div')
    html_div.id = dateTime
    html_div.className = 'activityList'
    let html_dateTime = document.createElement('h1')
    tempDT = dateTime.split(' ')
    html_dateTime.innerHTML = tempDT[2] + '/' + tempDT[1] + '/' + tempDT[0] + ' ' + tempDT[3] + ':' + tempDT[4]
    html_dateTime.className = 'dateTime'
    html_div.appendChild(html_dateTime)
    element.forEach(activity => {
        if ((search.get('category')==activity['name']&&activity['name']!=null)||search.get('category')==''||!search.has('category')){
            if (activity['details']==null){activity['details']=''}
            if (activity['state']==null){activity['state']=''}
            let html_subDiv = document.createElement('div')
            html_subDiv.className = 'activity'
            let html_image = document.createElement('img')
            html_image.className = 'image'
            html_image.src = activity['large_image_url']
            html_subDiv.appendChild(html_image)
            let html_name = document.createElement('h1')
            html_name.className = 'name'
            html_name.innerHTML = '<span>' + activity['name'] + '</span>'
            html_subDiv.appendChild(html_name)
            let html_details = document.createElement('h2')
            html_details.className = 'details'
            html_details.innerHTML = '<span>' + activity['details'] + '</span>'
            html_subDiv.appendChild(html_details)
            let html_state = document.createElement('h2')
            html_state.className = 'state'
            html_state.innerHTML = '<span>' + activity['state'] + '</span>'
            html_subDiv.appendChild(html_state)
            html_div.appendChild(html_subDiv)
        }
    })
    if (html_div.childElementCount>1){return html_div}
    else {return false}
}

function showPage(min, max){
    let i = min
    for (i; i<max; i++){
        if (i>=activityListsOnUse.length){break}
        var element = makeActivityList(activityListsOnUse[i])
        if (element!=false){document.getElementById('main').appendChild(element)}
    }
    lastMax = i
}

function verf(event){
    var element = (event.target || event.srcElement)
    if (element.value==''){return true}
    if (parseInt(element.value)>parseInt(element.max)){element.value = element.max}
    else if (parseInt(element.value)<parseInt(element.min)){element.value = element.min}
}

function go(){
    var page = ''
    var variables = ['year', 'month', 'day', 'hour', 'minute']
    variables.forEach(v =>{
        let data = document.getElementById(v).value
        if (data.length==1){data='0'+data}
        if (data.length!=0){page+=v+'='+data+'&'}
    })
    if (document.getElementById('category').value!=''){page+='category='+document.getElementById('category').value+'&'}
    window.location.href='?'+page.slice(0,-1)
}

window.onload = function(){
    $("html, body").scrollTop(0)
    $.getJSON('https://raw.githubusercontent.com/Jeffser/Blog-Data/main/dictionary.json', function(dictionaryData){dictionary = dictionaryData
    $.getJSON('https://raw.githubusercontent.com/Jeffser/Blog-Data/main/activities.json', function(data){
        data.forEach(element => {
            let tempDT = element[0].split(' ')
            if ((search.get('year')==tempDT[0]||search.get('year')==''||!search.has('year'))&&(search.get('month')==tempDT[1]||search.get('month')==''||!search.has('month'))&&(search.get('day')==tempDT[2]||search.get('day')==''||!search.has('day'))&&(search.get('hour')==tempDT[3]||search.get('hour')==''||!search.has('hour'))&&(search.get('minute')==tempDT[4]||search.get('minute')==''||!search.has('minute'))){
                if (search.get('category')==''||!search.has('category')){
                    activityListsOnUse.push(element)
                } else{
                    for (let i=1; i<element.length; i++){
                        if (dictionary[element[i]]['name']==search.get('category')){
                            activityListsOnUse.push(element)
                            break
                        }
                    }
                }
            }
        })
        activityListsOnUse.reverse()
        showPage(0, toShowInLoad)
        var html_div = document.createElement('div')
        html_div.id = 'menu'
        html_div.className = 'activityList'
        var html_menuText = document.createElement('h1')
        html_menuText.className = 'dateTime'
        html_menuText.innerHTML = 'Menu'
        html_div.appendChild(html_menuText)
        var html_subDiv = document.createElement('div')
        html_subDiv.className = 'activity'
        html_subDiv.style.textAlign = 'center'
        var elements = [['year', 2022, 9999], ['month', 1, 12], ['day', 1, 31], ['hour', 0, 23], ['minute', 0, 59]]
        elements.forEach(e =>{
            var html_input = document.createElement('input')
            html_input.type = 'number'
            html_input.id = e[0]
            html_input.placeholder = e[0].charAt(0).toUpperCase() + e[0].slice(1);
            html_input.min = e[1]
            html_input.max = e[2]
            html_input.addEventListener('change', verf)
            html_input.addEventListener('keydown', function(e){if (e.key==="Enter"){verf(e);go();}})
            if (search.has(e[0])){html_input.value = search.get(e[0])} 
            html_subDiv.appendChild(html_input)
        })
        var html_select = document.createElement('select')
        html_select.id = 'category'
        var categories = []
        var html_option = document.createElement('option')
        html_option.value = ''
        html_option.innerHTML = 'Any'
        html_select.appendChild(html_option)
        dictionary.forEach(d=>{
            if (categories.includes(d['name'])==false){
                categories.push(d['name'])
                var html_option = document.createElement('option')
                html_option.value = d['name']
                html_option.innerHTML = d['name'].charAt(0).toUpperCase() + d['name'].slice(1)
                html_select.appendChild(html_option)
            }
        })
        if (search.has('category')){html_select.value=search.get('category')}
        html_subDiv.appendChild(html_select)
        var html_inputButton = document.createElement('input')
        html_inputButton.type = 'button'
        html_inputButton.id = 'accept'
        html_inputButton.value = 'Accept'
        html_inputButton.addEventListener('click', go)
        html_subDiv.appendChild(html_inputButton)
        html_div.appendChild(html_subDiv)
        document.getElementById('main').insertBefore(html_div, document.getElementById('main').firstChild)
        $(window).scroll(function(){
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100){
                if (lastMax<activityListsOnUse.length){
                    showPage(lastMax, lastMax+toShowInLoad)
                }
            }
        })
    })
    })
}