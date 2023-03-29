key = ''
id = ''
$(window).on('load', function(){
    key = prompt('Llave');
    id = new Date().toLocaleString();
});

function showMessage(sender, msg){
    $("#chat").append('<div class="message-box"><div class="' + sender + '">' + msg + '</div></div>');
    $("#chat").scrollTop($("#chat")[0].scrollHeight);
    $.ajax({
        dataType: "json",
        method: "POST",
        url: "http://api.jeffser.com/api/chat/message",
        data: {key: key, msg: msg, id: id},
    }).done(function(data){
        console.log(data);
    });
}