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
})
