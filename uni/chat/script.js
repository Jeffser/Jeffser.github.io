function showMessage(sender, msg){
    $("#chat").append('<div class="message-box"><div class="' + sender + '">' + msg + '</div></div>');
    $("#chat").scrollTop($("#chat")[0].scrollHeight);
    $.ajax({
        dataType: "json",
        method: "POST",
        url: "https://jeffser.com/chat.php",
        data: {pass: "samuel1202", text: msg},
    }).done(function(data){
        console.log(data);
    });
}