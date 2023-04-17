function makeBigCard(id, img, h2, h3, imgTitle, url = ""){
    if (url != "") return '<a href="' + url + '" class="bigCard" id="' + id + '"><img title="' + imgTitle + '" src="' + img + '"><div><h2 title="' + h2 + '">' + h2 + '</h2><h3 title="' + h3 + '">' + h3 + '</h3></div></a>';
    else return '<div class="bigCard" id="' + id + '"><img title="' + imgTitle + '" src="' + img + '"><div><h2 class="dont-index" title="' + h2 + '">' + h2 + '</h2><h3 class="dont-index" title="' + h3 + '">' + h3 + '</h3></div></div>';    
}

function makeSummary(){
    $("section#summary").html("<h1 style=\"text-align: center;\">Indice</h1><ul></ul>");
    for (let element of $("section#main h1,section#main h2,section#main h3,section#main h4,section#main hr")){//tagName textContent
        if ($(element).hasClass("dont-index") == false){
            if (element.tagName == "HR"){
                $("section#summary ul").append('<hr>');
            }
            else{
                $("section#summary ul").append('<li style="margin-left: calc(20px * (' + element.tagName.replace('H', '') + ' - 1));" id="' + element.textContent.replace(/ /g, '_') + '" class="' + element.tagName + '">' + element.textContent + '</li>')
                $("section#summary ul li:last-child").on('click', function(){
                    element.scrollIntoView({ behavior: 'smooth', block: 'start'});
                });
            }
        }
    }
}

function showRichAlert(text){
    $("section#richAlert").css('display', 'flex');
    $("section#richAlert").html(text);
    $("section#richAlertBackground").css('display', 'block');
    setTimeout(function(){$("section#richAlert").css('opacity', '1');}, 1);
}

function hideRichAlert(){
    $("section#richAlert").css('opacity', '0');
    setTimeout(function(){
        $("section#richAlert").css('display', 'none');
        $("section#richAlert").html('');
        $("section#richAlertBackground").css('display', 'none');
    }, 200);
}

function alternateRichAlert(text){
    if ($("section#richAlert").css('display') == 'flex' && $("section#richAlert").html() == text) hideRichAlert();
    else showRichAlert(text);
}

function alternateColorMode(){
    if ($(":root").css("--color-base") == "black") $(":root").css({"--color-base": "white", "--color-lightness-changer": "40%"});
    else $(":root").css({"--color-base": "black", "--color-lightness-changer": "0%"});
}

function hideNotification(){
    $("section#notification").css({"top": "none", "bottom": "0px", "opacity": "0"});
    setTimeout(function(){
        $("section#notification").css({"top": "100%"});
        $("section#notification").html("");
    }, 1000);
}

notificationTimeout = null;

function notification(text, sec){
    if (notificationTimeout != null) clearTimeout(notificationTimeout);
    $("section#notification").html(text);
    $("section#notification").css({"top": "auto", "bottom": "15px", "opacity": "1"});
    $("section#notification").on("click", function(){hideNotification();});
    if (sec != 0) notificationTimeout = setTimeout(function(){hideNotification();}, sec * 1000);
}

function muse(id){
    $.getJSON('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id + '&format=json', function(data){
        notification("<h2 style='text-align: left;'>Muse - Now Playing:</h2>" + makeBigCard("Youtube-Music", "https://i3.ytimg.com/vi/" + id + "/maxresdefault.jpg", data['title'], data['author_name'].replace(' - Topic', ''), data['title']), 0);
        $("section#notification .bigCard img").replaceWith('<iframe autoplay width="' + $("section#notification .bigCard img").css('width') + '" height="' + $("section#notification .bigCard img").css('height') + '" src="https://www.youtube.com/embed/' + id + '?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
    });
}

function showContact(){
    text = "";
    [
        ["email", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png", "Email", "", "Gmail", "mailto:jeffrysamuer@gmail.com"],
        ["github", "https://avatars.githubusercontent.com/u/69224322?v=4", "Jeffser", "Github", "Github", "https://github.com/Jeffser"],
        ["steam", "https://avatars.akamai.steamstatic.com/64a06e085bec595bb1472389935743df38589605_full.jpg", "Tentri", "Steam", "Steam", "https://steamcommunity.com/id/Tentri/"],
        ["ytm", "https://yt3.googleusercontent.com/BDflBEMoifUhmkhP3SiDIkah47ZaKszVq_C-ff88oPF7YbZPRvAaLDV9IEbPXNIlTlPhCt4cSQ=s800-c-k-c0x00ffffff-no-rj", "TentriLive", "Youtube Music", "Youtube Music", "https://music.youtube.com/channel/UCPGqnFkPLe9Z0jIoQpVJLHg"],
        ["discord", "https://cdn.discordapp.com/avatars/530237414632062976/561782095754696d7c31ca74bc4dc184?size=1024", "Tentri#9738", "Discord", "Discord", "https://discordapp.com/users/530237414632062976"],
    ].forEach(e => {text += makeBigCard(e[0], e[1], e[2], e[3], e[4], e[5]);});
    alternateRichAlert(text);
}

$(window).on('load', function(){
    notification("⚠️ ESTE SITIO ESTÁ EN BETA ⚠️<br>Aún no he convertido todas las páginas.", 10);
    $("section#main").css('padding-top', 'calc(' + $("header").css('height') + ' + 50px)');
    $("section#summary").css('top', 'calc(' + $("header").css('height') + ' + 50px)');
    $.get(window.location.href + '/index.md', function(text){
        $("section#main").append(new showdown.Converter().makeHtml(text));
        makeSummary();
    });
});