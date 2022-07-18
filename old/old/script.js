function getRequest(url){
    const http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return JSON.parse(http.responseText)
  }
  var userData = getRequest("https://api.github.com/users/Jeffser");
  var reposData = getRequest("https://api.github.com/users/Jeffser/repos")
  var schlData = getRequest("https://api.github.com/repos/Jeffser/Jeffser.github.io/contents/school")
  
  function refreshData(){
    var repos = "<div id='title'>GitHub Repositories</div>"
    document.getElementById("name").innerHTML = userData["name"]
    reposData.forEach(repo => repos += "<div id='data'><div id='name'><button onclick='window.location.href="+'"'+repo['html_url']+'"'+";'>"+repo['name']+"</button></div><div id='description'>"+repo['description']+"</div></div>")
    repos += "<div id='footer'></div>"
    document.getElementById("repos").innerHTML = repos

    var schl = "<div id='title'>School Projects</div>"
    schlData.forEach(prj => schl += "<div id='data'><div id='name'><button onclick='window.location.href="+'"school/'+prj['name']+'"'+";'>"+prj['name']+"</button></div></div>")
    schl += "<div id='footer'></div>"
    document.getElementById("schl").innerHTML = schl
  }
  window.onload = refreshData;