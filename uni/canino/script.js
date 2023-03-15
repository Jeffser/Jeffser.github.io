function delay(time){return new Promise(resolve => setTimeout(resolve, time));}

async function mostrarFrase(frase){
    $('#text-wrapper').html('Pensando...');
    await delay(1000);
    $('#text-wrapper').html('');
    for (const letra of frase.split('')){
        await delay(50);
        $('#text-wrapper').append(letra);
    }
}

$(window).on('load', function(){
    $("#mic-wrapper").contextmenu(function(e){e.preventDefault();})

    if (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)){
        $("#mic-wrapper").bind('touchstart', function(){
            $('#mic').attr('src', 'mic.webp');
            $('#text-wrapper').html('Escuchando...');
            $('#mic').attr('listening', 'true');
        }).bind('touchend', function(){
            $('#mic').attr('src', 'mic_still.png');
            $('#mic').attr('listening', 'false');
            $.getJSON('frases.json', function(frases){mostrarFrase(frases[Math.floor(Math.random()*frases.length)]);});
        });
    }
    else{
        $('#mic-wrapper').mousedown(function(){
            $('#mic').attr('src', 'mic.webp');
            $('#text-wrapper').html('Escuchando...');
            $('#mic').attr('listening', 'true');
        });
        $('#mic-wrapper').mouseup(function(){
            $('#mic').attr('src', 'mic_still.png');
            $('#mic').attr('listening', 'false');
            $.getJSON('frases.json', function(frases){mostrarFrase(frases[Math.floor(Math.random()*frases.length)]);});
        });
    }
});