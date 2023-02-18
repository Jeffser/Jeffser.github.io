var code = {}
function dropDown(id){
    if ($('#'+id).css('display')=='block'){
        $('#'+id).css('opacity', '0');
        setTimeout(function(){$('#'+id).css('display', 'none');}, 200);
    }
    else{
        $('#'+id).css('display', 'block');
        setTimeout(function(){$('#'+id).css('opacity', '1');}, 200);
        
    }
}
function downloadCode(id){
    console.log(code[id])
    var a = document.createElement("a"),
    file = new Blob([code[id]['code']], {type: 'text/plain'});
    console.log(file)
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, code[id]['name']);
    else { // Others
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = code[id]['name'];
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 1000); 
    }
}
function showCode(id){
    richAlert('<h1 class="tertiaryText title" onclick="downloadCode(\'' + id + '\')" style="cursor: pointer" title="Download: ' + code[id]['name'] + '">' + code[id]['name'] + '</h1>' + code[id]['code'].split('\n')[0].replace('#', '') + '<pre><code class="language-python">' + code[id]['code'].split('\n').slice(1).join('\n') + '</code></pre>', width = "50vw");
    hljs.highlightAll();
}
$(window).on('load', function(){
    $.getJSON("data.json", function(works){
        for (const [key, value] of Object.entries(works)){
            $('#sub0').append('<h1 class="tertiaryText title dropDownButton" onclick="dropDown(\'sub1-' + key.replace(/ /g, '_') + '\')" style="font-size: 6vmin">' + key + '</h1><div class="subdivision" id="sub1-' + key.replace(/ /g, '_') + '"></div>')
            for (const [key2, value2] of Object.entries(value)){
                $('#sub1-' + key.replace(/ /g, '_')).append('<h2 class="tertiaryText title dropDownButton" onclick="dropDown(\'sub2-' + key.replace(/ /g, '_') + '-' + key2.replace(/ /g, '_') + '\')">' + key2 + '</h2><div class="subdivision" id="sub2-' + key.replace(/ /g, '_') + '-' + key2.replace(/ /g, '_') + '"></div>')
                value2.forEach(file => {
                    $('#sub2-' + key.replace(/ /g, '_') + '-' + key2.replace(/ /g, '_')).append('<div class="work" onclick="showCode(this.id)" id="' + key.replace(/ /g, '_') + '-' + key2.replace(/ /g, '_') + '-' + file['name'].replace(/ /g, '_').replace('.py', '') + '"><h1 class="workTitle">' + file['name'].replace('.py', '') + '</h1><p class="workDescription">' + file['description'] + '</p></div>')
                    code[key.replace(/ /g, '_') + '-' + key2.replace(/ /g, '_') + '-' + file['name'].replace(/ /g, '_').replace('.py', '')] = {'code': file['code'], 'name': file['name']}
                });
            }
        }
    });
});