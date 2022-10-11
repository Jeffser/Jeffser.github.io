$(window).on('load', function(){
    map = ["tentri", "muse"];
    map.forEach(pageName => {
        $.getJSON("./"+pageName+"/metadata.json", function(page){
            $('#list-'+page['type']).append('<div onclick="window.location.href=\''+pageName+'\';" class="page" id="'+pageName+'"><h1 class="pageTitle">'+page['name']+'</h1><p class="pageDescription">'+page['description']+'</p></div>');
        });
    });

})
