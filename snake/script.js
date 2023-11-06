var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var table = document.getElementById('table');
var spaces = prompt("Cardinalidad de la matriz A");
var grid = canvas.width / spaces;
var count = 0;
document.getElementById("stats").style.width = canvas.width + "px"
document.getElementById("orden").innerText = "A es una matriz de orden " + spaces

for (let y=0; y<spaces; y++) {
    table.append(document.createElement("tr"))
    for (let x=0; x<spaces; x++) {
        document.getElementById('table').lastChild.append(document.createElement("td"));
        document.getElementById('table').lastChild.lastChild.id = x + "-" + y;
    }
}

var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    setTimeout(function () {
        requestAnimationFrame(loop);
    }, 20)

    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    document.querySelectorAll("td").forEach( el => {
        el.innerText = "";
    });

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    document.getElementById(apple.x / grid + "-" + apple.y / grid).innerText = "M";
    document.getElementById("manzana").innerText = "Manzana A(" + (apple.x / grid) + "," + (apple.y / grid) + ")";

    
    
    let head = true;
    snake.cells.forEach(function (cell, index) {
        if (head) {
            context.fillStyle = 'yellow';
            document.getElementById(cell.x / grid + "-" + cell.y / grid).innerText = "C";
            document.getElementById("cabeza").innerText = "Cabeza: A(" + (cell.x / grid) + "," + (cell.y / grid) + ")";
            document.querySelector("#serpiente > #text").innerText = "";
        }
        else {
            context.fillStyle = 'green';
            document.getElementById(cell.x / grid + "-" + cell.y / grid).innerText = "S";
            document.querySelector("#serpiente > #text").innerText += "A(" + (cell.x / grid) + "," + (cell.y / grid) + "), ";
        }
        head = false;
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, spaces) * grid;
            apple.y = getRandomInt(0, spaces) * grid;

        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                apple.x = getRandomInt(0, spaces) * grid;
                apple.y = getRandomInt(0, spaces) * grid;
            }
        }
    });
    document.getElementById("cardinalidad").innerText = "Cardinalidad de Serpiente: " + (snake.cells.length - 1)
}

document.addEventListener('keydown', function (e) {

    // left arrow key
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

requestAnimationFrame(loop);