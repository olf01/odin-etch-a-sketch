const grid = document.getElementById('grid')
const gridSizeInput = document.getElementById('gridSize')
const clearCanvasButton = document.getElementById('clearCanvas')
const gridSizeDisplay = document.getElementById('gridSizeDisplay')
const drawButton = document.getElementById('draw')
const eraseButton = document.getElementById('erase')
const penColorInput = document.getElementById('penColor')
const gridBackgroundColorInput = document.getElementById('gridBackgroundColor')
const unicornPenColorInput = document.getElementById('unicornPenColor')

let gridSize = 16
const MIN_GRID_SIZE = 2
const MAX_GRID_SIZE = 128

let penColor = 'black'
let gridBackgroundColor = 'white'

function updateGridSize (size) {
    if (size < MIN_GRID_SIZE) {
        gridSize = MIN_GRID_SIZE;
    } else if (size > MAX_GRID_SIZE) {
        gridSize = MAX_GRID_SIZE;
    } else {
        gridSize = Math.floor(size);
    }
}

function createGrid (size) {
    changeBackgroundColor(gridBackgroundColor);
    grid.innerHTML = "";
    updateGridSize(size);
    gridSizeDisplay.textContent = gridSize
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.style.cssText = 'display: flex; flex: 1;';
        grid.appendChild(row);
        for (let i = 0; i < gridSize; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.cssText = 'flex: 1;';
            row.appendChild(cell);
        }
    }
}

createGrid(gridSize)

gridSizeInput.addEventListener('input', function () {createGrid(this.value)});



function clearCanvas () {
    document.querySelectorAll('.cell').forEach(function (cell) {
        cell.style.backgroundColor = 'transparent'
    })
}

clearCanvasButton.addEventListener('click', clearCanvas)



function changeBackgroundColor (color) {
    gridBackgroundColor = color;
    grid.style.backgroundColor = color;
}

gridBackgroundColorInput.addEventListener('input', function () {changeBackgroundColor(this.value)})



let drawMode = 'draw'

function drawCell (e) {
    if (drawMode == 'draw') {
        e.target.style.backgroundColor = penColor;
    } else if (drawMode == 'unicorn') {
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else if (drawMode == 'erase') {
        e.target.style.backgroundColor = 'transparent';
    }
}

function mousedownHandler (e) {
    e.preventDefault(); 
    drawCell(e); 
    document.querySelectorAll('.cell').forEach(function (cell) {cell.addEventListener('mouseenter', drawCell)})
}

grid.addEventListener('mousedown', mousedownHandler)

function mouseupHandler () {
    document.querySelectorAll('.cell').forEach(function (cell) {cell.removeEventListener('mouseenter', drawCell)})
}

document.addEventListener('mouseup', mouseupHandler)



function unpressButtons () {
    document.querySelectorAll('.pressed').forEach(function (button) {button.classList.remove('pressed')})
}



drawButton.addEventListener('click', function () {unpressButtons(); drawMode = 'draw'; this.classList.add('pressed');})
eraseButton.addEventListener('click', function () {unpressButtons(); drawMode = 'erase'; this.classList.add('pressed');})



function changePenColor (color) {
    penColor = color;
}

penColorInput.addEventListener('input', function () {changePenColor(this.value)})



unicornPenColorInput.addEventListener('click', function () {unpressButtons(); drawMode = 'unicorn'; this.classList.add('pressed');})