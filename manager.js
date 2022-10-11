var CSSVariables = [];
if (localStorage.getItem('lightMode')==null)localStorage.setItem('lightMode', 1);
function modifyHex(hex){
    let rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16))
    for (let i=0; i<rgb.length; i++){rgb[i]=255-rgb[i];}
    return '#' + rgb.map(x => {const hex2 = x.toString(16);return hex2.length === 1 ? '0' + hex2 : hex2;}).join('');
}
function changeMode(){
    if (localStorage.getItem('lightMode')==1) localStorage.setItem('lightMode', 0);
    else localStorage.setItem('lightMode', 1);
    CSSVariables.forEach(variable => {$(':root').get(0).style.setProperty('--'+variable, modifyHex($(':root').css('--'+variable)));});
    if ($(window).scrollTop()>10) $(':root').get(0).style.setProperty('--headerBackgroundColor', 'rgba(' + $(':root').css('--backgroundColor').replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16)).join() + ',0.9)');
    else $(':root').get(0).style.setProperty('--headerBackgroundColor', $(':root').css('--backgroundColor'));
    $('head').get(0).append('<meta id="theme-color" name="theme-color" content="'+$(':root').css('--backgroundColor')+'">');
}
//RICH ALERT
function richAlert(msg){
    $('body').append('<div id="richAlertContainer"><div id="richAlert">'+msg+'</div></div>')
    $('#richAlert').click(function(event){event.stopPropagation();});
    $('#richAlertContainer').click(function(event){event.target.remove()})
}
//GET DEVELOPMENT STATUS
function getDevelopmentStatus(){
    $.getJSON('metadata.json', function(metadata){
        richAlert('<div id="development"><div id="development-information"><h1 class="tertiaryText title">Development Status - '+metadata['name']+'</h1><h1 class="tertiaryText subtitle">'+metadata['development']['status'].charAt(0).toUpperCase()+metadata['development']['status'].slice(1)+'</h1>'+metadata['development']['note']+'</div><img src="https://jeffser.github.io/globalMedia/development/'+metadata['development']['status']+'.gif" alt="'+metadata['development']['status']+'"></div>');
    })
}
//METADATA
$.getJSON('metadata.json', function(metadata){
    for (const [key, value] of Object.entries(metadata['CSSVariables'])){
        v=value;
        if (localStorage.getItem('lightMode')==0)v=modifyHex(v)
        $(':root').get(0).style.setProperty('--'+key,v);
        CSSVariables.push(key);
    }
    $('head').get(0).append('<meta id="theme-color" name="theme-color" content="'+$(':root').css('--backgroundColor')+'">');
})
$(window).on('load', function() {
    //HEADER
    $("header").html('<div><img src="https://avatars.githubusercontent.com/u/69224322?v=4" alt="logo"><b onclick="window.location.href=\'../\'">Jeffry\'s Corner</b></div>');
    $("header").find('img').contextmenu(function(e){e.preventDefault();})
    $("header").find('img').mousedown(function(ev){
        if(ev.which==1)changeMode();
        if(ev.which==3){ev.preventDefault(); getDevelopmentStatus();}
    });
    //FOOTER
    $("footer").html('Made by <a href="https://www.github.com/jeffser">JeffSER</a> with ❤️');
    //SCROLL THING
    window.onscroll = function(){
        let scroll = $(window).scrollTop();
        if (scroll<10){
            $(':root').get(0).style.setProperty('--headerBoxShadow', 'none');
            $(':root').get(0).style.setProperty('--headerBackgroundColor', $(':root').css('--backgroundColor'));
        }
        if (scroll<100){
            $(':root').get(0).style.setProperty('--headerScale', 10-(scroll/100*5)+'vmin');
            $(':root').get(0).style.setProperty('--headerBackgroundColor', 'rgba(' + $(':root').css('--backgroundColor').replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16)).join() + ',0.9)');
        }
        else {
            $(':root').get(0).style.setProperty('--headerScale', '5vmin');
            $(':root').get(0).style.setProperty('--headerBoxShadow', '0px 2px var(--headerColor)')
        }
    }
})