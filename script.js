$(window).on("load", function(){
    $.getJSON("./data.json", function(data){
        for (const [category, products] of Object.entries(data)) {
            $("section#products").append('<section id="' + category + '"><h1>' + category + '</h1></section>');
            products.forEach(product => {
                $("section#"+category).append('<div id="' + product['codigo'] + '"><img src="images/' + product['imagen'] + '"><h1>' + product['precio'] + '</h1></div>');
            });
        }
    });
});