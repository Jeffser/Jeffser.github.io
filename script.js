$(window).on('load', function(){
    map = ["tentri"];
    map.forEach(pageName => {
        $.getJSON("https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/"+pageName+"/metadata.json", function(page){
            $('#list-'+page['type']).append('<div onclick="window.location.href=\''+pageName+'\';" class="page" id="'+pageName+'"><h1 class="pageTitle">'+page['name']+'</h1><p class="pageDescription">'+page['description']+'</p></div>');
        });
    });

})
