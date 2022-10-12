let properties = {'width': 70, 'height': 30, 'size': '1vw'}
let defaultColor = 'transparent'
let wallColor = 'white'
let ghostColor = 'rgba(0,0,0,0)'
var blocks = []
var tool = 'blue'
let running = true
let textures = false
function start(){running = true}
function changeTool(element){
    tool = element.value
    var elements = document.getElementsByTagName('button')
    for (let i=0;i<elements.length;i++){
        elements[i].style.border = "none"
        elements[i].style.borderBottom="solid 5px var(--tertiaryColor)"
    }
    element.style.border="solid 5px "+element.value
}
function changeTextures(element){
    textures = !textures
    if (textures){element.style.border = "solid 5px cyan"}
    else {element.style.border = "none"; element.style.borderBottom="solid 5px var(--tertiaryColor)"}
}
function getBlock([x,y]){return blocks[y][x].style.backgroundColor}
function setBlock([x,y],color='black'){
    blocks[y][x].style.backgroundColor = color
    if (textures){blocks[y][x].style.filter = "brightness("+(95+Math.floor(Math.random()*5))+"%)"}
}

function getBlocksAround([x,y]){
    var stuff = []
    if (x-1>=0&&y-1>=0){stuff.push(getBlock([x-1,y-1]))}
    else{stuff.push(wallColor)}
    if (y-1>=0){stuff.push(getBlock([x,y-1]))}
    else{stuff.push(wallColor)}
    if (x+1<blocks[y].length&&y-1>=0){stuff.push(getBlock([x+1,y-1]))}
    else{stuff.push(wallColor)}
    if (x-1>=0){stuff.push(getBlock([x-1,y]))}
    else{stuff.push(wallColor)}
    if (x+1<blocks[y].length){stuff.push(getBlock([x+1,y]))}
    else{stuff.push(wallColor)}
    if (x-1>=0&&y+1<blocks.length){stuff.push(getBlock([x-1,y+1]))}
    else{stuff.push(wallColor)}
    if (y+1<blocks.length){stuff.push(getBlock([x,y+1]))}
    else{stuff.push(wallColor)}
    if (x+1<blocks[y].length&&y+1<blocks.length){stuff.push(getBlock([x+1,y+1]))}
    else{stuff.push(wallColor)}
    return stuff
}

$(window).on('load', function(){
    document.getElementById('main2').addEventListener('contexmenu', function(e){e.preventDefault(); getDevelopmentStatus();})
    document.documentElement.style.setProperty('--size', properties['size'])
    for (let y=0; y<properties['height']; y++){
        blocks.push([])
        for (let x=0; x<properties['width']; x++){
            blocks[y].push(document.createElement('div'))
            blocks[y][x].className = 'block'
            blocks[y][x].style.backgroundColor = defaultColor
            blocks[y][x].id = x+'-'+y
            blocks[y][x].addEventListener('mouseover', function(e){
                e.stopPropagation();
                e.preventDefault();
                if (e.buttons == 1){
                    var source = e.target || e.srcElement
                    setBlock(source.id.split('-'), tool)
                }
                return false;
            })
            blocks[y][x].addEventListener('dragstart', function(){return false})
            blocks[y][x].addEventListener('dragmove', function(){return false})
            blocks[y][x].addEventListener('contexmenu', function(e){e.preventDefault(); getDevelopmentStatus();})
            document.getElementById('main2').appendChild(blocks[y][x])
        }
        document.getElementById('main2').appendChild(document.createElement('br'))
    }
    window.setInterval(function(){
        if (running){
            let changes = []
            for (let y=0; y<properties['height']; y++){
                
                for (let x=0; x<properties['width']; x++){
                    if (getBlock([x,y])!=defaultColor&&getBlock([x,y])!=ghostColor&&getBlock([x,y])!=wallColor){
                        let around = getBlocksAround([x,y])
                        switch (getBlock([x,y])){
                        case 'blue':
                            if(around[6]==defaultColor){
                                setBlock([x,y+1],ghostColor)
                                changes.push([[x,y],around[6],[x,y+1],'blue'])
                            }else if(around[3]==defaultColor&&around[5]==defaultColor){
                                setBlock([x-1,y+1],ghostColor)
                                changes.push([[x,y],around[3],[x-1,y+1],'blue'])
                            }else if(around[4]==defaultColor&&around[7]==defaultColor){
                                setBlock([x+1,y+1],ghostColor)
                                changes.push([[x,y],around[4],[x+1,y+1],'blue'])
                            }else if(around[3]==defaultColor){
                                setBlock([x-1,y],ghostColor)
                                changes.push([[x,y],around[3],[x-1,y],'blue'])
                            }else if(around[4]==defaultColor){
                                setBlock([x+1,y],ghostColor)
                                changes.push([[x,y],around[4],[x+1,y],'blue'])
                            } break
                        case 'yellow':
                            if (around[6]==defaultColor||around[6]=='blue'){
                                setBlock([x,y+1],ghostColor)
                                changes.push([[x,y],around[6],[x,y+1],'yellow'])
                            }else if((around[3]==defaultColor||around[3]=='blue')&&(around[5]==defaultColor||around[5]=='blue')){
                                setBlock([x-1,y+1],ghostColor)
                                changes.push([[x,y],around[3],[x-1,y+1],'yellow'])
                            }else if((around[4]==defaultColor||around[4]=='blue')&&(around[7]==defaultColor||around[7]=='blue')){
                                setBlock([x+1,y+1],ghostColor)
                                changes.push([[x,y],around[4],[x+1,y+1],'yellow'])
                            }
                    }
                    }
                }
            }
            changes.forEach(change => {
                setBlock(change[0],change[1])
                setBlock(change[2],change[3])
            });
        }
    }, 10)
})