const grid = document.getElementById('grid')
const gridSizeInput = document.getElementById('gridSize')
const clearCanvasButton = document.getElementById('clearCanvas')
const gridSizeDisplay = document.getElementById('gridSizeDisplay')
const drawButton = document.getElementById('draw')
const eraseButton = document.getElementById('erase')
let gridSize = 8
const MIN_GRID_SIZE = 2
const MAX_GRID_SIZE = 128

function updateGridSize (size) {
    if (size < MIN_GRID_SIZE) {
        gridSize = MIN_GRID_SIZE;
    } else if (size > MAX_GRID_SIZE) {
        gridSize = MAX_GRID_SIZE;
    } else {
        gridSize = size;
    }
}

function createGrid (size) {
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

let drawMode = 'draw'

function drawCell (e) {
    if (drawMode == 'draw') {
        e.target.style.backgroundColor = 'red';
    } else if (drawMode == 'erase') {
        e.target.style.backgroundColor = 'azure';
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

drawButton.addEventListener('click', function () {drawMode = 'draw'})
eraseButton.addEventListener('click', function () {drawMode = 'erase'})

function clearCanvas () {
    document.querySelectorAll('.cell').forEach(function (cell) {
        cell.style.backgroundColor = 'azure'
    })
}
clearCanvasButton.addEventListener('click', clearCanvas)