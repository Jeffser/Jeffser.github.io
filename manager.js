var CSSVariables = [];
const defaultMainWidth = $('#main').css('width');
if (localStorage.getItem('lightMode')==null)localStorage.setItem('lightMode', 1);
function modifyHex(hex){
    let rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16))
    for (let i=0; i<rgb.length; i++){rgb[i]=255-rgb[i];}
    return '#' + rgb.map(x => {const hex2 = x.toString(16);return hex2.length === 1 ? '0' + hex2 : hex2;}).join('');
}
function changeMode(){
    if (localStorage.getItem('lightMode')==1||(localStorage.getItem('lightMode')!=1&&localStorage.getItem('lightMode')!=0)) localStorage.setItem('lightMode', 0);
    else localStorage.setItem('lightMode', 1);
    CSSVariables.forEach(variable => {$(':root').get(0).style.setProperty('--'+variable, modifyHex($(':root').css('--'+variable)));});
    if ($(window).scrollTop()>10) $(':root').get(0).style.setProperty('--headerBackgroundColor', 'rgba(' + $(':root').css('--backgroundColor').replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16)).join() + ',0.9)');
    else $(':root').get(0).style.setProperty('--headerBackgroundColor', $(':root').css('--backgroundColor'));
    $('head').get(0).append('<meta id="theme-color" name="theme-color" content="'+$(':root').css('--backgroundColor')+'">');
    if (localStorage.getItem('lightMode')==0) $(':root').get(0).style.setProperty('--brightnessLevel', '150%');
    else $(':root').get(0).style.setProperty('--brightnessLevel', '50%');
}
//JEFFSER_TERMINAL
function JEFFSER_TERMINAL(element){
    const [good, bad, text] = ['solid lime .5vmin', 'solid red .5vmin', 'solid orange .5vmin'];
    const constants={
        ':abandoned:': 'https://jeffser.github.io/globalMedia/development/abandoned.gif',
        ':broken:': 'https://jeffser.github.io/globalMedia/development/broken.gif',
        ':error:': 'https://jeffser.github.io/globalMedia/development/error.gif',
        ':finished:': 'https://jeffser.github.io/globalMedia/development/finished.gif',
        ':updating:': 'https://jeffser.github.io/globalMedia/development/updating.gif'
    }
    let parameters = element.value.split(' ');
    let ogCMD = parameters[0];
    parameters.splice(0, 1);
    for (let i=0; i<parameters.length; i++){
        for (const [key, value] of Object.entries(constants)) parameters[i] = parameters[i].replace(RegExp(key, 'g'), value);
    }
    if (parameters==undefined||parameters.length==0){parameters = []; parameters.push('')}
    switch (ogCMD){
        case 'goto':
            let prefix = '';
            if (parameters[0].substring(0, 2)!='./') prefix = 'https://jeffser.github.io/';
            window.location.href = prefix + parameters.join('/');
            break;
        case 'print':
            if (window[parameters[0]]!=undefined){element.style.border = text; element.placeholder=window[parameters[0]]; element.value='';}
            else element.style.border = bad;
            break;
        case 'changeMode':
            changeMode();
            break;
        case 'alert':
            alert(parameters.join(' '));
            break;
        case 'richAlert':
            richAlert(parameters.join(' '));
            break;
        case 'test':
            parameters = parameters.join(' ');
            break;
            
    }
    return false;
}
//RICH ALERT
function richAlert(msg, block=false){   
    $('#richAlertContainer').remove();
    $('body').append('<div id="richAlertContainer"><div id="richAlert">'+msg+'</div></div>')
    $('#richAlert').click(function(event){event.stopPropagation();});
    if (!block)$('#richAlertContainer').click(function(event){event.target.remove();})
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
        if (localStorage.getItem('lightMode')==0){
            v=modifyHex(v);
            $(':root').get(0).style.setProperty('--brightnessLevel', '150%');
        } else $(':root').get(0).style.setProperty('--brightnessLevel', '50%');
        $(':root').get(0).style.setProperty('--'+key,v);
        CSSVariables.push(key);
    }
    $('head').get(0).append('<meta id="theme-color" name="theme-color" content="'+$(':root').css('--backgroundColor')+'">');
    if (metadata['development']['status']=='broken'||metadata['development']['status']=='error') getDevelopmentStatus();
    let mobile = false; (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) mobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
    if (mobile && metadata['mobile']['status']!=null){richAlert('<div id="development"><div id="development-information"><h1 class="tertiaryText title">Mobile Status - '+metadata['name']+'</h1><h1 class="tertiaryText subtitle">'+metadata['mobile']['status'].charAt(0).toUpperCase()+metadata['mobile']['status'].slice(1)+'</h1>'+metadata['mobile']['note']+'</div><img src="https://jeffser.github.io/globalMedia/development/'+metadata['mobile']['status']+'.gif" alt="'+metadata['mobile']['status']+'"></div>', block=true);}
})
function whenResize(){
    if ($(window).width()>$(window).height()) $('#main').css('width', defaultMainWidth);
    else $('#main').css('width', '95vw');
}
$(window).on('load', function() {
    whenResize();
    $(window).bind("orientationchange", function(event){
        if (event.orientation=='landscape') $('#main').css('width', '70vw');
        else $('#main').css('width', '95vw');
    });
    $(window).resize(whenResize);
    //HEADER
    $("header").html('<div><img src="https://avatars.githubusercontent.com/u/69224322?v=4" alt="logo"><b onclick="window.location.href=\'https://jeffser.github.io\'">Jeffry\'s Corner</b></div>');
    $("header").find('img').contextmenu(function(e){e.preventDefault(); getDevelopmentStatus();})
    $("header").find('img').mousedown(function(ev){if(ev.which==1) changeMode();});
    //FOOTER
    $("footer").html('Made by <a href="https://www.github.com/jeffser">JeffSER</a> with ❤️');
    //JEFFSER_TERMINAL THING
    $('body').keypress(function(e){
        if ((e['originalEvent']['key']=='/')&&document.activeElement.tagName=='BODY'){
            richAlert('<textarea spellcheck="false" rows="1" style="caret-color: lime; box-sizing:border-box; width:100%; background: black; outline: none; border: solid transparent 0; font-size: 4vmin; color: lime;" id="JEFFSER-TERMINAL" onkeyup="if (event[\'key\']==\'Escape\') $(\'#richAlertContainer\').remove(); else return true;" onkeypress="this.placeholder=\'\'; this.style.border=\'solid transparent 0\'; if(event[\'key\']==\'Enter\') return JEFFSER_TERMINAL(this); else return true;"></textarea>');
            $('#JEFFSER-TERMINAL').focus();
            return false;
        }
    })
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
