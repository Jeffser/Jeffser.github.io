$(window).on('load', function(){
    $.getJSON('./data.json', function(works){
    for (const [subject, contentSubject] of Object.entries(works)){
        $('#main').append('<div><h2>' + subject + '</h2><div class="button-list" id="' + subject.replace(/ /g, '_') + '"></div></div>');
        for (const [week, contentWeek] of Object.entries(contentSubject)){
            $('#' + subject.replace(/ /g, '_')).append('<a onclick="showWeek(\''+ subject + '\', \'' + week + '\')">' + week + '</a>');
        }
    }
    });
});
function showWeek(subject, week){
    richAlert('<div><h2>' + subject + '</h2><h3>' + week + '</h3><div class="button-list" id="work-ra-list"></div></div>');
    $.getJSON('./data.json', function(works){
        i = 0;
        works[subject][week].forEach(work => {
            $('#work-ra-list').append('<a onclick="showCode(\''+ subject + '\', \'' + week + '\', \'' + i + '\')">' + work['name'] + '</a>');
            i += 1;
        });
    });
}
function showCode(subject, week, index){
    $.getJSON('./data.json', function(works){
        richAlert('<h1 class="tertiaryText title" onclick="downloadCode(\''+ subject + '\', \'' + week + '\', \'' + i + '\')" style="cursor: pointer" title="Download: ' + works[subject][week][index]['name'] + '">' + works[subject][week][index]['name'] + '</h1>' + works[subject][week][index]['code'].split('\n')[0].replace('#', '') + '<pre><code class="language-python">' + works[subject][week][index]['code'].split('\n').slice(1).join('\n') + '</code></pre>', width = "50vw");
        hljs.highlightAll();
    });
}