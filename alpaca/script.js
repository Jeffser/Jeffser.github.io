document.oncontextmenu = new Function("return false;")
window.ondragstart = function () { return false }

document.addEventListener( 'DOMContentLoaded', function () {
    new Splide( '#image-carousel',{
        type:'loop',
    } ).mount();
  } );  