function showProduct(codigo, precio, scroll){
    $("body").css("overflow-y", "hidden");
    $("#showcase-container").css("display", "block");
    $("#showcase").css("display", "block");
    $("#showcase-container").click(function(){
        $("body").css("overflow-y", "overlay");
        $("#showcase-container").css("display", "none");
        $("#showcase").css("display", "none");
        window.history.replaceState({}, document.title, "/");
    });
    $("#showcase").html('<div class="showcase-product" id="' + codigo + '"><img src="images/' + codigo + '.webp"><h1>' + precio + '</h1><a href="https://instagram.com" id="insta-link"><img src="instagram.webp"><p>Contactanos</p></a></div>');
    if (scroll){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#" + codigo).offset().top - 100
        }, 0);
    }
}

$(window).on("load", function(){
    $.getJSON("./data.json", function(data){
        rawProducts = {};
        for (const [category, products] of Object.entries(data)) {
            $("section#products").append('<section id="' + category + '"><h1>' + category + '</h1></section>');
            products.forEach(product => {
                if (product['mostrar']){
                    rawProducts[product['codigo']] = product['precio'];
                    $("section#"+category).append('<a href="?c=' + product['codigo'] + '" class="product" id="' + product['codigo'] + '"><img src="images/' + product['codigo'] + '.webp"><h1>' + product['precio'] + '</h1></a>');
                    $("a#" + product['codigo']).unbind('click');
                    $("a#" + product['codigo']).click(function(){
                        window.history.pushState({}, document.title, "/?c=" + product['codigo']);
                        showProduct(product['codigo'], product['precio'], false);
                        return false;
                    });
                }
            });
        }
        codigo = new URLSearchParams(window.location.search).get('c');
        if (codigo != null) showProduct(codigo, rawProducts[codigo], true);
    });
});