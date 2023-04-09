function changeMode(){
    if (document.documentElement.getAttribute("data-theme") == 'light') document.documentElement.setAttribute("data-theme", 'dark');
    else document.documentElement.setAttribute("data-theme", 'light');
}
function richAlert(msg, width='70vw', block=false){
    $('#richAlertContainer').remove();
    if (activeEG) $('body').append('<div id="richAlertContainer"><div id="richAlert" style="width: auto; background-color: transparent; border-radius: 0; border-color: black;"><img src="https://jeffser.github.io/globalMedia/easter/cat.gif"></div></div>')
    else $('body').append('<div id="richAlertContainer"><div id="richAlert" style="width: ' + width + '">'+msg+'</div></div>')
    $('#richAlert').click(function(event){event.stopPropagation();});
    if (!block)$('#richAlertContainer').click(function(event){event.target.remove();})
}
function showDevelopmentStatus(status, note){
    richAlert('<section id="development"><section id="development-information" style="text-align: center"><h1>Desarrollo</h1><h2>'+status.charAt(0).toUpperCase()+status.slice(1)+'</h2>'+note+'</section><img src="https://jeffser.github.io/globalMedia/development/'+status+'.gif" alt="'+status+'"></section>');
}
function checkHeaderPosition(){
    if (activeEG) return;
    let scroll = $(window).scrollTop();
    if (scroll<10){
        $(':root').get(0).style.setProperty('--header-scale', '12vmin');
        $(':root').get(0).style.setProperty('--header-border', 'solid transparent 0px');
        $(':root').get(0).style.setProperty('--header-background-opacity', '0');
    }
    else if (scroll<100){
        $(':root').get(0).style.setProperty('--header-scale', 12-(scroll/100*5)+'vmin');
        $(':root').get(0).style.setProperty('--header-background-opacity', '.7');
        $(':root').get(0).style.setProperty('--header-border', 'solid 5px');
    }
    else {
        $(':root').get(0).style.setProperty('--header-scale', '8vmin');
        $(':root').get(0).style.setProperty('--header-background-opacity', '.7');
        $(':root').get(0).style.setProperty('--header-border', 'solid 5px');
    }
}

$(window).on('load', function(){
    if ($("#custom-favicon").length == false) $("head").append('<link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/69224322?v=4">');
    $("header:not(.custom)").html('<div><img src="https://avatars.githubusercontent.com/u/69224322?v=4" alt="logo"><b onclick="window.location.href=\'https://jeffser.github.io\'">Jeffry\'s Corner</b></div>');
    $("header").find('img').contextmenu(function(e){e.preventDefault(); showDevelopmentStatus(getComputedStyle(document.documentElement).getPropertyValue('--desktop-development-status'), getComputedStyle(document.documentElement).getPropertyValue('--desktop-development-note'));})
    $("header").find('img').mousedown(function(ev){if(ev.which==1) changeMode();});
    $("footer:not(.custom)").html(getComputedStyle(document.documentElement).getPropertyValue('--publish-date') + '<br>Made by <a href="https://www.github.com/jeffser">JeffSER</a> with ❤️');
    window.onscroll = checkHeaderPosition;
    checkHeaderPosition();
    var theme="light";
    if(localStorage.getItem("theme")) theme = localStorage.getItem("theme");
    else if(!window.matchMedia) return false;
    else if(window.matchMedia("(prefers-color-scheme: dark)").matches) var theme = "dark";
    document.documentElement.setAttribute("data-theme", theme);
    const mobileStatus = getComputedStyle(document.documentElement).getPropertyValue('--mobile-development-status');
    const mobileNote = getComputedStyle(document.documentElement).getPropertyValue('--mobile-development-note');
    document.querySelectorAll('pre code:not([class])').forEach(function($) {$.className = 'plaintext';});
    hljs.highlightAll();
    if (window.matchMedia("(pointer: coarse)").matches && mobileStatus != 'None' && mobileStatus != ' ') showDevelopmentStatus(mobileStatus, mobileNote);
    document.onkeydown = function(e){
        var evtobj = window.event? event : e
        if (evtobj.code == 'KeyM' && evtobj.ctrlKey) easter();
    };
});
var activeEG = false;
var audioEG = new Audio('https://jeffser.github.io/globalMedia/easter/meow.mp3');
function easter(){
    $("footer").html('2004-02-04<br>Made by <a href="https://www.github.com/jeffser">JeffSER</a> with <3');
    activeEG = true;
    document.getElementsByTagName('body')[0].style.fontFamily = 'serif';
    $('body, header').css('text-align', 'left');
    $('*').css('font-family', 'serif');
    $('div').css({'background-color': 'transparent', 'border': 'solid black', 'border-radius': '0'});
    $('a').css({'background-color': 'transparent', 'border': 'solid black', 'border-radius': '0', 'justify-content': 'left'});
    $('header').css({'backdrop-filter': 'None', 'background-image': 'url(https://jeffser.github.io/globalMedia/easter/fire.webp)'});
    $('img').css({'filter': '', 'border-radius': '0', 'object-fit': 'contain'});
    gifs = ['https://media.tenor.com/koekvLpaXOQAAAAd/tripple-baka-tripple.gif', 'https://j.gifs.com/Kd7GqW.gif']
    $('img').not('.icon').each(function(){
        this.src = gifs[Math.floor(Math.random()*gifs.length)];;
    });
    $('.icon').css('display', 'none');
    $('code, pre').css('background', 'none !important');
    $('header').find('img')[0].src = 'https://media.tenor.com/2roX3uxz_68AAAAM/cat-space.gif';
    audioEG.play();
    audioEG.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    $('body').css('background-image', 'url(https://jeffser.github.io/globalMedia/easter/cat.gif)');
}
