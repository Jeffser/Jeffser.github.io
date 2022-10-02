window.onload = function(){
    $.getJSON('https://raw.githubusercontent.com/Jeffser/Blog-Data/main/activities.json', function(data){
    var activities = []
    var code = new URLSearchParams(window.location.search).get('code')
    if (code!=null && code!=''){
        code = code.split('-')
        data.forEach(element => {
            let tempDT = element[0].split(' ')
            tempDT.length = code.length
            if (tempDT.join(' ')==code.join(' ')){
                let dateTime = element[0]
                element.splice(0, 1)
                activities.push({'dateTime': dateTime, 'activities': element})
                ////----////
                let html_div = document.createElement('div')
                html_div.id = dateTime
                html_div.className = 'activityList'
                let html_dateTime = document.createElement('h1')
                tempDT = dateTime.split(' ')
                html_dateTime.innerHTML = tempDT[2] + '/' + tempDT[1] + '/' + tempDT[0] + ' ' + tempDT[3] + ':' + tempDT[4]
                html_dateTime.className = 'dateTime'
                html_div.appendChild(html_dateTime)
                element.forEach(activity => {
                    let html_subDiv = document.createElement('div')
                    html_subDiv.className = 'activity'
                    html_subDiv.style.backgroundImage = 'url(' + activity['large_image_url'] + ')'
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
                })
                document.getElementById('main').insertBefore(html_div, document.getElementById('main').firstChild)
                ////----////
            }
        });
    }
    document.getElementById('main').innerHTML = '<div class="activityList"><h1 class="dateTime">Select Date</h1><div class="activity" style="text-align: center;"><input type="number" name="year" id="year" placeholder="Year" max="9999" min="2022" onchange="verf(this)"><input type="number" name="month" id="month" placeholder="Month" max="12" min="1" onchange="verf(this)"><input type="number" name="day" id="day" placeholder="Day" max="31" min="1" onchange="verf(this)"><br><input type="number" name="hour" id="hour" placeholder="Hour" max="23", min="0" onchange="verf(this)"><input type="number" name="minute" id="minute" placeholder="Minute" max="59" min="0" onchange="verf(this)"><input type="button" value="Accept" onclick="go()"></div></div>' + document.getElementById('main').innerHTML
    })
}
function verf(element){
    if (element.value==''){return true}
    if (element.value>element.max){element.value = element.max}
    else if (element.value<element.min){element.value = element.min}
}
function go(){
    data = [document.getElementById('year').value, document.getElementById('month').value, document.getElementById('day').value, document.getElementById('hour').value, document.getElementById('minute').value]
    page = ''
    i = 0
    while (data[i]!='' && i<data.length){
        if (data[i].length==1){data[i]='0'+data[i]}
        page+=data[i]+'-'
        i+=1
    }
    page = page.slice(0,-1)
    if (page==""){alert('You have to at least select the year')}
    else{window.location.href='?code='+page}
}
