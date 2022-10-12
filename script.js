$(window).on('load', function(){
    pages = [];
    types = ["project", "blog"];
    types.forEach(type =>{
        for (let i=0; i<$("#list-"+type).children(".page").length; i++){
            pages.push($("#list-"+type).children(".page")[i].id);
        }
    })
    pages.forEach(pageName => {
        $.getJSON("./"+pageName+"/metadata.json", function(page){
            $('#list-'+page['type']).find('#'+pageName).append('<h1 class="pageTitle">'+page['name']+'</h1><p class="pageDescription">'+page['description']+'</p>');
            $('#list-'+page['type']).find('#'+pageName).click(function(){window.location.href=pageName;});
        });
    });

})
