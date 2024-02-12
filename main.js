function grid(cellsPerSide) {
    let container = document.querySelector('#grid');

    let gridWidth = (window.innerWidth * 0.8 / (16/9));
    let cellWidth = gridWidth / cellsPerSide;

    container.style.height = gridWidth + 'px';

    for(let i = 0; i < cellsPerSide; i++) {
        let row = document.createElement('div');
        row.style.display = 'flex';

        for(let j = 0; j < cellsPerSide; j++){
            let cell = document.createElement('div');
            cell.style.width = cellWidth + 'px';
            cell.style.height = cellWidth + 'px';
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}

grid(100);