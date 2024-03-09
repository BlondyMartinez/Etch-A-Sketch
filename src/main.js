let mode = "COLOR"

let container = document.querySelector('#grid');
let colorInput = document.querySelector('#color-picker');

let selectedColor = 'black';

function grid(cellsPerSide) {
    // clears grid
    container.replaceChildren();

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
    
    onHoverAndClick(mode);
}

function switchMode (chosen_mode) {
    mode = chosen_mode;
}

function onHoverAndClick() {
    let mouseDown = false;

    container.addEventListener('mousedown', function() {
        mouseDown = true;
    });
    
    container.addEventListener('mouseup', function() {
        mouseDown = false;
    });
    
    let cellList = document.querySelectorAll(".cell");
    
    for (let cell of cellList) {
        cell.addEventListener('mouseover', function() {
            if (mouseDown) colorMode(cell);
        });

        cell.addEventListener('click', function() {
            colorMode(cell);
        });
    }
}

function colorMode(cell){
    let currentColor = parseRGB(cell.style.backgroundColor);
    
    let step = 10;
    let newR = 0;
    let newG = 0
    let newB = 0;

    switch (mode) {
        case "RANDOM_COLOR":
            cell.style.backgroundColor = getRandomColor();
            break;
        case "COLOR":
            cell.style.backgroundColor = selectedColor;
            break;
        case "LIGHTEN":
            if (cell.style.backgroundColor != 'white') {
                newR = Math.min(currentColor.r + step, 255);
                newG = Math.min(currentColor.g + step, 255);
                newB = Math.min(currentColor.b + step, 255);

                cell.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
            }
            break;              
        case "DARKEN":
            if (cell.style.backgroundColor != 'white') {
                newR = Math.max(currentColor.r - step, 0);
                newG = Math.max(currentColor.g - step, 0);
                newB = Math.max(currentColor.b - step, 0);

                cell.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
            }
            break;
        case "ERASER":
            cell.style.backgroundColor = 'white';
            break;
        case "BUCKET":
            bucketFill(cell);
            break;
    }
}

function bucketFill(cell) {
    let targetColor = cell.style.backgroundColor;

    function fillAdjacentCells(row, col) {
        if (row >= 0 && row < container.children.length && col >= 0 && col < container.children[row].children.length &&
            container.children[row].children[col].style.backgroundColor === targetColor) {
            container.children[row].children[col].style.backgroundColor = selectedColor;
            fillAdjacentCells(row - 1, col); // top
            fillAdjacentCells(row + 1, col); // bottom
            fillAdjacentCells(row, col - 1); // left
            fillAdjacentCells(row, col + 1); // right
        }
    }

    let rowIndex = -1;
    let cellIndex = -1;

    for (let i = 0; i < container.children.length; i++) {
        let row = container.children[i];
        for (let j = 0; j < row.children.length; j++) {
            if (row.children[j] === cell) {
                rowIndex = i;
                cellIndex = j;
                break;
            }
        }
        if (rowIndex !== -1)  break; 
    }
    
    fillAdjacentCells(rowIndex, cellIndex);
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

function displayGridCells(element) {
    for(let i = 0; i < container.children.length; i++) {
        for (let j = 0; j < container.children[i].children.length; j++) {
            if (container.children[i].children[j].classList.contains('cell')) {
                container.children[i].children[j].classList.remove("cell");
                element.textContent = "Show Grid";
            } else {
                container.children[i].children[j].classList.add("cell"); 
                element.textContent = "Hide Grid";
            }
        }
    }
}

function parseRGB(rgbString) {
    let regex = /rgb\((\d+), (\d+), (\d+)\)/;
    let match = rgbString.match(regex);
    
    if (match) {
        let r = parseInt(match[1]);
        let g = parseInt(match[2]);
        let b = parseInt(match[3]);

        return { r, g, b };
    } else return { r: 0, g: 0, b: 0 }; 
}

grid(16);

colorInput.addEventListener('input', function(event) {
    selectedColor = event.target.value;
});