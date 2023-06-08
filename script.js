let page = '';
let LANG = 'EN';

function screenModeDetector(){
    if (window.innerWidth > window.innerHeight) return "landscape";
    else return "portrait";
}

function changeLang(newLang){
    localStorage.setItem("LANG", newLang);
    if (newLang == 'ES'){
        LANG = 'ES';
        $('#lang-button').html('🇬🇧');
        $('#title p').html('Hola, soy yo!');
        $('#title h2').html('Hago cosas geniales con <b id="to-change"></b>');
        $('.button#aboutme').html('Sobre mí');
        $('.button#repository').html('Repositorio');
        $('.button#contact').html('Contacto');
    }
    else{
        LANG = 'EN';
        $('#lang-button').html('🇪🇸');
        $('#title p').html('Hi, it\'s me!');
        $('#title h2').html('I make cool stuff using <b id="to-change"></b>');
        $('.button#aboutme').html('About me');
        $('.button#repository').html('Repository');
        $('.button#contact').html('Contact');
    }
    
}

function alternateLang(){
    if (LANG == 'ES') changeLang('EN');
    else changeLang('ES');
    initialLoad(page);
}

function changePage(newPage){
    const url = new URL(window.location);
    url.searchParams.set('p', newPage);
    window.history.pushState(null, '', url.toString());
    page = newPage;
    initialLoad();
}

window.onpopstate = function(e){
    initialLoad(new URL(window.location).searchParams.get('p'));
}

function checkScroll(){
    let scroll = $(document).scrollTop();
    if (scroll < 200){
        $('#title').css('opacity', '1');
        $('#title').css('display', 'unset');
        $('#content').css('display', 'none');
        $('#main').css('inset', '2% 2% 2% 2%');
    }
    if (scroll >= 200 && scroll < 1000){
        $('#title').css('opacity', '1' - scroll/1000);
        $('#title').css('display', 'unset');
        $('#content').css('display', 'none');
        if (screenModeDetector() == "landscape") $('#main').css('inset', scroll/100 + '%' + scroll/100 + '%' + scroll/100 +'%' + scroll/100 + '%');
        else $('#main').css('inset', scroll/100 + 5 + '%' + '2%' + scroll/100 +'%' + '2%');
    }
    if (scroll >= 1000){
        $('#title').css('opacity', '0');
        $('#title').css('display', 'none');
        $('#content').css('display', 'block');
        if (screenModeDetector() == "landscape") $('#main').css('inset', '10% 10% 10% 10%');
        else $('#main').css('inset', '15% 2% 10% 2%');
    }
}

function initialLoad(){
    $('.button').css('flex-grow', '1')
    $('.button#' + page.split('/')[0]).css('flex-grow', '2');
    let file_url = page + '_' + LANG + '.md';
    $.ajax({
        url: file_url,
        type:'HEAD',
        error: function()
        {
            $.get("error404.md", function(data){
                $('#content').html(new showdown.Converter().makeHtml(data));
            });
        },
        success: function()
        {
            $.get(file_url, function(data){
                $('#content').html(new showdown.Converter().makeHtml(data));
            });
        }
    });
}

$(window).on('load', function(){
    if (localStorage.getItem("LANG") == null) localStorage.setItem("LANG", "EN");
    changeLang(localStorage.getItem("LANG"));
    let i = 0;
    const CODE_LANGUAGES = ['HTML', 'JS', 'CSS', 'JSON', 'Python', 'Java'];
    $('#title #to-change').css('opacity', '0');
    setInterval(function(){
        if (i>=CODE_LANGUAGES.length) i = 0;
        if ($('#title #to-change').css('opacity') != '0') $('#title #to-change').css('opacity', '0');
        else{
            $('#title #to-change').html(CODE_LANGUAGES[i]);
            $('#title #to-change').css('opacity', '1');
            i++;
        }
    }, 1000);
    $(document).scroll(function(){checkScroll();});
    checkScroll();
    page = "aboutme";
    if ((new URL(document.location)).searchParams.has('p')) page = new URL(window.location).searchParams.get('p');
    initialLoad();
});