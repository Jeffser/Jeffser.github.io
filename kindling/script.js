document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);
var start, end, baseMargin, infoOpen
infoOpen = false
function vwToPx(vw) {
    return document.documentElement.clientWidth * (vw / 100)
}
function isTouchingInformation(){
    return true
    return start['element'].parentElement.parentElement == document.getElementById('info') || start['element'].parentElement == document.getElementById('info') || start['element'] == document.getElementById('info') || start['element'] == document.getElementById('nameAge')
}
function handleTouchStart(evt) {
    start = { 'x': evt.changedTouches[0].clientX, 'y': evt.changedTouches[0].clientY, 'element': evt.srcElement }
    console.log(start['element'].parentElement)
};
function handleTouchEnd(evt) {
    end = { 'x': evt.changedTouches[0].clientX, 'y': evt.changedTouches[0].clientY }
    if (isTouchingInformation() && start['y'] - end['y'] > document.documentElement.clientHeight * .1) {
        document.getElementById('info').style.height = 'calc(100% - 12vw - ' + document.getElementsByTagName('header')[0].offsetHeight + 'px)'
        document.getElementById('info').style.overflowY = 'auto'
        infoOpen = true
        return
    }
    if (start['element'] == document.getElementById('nameAge') && start['y'] - end['y'] < document.documentElement.clientHeight * .1) {
        document.getElementById('info').style.height = '30vh'
        document.getElementById('info').style.overflowY = 'hidden'
        infoOpen = false
        return
    }
    //if (infoOpen) return
    document.getElementById('card').style.transition = '.2s'
    if (document.getElementById('rightIndicator').style.opacity != '0') { document.getElementById('card').style.opacity = '0'; document.getElementById('card').style.marginLeft = document.documentElement.clientWidth + 'px'; document.getElementById('card').style.marginRight = '-' + document.documentElement.clientWidth + 'px'; document.getElementById('rightIndicator').style.opacity = '1'}
    if (document.getElementById('leftIndicator').style.opacity != '0') { document.getElementById('card').style.opacity = '0'; document.getElementById('card').style.marginRight = document.documentElement.clientWidth + 'px'; document.getElementById('card').style.marginLeft = '-' + document.documentElement.clientWidth + 'px'; document.getElementById('leftIndicator').style.opacity = '1'}
    if (document.getElementById('rightIndicator').style.opacity == '0' && document.getElementById('leftIndicator').style.opacity == '0') document.getElementById('card').style.margin = baseMargin + 'px'
    setTimeout(function () {
        document.getElementById('rightIndicator').style.opacity = '0'
        document.getElementById('leftIndicator').style.opacity = '0'
        document.getElementById('card').style.margin = baseMargin + 'px'
        document.getElementById('card').style.opacity = '1'
        setTimeout(function () { document.getElementById('card').style.transition = '0s' }, 500)
    }, 500)

}
function handleTouchMove(evt) {
    const prc = (evt.changedTouches[0].clientX - (document.documentElement.clientWidth / 2)) * 2 / document.documentElement.clientWidth
    if (Math.abs(start['y'] - evt.changedTouches[0].clientY)*1.5 > Math.abs(start['x'] - evt.changedTouches[0].clientX)) return
    if (infoOpen) return //isTouchingInformation()||
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
    if (evt.changedTouches[0].clientX < document.getElementById('leftIndicator').offsetWidth && Math.abs(start['x'] - evt.changedTouches[0].clientX) > document.documentElement.clientWidth * .2) document.getElementById('leftIndicator').style.opacity = '1'
    else document.getElementById('leftIndicator').style.opacity = '0'
    if (evt.changedTouches[0].clientX > document.documentElement.clientWidth - document.getElementById('rightIndicator').offsetWidth && Math.abs(start['x'] - evt.changedTouches[0].clientX) > document.documentElement.clientWidth * .2) document.getElementById('rightIndicator').style.opacity = '1'
    else document.getElementById('rightIndicator').style.opacity = '0'
};
window.onload = function () {
    baseMargin = vwToPx(4)
    document.getElementById('card').style.margin = baseMargin + 'px'

}