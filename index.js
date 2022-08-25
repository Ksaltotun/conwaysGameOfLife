const root = document.getElementById('root');
const canvas = document.createElement('canvas');
const generarationConter = document.createElement('h3')

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid red';

const ctx = canvas.getContext('2d')
ctx.fillStyle = 'green'

let firstGeneration = [];
let counter = 0;

for (let i = 0; i < 100; i++) {
    firstGeneration[i] = []
    for (let j = 0; j < 100; j++) {
        firstGeneration[i][j] = (Math.random() * 100) > 80 ? 1 : 0;
        if (!firstGeneration[i][j]) ctx.fillRect(i * 5, j * 5, 5, 5);

    }
}

function createNewGeneration () {
    ctx.clearRect(0, 0, 500, 500);
    const newGeneration = [];

    generarationConter.innerText = `Поколение: ${counter++}`
    for (let x = 0; x < 100; x++) {
        newGeneration[x] = []
        for (let y = 0; y < 100; y++) {
            let lifePower = getLifePower(x, y);
            if (firstGeneration[x][y] === 0 && lifePower === 3) {
                newGeneration[x][y] = 1;
            } else if (firstGeneration[x][y] === 1 && (lifePower > 3 || lifePower < 2)){
                newGeneration[x][y] = 0;
            } else {
                newGeneration[x][y] = firstGeneration[x][y];
            }
            if(newGeneration[x][y]) ctx.fillRect(x * 5, y * 5, 5, 5);
    
        }
    }

    firstGeneration = [...newGeneration]
}



function getLifePower(x, y) {
    let lifePower = getCellValue(x - 1, y - 1) +
        getCellValue(x - 1, y) +
        getCellValue(x - 1, y + 1) +
        getCellValue(x, y - 1) +
        getCellValue(x, y + 1) +
        getCellValue(x + 1, y - 1) +
        getCellValue(x + 1, y) +
        getCellValue(x + 1, y + 1)
    return lifePower;
}

function getCellValue(x, y) {
    if (x < 100 && y < 100 && x >= 0 && y >= 0) return firstGeneration[x][y]
    return 0
}

//setInterval(createNewGeneration, 100);
root.appendChild(generarationConter);
root.appendChild(canvas);