const grid = document.querySelector('#grid')

for (let i = 0; i < 8; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    row.style.cssText = 'display: flex; flex: 1;';
    grid.appendChild(row);
    for (let i = 0; i < 8; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell')
        cell.style.cssText = 'flex: 1;';
        row.appendChild(cell)
    }
}