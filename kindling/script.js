document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);
var start, end, baseMargin, infoOpen, locked
locked = false
infoOpen = false
function scrollInfo(evt){
    if (document.getElementById('info').scrollTop + 10 >= (document.getElementById('info').scrollHeight - document.getElementById('info').offsetHeight)){
        document.getElementById('bottomGradient').style.height = '0'
        document.getElementById('bottomGradient').style.opacity = '0'
        document.getElementById('bottomGradient').style.left = '6vw'
        document.getElementById('bottomGradient').style.right = '6vw'
    }
    else{
        document.getElementById('bottomGradient').style.height = '10%'
        document.getElementById('bottomGradient').style.opacity = '1'
        document.getElementById('bottomGradient').style.left = '4vw'
        document.getElementById('bottomGradient').style.right = '4vw'
    }
}
function vwToPx(vw) {
    return document.documentElement.clientWidth * (vw / 100)
}
function isTouchingInformation(){
    return start['element'] == document.getElementById('bottomGradient') || start['element'].parentElement.parentElement == document.getElementById('info') || start['element'].parentElement == document.getElementById('info') || start['element'] == document.getElementById('info') || start['element'] == document.getElementById('nameAge')
}
function handleTouchStart(evt) {
    start = { 'x': evt.changedTouches[0].clientX, 'y': evt.changedTouches[0].clientY, 'element': evt.srcElement }
};
function handleTouchEnd(evt) {
    end = { 'x': evt.changedTouches[0].clientX, 'y': evt.changedTouches[0].clientY }
    if (start['y'] - end['y'] > document.documentElement.clientHeight * .1 && infoOpen == false && document.getElementById('info').style.height == '30vh') {
        document.getElementById('info').style.height = 'calc(100% - 12vw - ' + document.getElementsByTagName('header')[0].offsetHeight + 'px)'
        document.getElementById('info').style.overflowY = 'auto'
        infoOpen = true
        return
    }
    if (start['y'] - end['y'] > document.documentElement.clientHeight * .1 && document.getElementById('info').style.height == '15vh') {
        document.getElementById('info').style.height = '30vh'
        document.getElementById('info').style.overflowY = 'hidden'
        infoOpen = false
        return
    }
    else if (start['y'] - end['y'] < document.documentElement.clientHeight * .1 && infoOpen == true && document.getElementById('info').scrollTop == 0) {
        document.getElementById('info').scrollTop = 0
        document.getElementById('info').style.height = '30vh'
        document.getElementById('info').style.overflowY = 'hidden'
        infoOpen = false
        return
    }
    else if (start['y'] - end['y'] < document.documentElement.clientHeight * .1 && (Math.abs(start['y'] - end['y'])*1.5 > Math.abs(start['x'] - end['x'])) && infoOpen == false){
        document.getElementById('info').style.height = '15vh'
        document.getElementById('info').style.overflowY = 'hidden'
        infoOpen = false
        return
    }
    if (start['x'] - evt.changedTouches[0].clientX + 40 < 0 - (document.documentElement.clientWidth * .1) && isTouchingInformation()==false) document.getElementById('rightIndicator').style.opacity = '1'
    else document.getElementById('rightIndicator').style.opacity = '0'
    if (start['x'] - end['x'] - 40 > document.documentElement.clientWidth * .1 && isTouchingInformation()==false) document.getElementById('leftIndicator').style.opacity = '1'
    else document.getElementById('leftIndicator').style.opacity = '0'
    //if (infoOpen) return
    document.getElementById('card').style.transition = '.2s'
    locked = true
    if (document.getElementById('rightIndicator').style.opacity == '1') { document.getElementById('card').style.opacity = '0'; document.getElementById('card').style.marginLeft = document.documentElement.clientWidth + 'px'; document.getElementById('card').style.marginRight = '-' + document.documentElement.clientWidth + 'px';}
    if (document.getElementById('leftIndicator').style.opacity == '1') { document.getElementById('card').style.opacity = '0'; document.getElementById('card').style.marginRight = document.documentElement.clientWidth + 'px'; document.getElementById('card').style.marginLeft = '-' + document.documentElement.clientWidth + 'px';}
    if (document.getElementById('rightIndicator').style.opacity == '0' && document.getElementById('leftIndicator').style.opacity == '0') {document.getElementById('card').style.margin = baseMargin + 'px'; locked=false; return}
    document.getElementById('info').style.height = '15vh'
    setTimeout(function () {
        document.getElementById('rightIndicator').style.opacity = '0'
        document.getElementById('leftIndicator').style.opacity = '0'
        document.getElementById('card').style.margin = baseMargin + 'px'
        document.getElementById('info').style.overflowY = 'hidden'
        document.getElementById('card').style.opacity = '1'
        document.getElementById('info').style.height = '30vh'
        setTimeout(function () {
            document.getElementById('card').style.transition = '0s'
            locked = false
        }, 1000)
    }, 500)

}
function handleTouchMove(evt) {
    if (locked || infoOpen) return
    if (start['element'].parentElement.parentElement == document.getElementById('info') || start['element'].parentElement == document.getElementById('info') || start['element'] == document.getElementById('info') || start['element'] == document.getElementById('nameAge')) return
    const prc = (evt.changedTouches[0].clientX - (document.documentElement.clientWidth / 2)) * 2 / document.documentElement.clientWidth
    if (Math.abs(start['y'] - evt.changedTouches[0].clientY)*1.5 > Math.abs(start['x'] - evt.changedTouches[0].clientX)) return
    //isTouchingInformation()||
    if (evt.changedTouches[0].clientX - start['x'] > 0) {
        document.getElementById('card').style.marginRight = baseMargin / (1 + prc) + 'px'
        document.getElementById('card').style.marginLeft = (1 + prc) * baseMargin + 'px'
        document.getElementById('card').style.opacity = (1 - prc + .5)
    }
    else {
        document.getElementById('card').style.marginRight = (1 - prc) * baseMargin + 'px'
        document.getElementById('card').style.marginLeft = baseMargin / (1 - prc) + 'px'
        document.getElementById('card').style.opacity = (1 + prc + .5)
    }
    if (start['x'] - evt.changedTouches[0].clientX + 40 < 0 - (document.documentElement.clientWidth * .1) && isTouchingInformation()==false) document.getElementById('rightIndicator').style.opacity = '.5'
    else document.getElementById('rightIndicator').style.opacity = '0'
    if (start['x'] - evt.changedTouches[0].clientX - 40 > document.documentElement.clientWidth * .1 && isTouchingInformation()==false) document.getElementById('leftIndicator').style.opacity = '.5'
    else document.getElementById('leftIndicator').style.opacity = '0'
};
window.onload = function () {
    document.getElementById('leftIndicator').style.opacity = '0'
    document.getElementById('rightIndicator').style.opacity = '0'
    baseMargin = vwToPx(4)
    document.getElementById('card').style.margin = baseMargin + 'px'
    document.getElementById('info').style.height = '30vh'
    document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#5d5dd0');
    document.getElementById('info').addEventListener('scroll', scrollInfo, false);
}