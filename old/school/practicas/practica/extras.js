function richAlert(text){
    document.getElementsByClassName('richAlert')[0].style.display = 'table'
    document.getElementsByClassName('richAlert')[0].getElementsByTagName('p')[0].innerHTML = text
}

function richPrompt(text, def, type){
    if (type=='int') {return parseInt(prompt(text, def))}
    else if (type=='float') {return parseFloat(prompt(text, def))}
    else {return prompt(text, def)}
}

function getValueById(id, type){
    if (type=='int'){return parseInt(document.getElementById(id).value)}
    else if (type=='float'){return parseFloat(document.getElementById(id).value)}
    else if (type=='bool'){
        if ((document.getElementById(id).value).toLowerCase() == 'true'){return true}
        else {return false}
    }
    else if (type=='str'){return (document.getElementById(id).value).toString()}
    else if (type=='raw'){return document.getElementById(id)}
    else {return document.getElementById(id).value}
}

function setValueById(id, value){
    document.getElementById(id).value = value
}
