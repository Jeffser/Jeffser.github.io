function ingreso(clave, dir){
    if (clave.value=='123'){window.location=dir+'admin'}
    else if (clave.value=='321'){
        var video = document.createElement('video')
        video.autoplay = true
        video.muted = false
        video.loop = true
        video.id = 'wenamechainsama'
        video.setAttribute('src', dir + 'media/wenamechainsama.mp4')
        video.style.position = 'fixed'
        video.style.top = '0'
        video.style.left = '0'
        video.style.width = '100%'
        video.style.height = '100%'
        video.style.zIndex = '-1'
        document.body.style.backgroundColor = 'transparent'
        document.body.appendChild(video)
        document.getElementById('Ingreso').style.display = 'none'
        document.getElementsByTagName('section')[1].style.display = 'none'
        document.getElementsByTagName('section')[2].style.display = 'none'
    }
    else{clave.style.borderColor='red'}
}
