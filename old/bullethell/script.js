var character = document.createElement('div')
character.style.backgroundColor = 'white'
character.style.top = window.innerHeight/2 + 'px'
character.style.left = window.innerWidth/2 + 'px'
character.style.width = '25px'
character.style.height = '25px'
character.style.borderRadius = '5px'
character.id = 'character'
character.style.position = 'fixed'
var enemies = []
var bullets = []
var scoreboard = [['Jeffry', 980]]
var points = 0
class bullet{
    constructor(ix, iy, deg){
        this.x = ix;
        this.y = iy;
        this.deg = deg;
        this.object = document.createElement('div');
        this.object.style.backgroundColor = 'yellow';
        this.object.style.top = this.y + 'px';
        this.object.style.left = this.x + 'px';
        this.object.style.width = '10px';
        this.object.style.height = '10px';
        this.object.style.borderRadius = '10px';
        this.object.className ='bullet';
        this.object.style.position = 'fixed';
        document.getElementById('game').appendChild(this.object);
    }
    move(){
        this.x -= Math.sin(this.deg * (Math.PI/180)) * 50
        this.y += Math.cos(this.deg * (Math.PI/180)) * 50
        this.object.style.left = this.x + 'px'
        this.object.style.top = this.y + 'px'
        if (this.x<0||this.x>window.innerWidth||this.y<0||this.y>window.innerHeight){return true}
    }
}
class enemy{
    constructor(ix, iy, speed){
        this.speed = speed
        this.x = ix;
        this.y = iy;
        this.health = 1;
        this.object = document.createElement('div');
        this.object.style.backgroundColor = 'red';
        this.object.style.top = this.y + 'px';
        this.object.style.left = this.x + 'px';
        this.object.style.width = speed * 3 + 'px';
        this.object.style.height = speed * 3 + 'px';
        this.object.style.borderRadius = speed * 3 + 'px';
        this.object.className = 'enemy';
        this.object.style.position = 'fixed';
        document.getElementById('game').appendChild(this.object);
    }
    hit(){
        this.health = this.health - 1;
        if (this.health < 1){return true}
    }
    move(cx, cy){
        if (cx-this.speed>this.x){this.x+=this.speed}
        else if (cx+this.speed<this.x){this.x-=this.speed}
        if (cy-this.speed>this.y){this.y+=this.speed}
        else if (cy+this.speed<this.y){this.y-=this.speed}
        this.object.style.left = this.x + 'px'
        this.object.style.top = this.y + 'px'
    }
}

var prp = {'speed': 10, 'x': window.innerWidth/2, 'y': window.innerHeight/2, 'x2': 0, 'y2': 0, 'shooting': false}

function refreshCharacter(){
    if (prp['x']>window.innerWidth){prp['x']=window.innerWidth}
    else if (prp['x']<0){prp['x']=0}
    if (prp['y']>window.innerHeight){prp['y']=window.innerHeight}
    else if (prp['y']<0){prp['y']=0}
    character.style.left = prp['x'] + 'px'
    character.style.top = prp['y'] + 'px'
    character.style.transform = 'rotate('+(Math.atan2(prp['x2'], prp['y2']) * (180 / Math.PI)).toFixed(0)+'deg)'
}

window.addEventListener('gamepadconnected', (event) => {
    const update = () => {
        for (const gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            for (const [index, axis] of gamepad.axes.entries()) {
                if (index == 0 && (axis > 0.1 || axis < -0.1)){prp['x'] += prp['speed'] * axis.toFixed(1)}
                else if (index == 1 && (axis > 0.1 || axis < -0.1)){prp['y'] += prp['speed'] * axis.toFixed(1)}
                else if (index == 2 && (axis > 0.1 || axis < -0.1)){prp['x2'] = -axis.toFixed(1)}
                else if (index == 3 && (axis > 0.1 || axis < -0.1)){prp['y2'] = axis.toFixed(1)}
            }
            for (const [index, button] of gamepad.buttons.entries()) {
                if (index == 5 && button.value > 0.6 && !prp['shooting']){//if (index == 7 && button.value > 0.6 && !prp['shooting']){
                    prp['shooting'] = true
                    bullets.push(new bullet(prp['x'], prp['y'], (Math.atan2(prp['x2'], prp['y2']) * (180 / Math.PI)).toFixed(0)))
                }
                else if (index == 5 && button.value < 0.6){prp['shooting'] = false}
                if (index == 9 && button.pressed){alert('Pausa')}
            }
            refreshCharacter()
        }
        requestAnimationFrame(update);
    };
    update();
});

function load(){
    scoreboard.sort((a, b) => b[1] - a[1])
    for (var i=0; i<scoreboard.length; i++){document.getElementById('scoreboard').innerHTML += '<p><b>'+scoreboard[i][0]+'</b> '+scoreboard[i][1]+'</p>'}
    document.getElementById('game').appendChild(character)
    let pos = 0;
    id = window.setInterval(frame, 30);
    enemies.push(new enemy(Math.round(Math.random())*window.innerWidth, Math.random() * window.innerHeight, Math.random() * (15 - 4) + 4))
    function frame() {
        if (pos == 25) {
            enemies.push(new enemy(Math.round(Math.random())*window.innerWidth, Math.random() * window.innerHeight, Math.random() * (15 - 4) + 4))
            pos = 0
        } else {
            pos++
            for (var i=0; i<bullets.length; i++){
                if (bullets[i].move()) {bullets[i].object.remove(); bullets.splice(i, 1)}
                for (var a=0; a<enemies.length; a++){
                    if (enemies[a].x - bullets[i].x < enemies[a].speed*3 && enemies[a].x - bullets[i].x > -enemies[a].speed*3 && enemies[a].y - bullets[i].y < enemies[a].speed*3 && enemies[a].y - bullets[i].y > -enemies[a].speed*3){
                        bullets[i].object.remove()
                        bullets.splice(i, 1)
                        if (enemies[a].hit()){
                            points += parseInt(enemies[a].speed)
                            document.getElementById('score').innerHTML = 'Puntos: ' + points
                            enemies[a].object.remove()
                            enemies.splice(a, 1)
                        }
                    }
                }
            }
            for (var i=0; i<enemies.length; i++){
                enemies[i].move(prp['x'], prp['y'])
                if (enemies[i].x - prp['x'] < prp.speed*3 && enemies[i].x - prp['x'] > -prp.speed*3 && enemies[i].y - prp['y'] < prp.speed*3 && enemies[i].y - prp['y'] > -prp.speed*3){
                    scoreboard.push(['', points])
                    scoreboard.sort((a, b) => b[1] - a[1])
                    document.getElementById('scoreboard').innerHTML = ''
                    for (var i=0; i<scoreboard.length; i++){document.getElementById('scoreboard').innerHTML += '<p><b>'+scoreboard[i][0]+'</b> '+scoreboard[i][1]+'</p>'}
                    prp = {'speed': 10, 'x': window.innerWidth/2, 'y': window.innerHeight/2, 'x2': 0, 'y2': 0, 'shooting': false}
                    for (var i=0; i<bullets.length; i++){bullets[i].object.remove()}
                    for (var i=0; i<enemies.length; i++){enemies[i].object.remove()}
                    bullets = []
                    enemies = []
                    points = 0
                    document.getElementById('score').innerHTML = 'Puntos: ' + points
                }   
            }
        }
    }   
}
window.onload = load()
window.onbeforeunload = function() {return 'No'}
