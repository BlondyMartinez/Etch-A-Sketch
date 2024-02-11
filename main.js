function grid16x16() {
    let container = document.querySelector('#grid')
    let cell = document.createElement('div');

    container.style.height = parseFloat(window.innerWidth * 0.8) + 'px';
    cell.style.width = parseFloat((window.innerWidth * .8) / 16) + 'px';
    cell.style.height = parseFloat((window.innerWidth * .8) / 16) + 'px';

    let row = document.createElement('div');
    row.style.display = 'flex';

    for(let i = 0; i < 16; i++) {
        for(let j = 0; j < 16; j++){
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

grid16x16();