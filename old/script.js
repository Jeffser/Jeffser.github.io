function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
}
function refreshData(){
    var widgets = []
    //About Me
    widgets.push({'title': 'About Me', 'content': 'Hello, my name is Jeffry, I am a software development student and also a hardworking person with a dream of being the best developer I can be.'})
    //Repositories
    widgets.push({'title': 'Repositories', 'content': 'These are my public Github repos.<br><ul>'})
    getRequest('https://api.github.com/users/jeffser/repos').forEach(repo => widgets[widgets.length-1]['content'] += '<li><a href="'+repo['html_url']+'">'+repo['name']+'</a></li>')
    widgets[widgets.length-1]['content'] += '</ul>'
    //School Projects
    widgets.push({'title': 'School Projects', 'content': 'These are my web related school projects, they do not have the same quality level as my main web page.<br><ul>'})
    getRequest('https://api.github.com/repos/Jeffser/Jeffser.github.io/contents/school').forEach(schl => widgets[widgets.length-1]['content'] += '<li><a href="school/'+schl['name']+'">'+schl['name'].charAt(0).toUpperCase()+schl['name'].slice(1)+'</a>')
    widgets[widgets.length-1]['content'] += '</ul>'
    //Blog
    widgets.push({'title': 'Blog', 'content': 'Wanna know what I do in my free time? (for some reason) well you are in luck my friend because I have a blog! <a href="blog">Right here</a>'})
    //Music
    widgets.push({'title': 'Music Taste', 'content': 'What I listen to.<br>'}) 
    var num = 0
    getRequest('https://raw.githubusercontent.com/Jeffser/Jeffser.github.io/main/music.json').forEach(song => {widgets[widgets.length-1]['content'] += '<div class="song" id="'+num+'" style="background-image: url(https://img.youtube.com/vi/'+song['id']+'/maxresdefault.jpg)"><a href="https://music.youtube.com/watch?v='+song['id']+'">'+song['title']+'</a><br>'+song['author']+'</div>'; num++})
    //Muse
    widgets.push({'title': 'Muse', 'content': 'A collection of the music I enjoy <a href="muse">here.</a><br>Btw this is my best page so take a look'})
    //BulletHell
    widgets.push({'title': 'Bullet Hell', 'content': 'Try my newest game <a href="bullethell">here.</a><br>It isn\'t that good but still you should play it.'})
    
    //Set
    widgets.forEach(widget => document.getElementsByTagName('body')[0].innerHTML += '<div class="widget" id="'+widget['title'].replace(/ /g,"_")+'"><section id="title">'+widget['title']+'</section><section id="content">'+widget['content']+'</section></div>')
}
window.onload = refreshData()
