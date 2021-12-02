export let inventory = document.querySelector("#inventory")
import { setInventory, ToolKit } from "./inventory.js"
// console.log(inventory)
let gameBoard = document.querySelector("#game-board")
//console.log(gameBoard)

let matrix = []

const Material = {
    sky: { name: "sky", id: 0 },
    ground: { name: "ground", id: 1 },
    oak: { name: "oak", id: 2 },
    leaves: { name: "leaves", id: 3 },
    stone: { name: "stone", id: 4 },
    grassGround: { name: "grassGround", id: 5 },
    cloud: { name: "cloud", id: 5 },
}

function startMatrix() {
    for (let i = 0; i < 21; i++) {
        matrix.push([])
        for (let j = 0; j < 21; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}
function drawMatrix(matrix) {
    for (let i = 1; i < 21; i++) {
        for (let j = 1; j < 21; j++) {
            if (matrix[i][j] == 0) {
                gameBoard.innerHTML += `<div class="brick" data-x="${i}" data-y="${j}" data-type="sky"></div>`
            }
        }
    }
    return matrix
}

(drawMatrix(startMatrix()))

const divs = document.querySelectorAll(".brick")

function buildWorld(material, xStart, xEnd, yStart, yEnd) {
    let getMaterial = Material[material].name; // Get the material from Material if exist
    divs.forEach((element) => {
        if (element.dataset.x >= yStart &&
            element.dataset.x <= yEnd &&
            element.dataset.y >= xStart &&
            element.dataset.y <= xEnd) {
            element.dataset.type = getMaterial; // Update the material by parameters x and y
        }
    })
}

buildWorld("ground", 0, 20, 15, 20);
buildWorld("grassGround", 0, 20, 14, 14);
buildWorld("oak", 5, 5, 12, 13);
buildWorld("leaves", 4, 6, 9, 11);
buildWorld("cloud", 15, 17, 7, 8);
setInventory(ToolKit)