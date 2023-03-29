function showMessage(sender, msg){
    $("#chat").append('<div class="message-box"><div class="' + sender + '">' + msg + '</div></div>');
    $("#chat").scrollTop($("#chat")[0].scrollHeight);
}