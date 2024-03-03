function grid(cellsPerSide) {
    let container = document.querySelector('#grid');

    //clears grid
    container.replaceChildren();

    //80% of window's width divided by aspect ratio, this ensures the grid is always visible
    let gridWidth = (window.innerHeight * 0.7); 
    let cellWidth = gridWidth / cellsPerSide;

    container.style.height = gridWidth + 'px';

    for(let i = 0; i < cellsPerSide; i++) {
        let row = document.createElement('div');
        row.style.display = 'flex';

        for(let j = 0; j < cellsPerSide; j++){
            let cell = document.createElement('div');
            cell.classList.add("cell");
            cell.style.width = cellWidth + 'px';
            cell.style.height = cellWidth + 'px';
            cell.style.backgroundColor = 'white';
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
    
    onHover("RANDOM_COLOR");
}

function onHover(behavior){
    let cellList = document.querySelectorAll(".cell");

    for(let cell of cellList) {
        cell.addEventListener('mouseover', function(){
            switch(behavior) {
                case "RANDOM_COLOR":
                    cell.style.backgroundColor = getRandomColor();
                    break;
            }
        });
    }
}

function getRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    return rgb;
}

function clearGrid() {
    let cellList = document.querySelectorAll(".cell");

    for (let cell of cellList){
        cell.style.backgroundColor = 'white';
    }
}

function newGrid(){
    let cells = prompt("How many cells per size do you want? Choose between 3 and 100.");

    if (!cells  || cells < 3) cells = 3;
    else if (cells > 100) cells = 100;

    grid(cells);
}

grid(16);