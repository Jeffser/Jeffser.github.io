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
}
//METADATA
$.getJSON('metadata.json', function(metadata){
    for (const [key, value] of Object.entries(metadata['CSSVariables'])){
        v=value;
        if (localStorage.getItem('lightMode')==0)v=modifyHex(v)
        $(':root').get(0).style.setProperty('--'+key,v);
        CSSVariables.push(key);
    }
    $('head').get(0).append('<meta id="theme-color" name="theme-color" content="'+metadata['CSSVariables']['backgroundColor']+'">');
})
$(':root').get(0).style.setProperty('--headerScale', '10vmin');
$(window).on('load', function() {
    //HEADER
    $("header").html('<div><img src="https://avatars.githubusercontent.com/u/69224322?v=4" alt="logo" onclick="changeMode()"><b onclick="window.location.href=\'../\'">Jeffry\'s Corner</b></div>');
    //FOOTER
    $("footer").html('Made by <a href="https://www.github.com/jeffser">JeffSER</a> with ❤️');
    //SCROLL THING
    window.onscroll = function(){
        let scroll = $(window).scrollTop();
        if (scroll<200) $(':root').get(0).style.setProperty('--headerScale', 10-(scroll/200*5)+'vmin');
        else $(':root').get(0).style.setProperty('--headerScale', '5vmin');
    }
})