$(window).on('load', function(){
    types = ["project", "blog"];
    types.forEach(type =>{
        for (let i=0; i<$("#list-"+type).children(".page").length; i++){
            let pageName = $("#list-"+type).children(".page")[i].id;
            $.getJSON("./"+type+'/'+pageName+"/metadata.json", function(page){
                $('#list-'+page['type']).find('#'+pageName).append('<h1 class="pageTitle">'+page['name']+'</h1><p class="pageDescription">'+page['description']+'</p>');
                $('#list-'+page['type']).find('#'+pageName).click(function(){window.location.href=page['type']+'/'+pageName;});
            });
        }
    })
    //STUFF---------------
    //SONG----------------
    $.getJSON('https://youtube.com/oembed?url=https://www.youtube.com/watch?v='+$(".song")[0].id+'&format=json', function(videoMetadata){
        $(".song").html("<div style='background-image: url(https://i.ytimg.com/vi/" + $(".song")[0].id + "/maxresdefault.jpg);' id='image' class='stuffImage'></div><h1 class='stuffName tertiaryText'>Song of the month</h1><h1 class='stuffTitle'>" + videoMetadata['title'] + "</h1>")
        $(".song").click(function(){window.open('https://music.youtube.com/watch?v=' + $(".song")[0].id, '_blank');});
    });
    //VIDEO---------------
    //$.getJSON('https://youtube.com/oembed?url=https://www.youtube.com/watch?v='+$(".video")[0].id+'&format=json', function(videoMetadata){
        //$(".video").html("<div style='background-image: url(https://i.ytimg.com/vi/" + $(".video")[0].id + "/maxresdefault.jpg);' id='image' class='stuffImage'></div><h1 class='stuffName tertiaryText'>Video of the month</h1><h1 class='stuffTitle'>" + videoMetadata['title'] + "</h1>")
        //$(".video").click(function(){window.open('https://www.youtube.com/watch?v=' + $(".video")[0].id, '_blank');});
    //});
    //SERIES--------------
    $(".series").html("<div style='background-image: url(" + $(".series").attr('image') + ");' id='image' class='stuffImage'></div><h1 class='stuffName tertiaryText'>Series of the month</h1><h1 class='stuffTitle'>" + $(".series").attr('name') + "</h1>")
    $(".series").click(function(){window.open($(".series")[0].id, '_blank');});
    //GAME----------------
    $(".game").html("<div style='background-image: url(https://cdn.cloudflare.steamstatic.com/steam/apps/" + $(".game")[0].id + "/header.jpg?t=1663621793);' id='image' class='stuffImage'></div><h1 class='stuffName tertiaryText'>Game of the month</h1><h1 class='stuffTitle'>" + $(".game").attr('name') + "</h1>")
    $(".game").click(function(){window.open("https://store.steampowered.com/app/" + $(".game")[0].id, '_blank');});
    //PHOTO---------------
    //$(".photo").html("<div style='background-image: url(./globalMedia/sotm/photo.jpg);' id='image' class='stuffImage'></div><h1 class='stuffName tertiaryText'>Photo of the month</h1><h1 class='stuffTitle'>" + $(".photo").attr('name') + "</h1>")
    //$(".photo").click(function(){richAlert("<img src='./globalMedia/sotm/photo.jpg' style='max-height: 80vh; display: block; margin-left: auto; margin-right: auto;'>");});
})
