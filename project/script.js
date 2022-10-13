$(window).on('load', function(){
    for (let i=0; i<$("#list-project").children(".page").length; i++){
        let pageName = $("#list-project").children(".page")[i].id;
        $.getJSON("./"+pageName+"/metadata.json", function(page){
            $('#list-'+page['type']).find('#'+pageName).append('<h1 class="pageTitle">'+page['name']+'</h1><p class="pageDescription">'+page['description']+'</p>');
            $('#list-'+page['type']).find('#'+pageName).click(function(){window.location.href=pageName;});
        });
    }
})
