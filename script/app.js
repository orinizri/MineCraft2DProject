let inventory = document.querySelector("#inventory")
let gameBoard = document.querySelector("#game-board")
let memorySection = document.querySelector("#memory")

const memoryCell = 3;
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

const ToolKit = {
    axeStone: { name: "axeStone", id: 0 },
    shovel: { name: "shovel", id: 1 },
    axeTree: { name: "axeTree", id: 2 }
}

function setInventory(ItemsObj) {
    Object.entries(ItemsObj).forEach((key) => {
        let newItem = document.createElement("div")
        newItem.classList.add("item-container")
        newItem.innerHTML = `<div class="item" data-type='${key[0]}'></div><span>${key[0]}</span>`
        inventory.appendChild(newItem)
    });
}

let lastPosition = [];

function getPosition() {
    console.log("getPosition activated")
    divs.forEach((div) => {
        div.addEventListener("click", (e) => {
            let x = e.target.dataset.x
            let y = e.target.dataset.y
            let type = e.target.dataset.type
            lastPosition.push({
                'x': x,
                'y': y,
                'type': type
            })
            removeWithTool()
            console.log(lastPosition)
            if (flag) {
                console.log(e.target.dataset.type)
                console.log(lastPosition[lastPosition.length -2]['type'])
                    if (e.target.dataset.type === 'sky') {
                    e.target.dataset.type = lastPosition[lastPosition.length -2]['type']
                    lastPosition.pop()
                    lastPosition.pop()
                    memory.pop()
                    updateMemory(memoryCell)
                    flag = false;
                }
            }
        })
    })
    console.log(lastPosition)
}
getPosition()
buildWorld("ground", 0, 20, 15, 20);
buildWorld("grassGround", 0, 20, 14, 14);
buildWorld("oak", 5, 5, 12, 13);
buildWorld("leaves", 4, 6, 9, 11);
buildWorld("cloud", 15, 17, 7, 8);
buildWorld("stone", 14, 15, 13, 13);
buildWorld("stone", 19, 19, 13, 13);
setInventory(ToolKit);




const activeTool = [];
function getItem() {
    console.log("getItem activated")
    const items = document.querySelectorAll(".item-container")
    items.forEach((item) => {
        item.firstElementChild.dataset.use = 'false';
        item.firstElementChild.addEventListener("click", () => {
            console.log("click")
            if (item.firstElementChild.dataset.use === 'true') {
                item.firstElementChild.dataset.use = false;
                activeTool.pop();
            } else if (item.firstElementChild.dataset.use === 'false') {
                item.firstElementChild.dataset.use = true;
                activeTool.push(item.firstElementChild.dataset.type)
            }
            item.dataset.chosen = item.firstElementChild.dataset.use;
        })
    })
}

let buildMemory = false;
let memory = [];
function removeWithTool() {
    console.log("removeWithTool activated")
    if (lastPosition) {
        if (activeTool) {
            if ((!buildMemory) &&
                lastPosition[lastPosition.length - 1]['type'] !== "sky" &&
                lastPosition[lastPosition.length - 1]['type'] !== "cloud") {
                    createMemory(memoryCell)
                    buildMemory = true;
            }
            if ((lastPosition[lastPosition.length - 1]['type'] === 'ground' ||
                lastPosition[lastPosition.length - 1]['type'] === 'grassGround') &&
                activeTool[0] === 'shovel') {
                let brick = [...divs].filter(div => {
                    return (div.dataset.x === lastPosition[lastPosition.length - 1]['x'] &&
                        div.dataset.y === lastPosition[lastPosition.length - 1]['y'])
                })
                memory.push(brick[0].dataset.type)
                updateMemory(memoryCell)
                brick[0].dataset.type = 'sky'
            } else if ((lastPosition[lastPosition.length - 1]['type'] === 'oak' ||
                lastPosition[lastPosition.length - 1]['type'] === 'leaves') &&
                activeTool[0] === 'axeTree') {
                let brick = [...divs].filter(div => {
                    return (div.dataset.x === lastPosition[lastPosition.length - 1]['x'] &&
                        div.dataset.y === lastPosition[lastPosition.length - 1]['y'])
                })
                memory.push(brick[0].dataset.type)
                updateMemory(memoryCell)
                brick[0].dataset.type = 'sky'
            } else if (lastPosition[lastPosition.length - 1]['type'] === 'stone' &&
                activeTool[0] === 'axeStone') {
                let brick = [...divs].filter(div => {
                    return (div.dataset.x === lastPosition[lastPosition.length - 1]['x'] &&
                        div.dataset.y === lastPosition[lastPosition.length - 1]['y'])
                })
                memory.push(brick[0].dataset.type)
                updateMemory(memoryCell)
                brick[0].dataset.type = 'sky'
            }
            useMemory()
        }
    }
}


function main () {
    console.log("main")
    getItem()
}
main()

function createMemory(numberOfCells) {
    console.log("createMemory activated")
    for (let i = numberOfCells; i > 0; i--) {
        let newMemoryCell = document.createElement("div")
        newMemoryCell.classList.add("memory-container")
        newMemoryCell.innerHTML = `<div class="memory c${numberOfCells - i}"></div>`
        memorySection.appendChild(newMemoryCell)
    }
}
function updateMemory(numberOfCells) {
    console.log("updateMemory activated")
    const memoryDiv = document.querySelectorAll(".memory-container")
    //console.log(memoryDiv)
    for (let i = -1, j = 0; i >= -numberOfCells; i--, j++) {
        memoryDiv[j].firstElementChild.dataset.type = memory[memory.length + (i)]
        memoryDiv[j].dataset.chosen = false
    }
    return memoryDiv
}
let flag = false;
function useMemory () {
    console.log("useMemory activated")
    const memoryCellDivs = document.querySelectorAll(".memory")
    //console.log(memoryCell)
    let items = document.querySelectorAll(".item-container") // Get Items (tools)
    let activeMemoryCellDivs = Array.from(memoryCellDivs).filter( (cell) => {
            return (cell.dataset.type !== "undefined")
    })
    // gets item off when memory is pressed 
    activeMemoryCellDivs.forEach( (cell) => {
        cell.addEventListener("click", (e) => {
            //click on memory cell
            let chosenItem = Array.from(items).filter( (itemContainer)=> {
                return itemContainer.dataset.chosen === 'true'
            })
            if (chosenItem.length === 1) {
                chosenItem[0].dataset.chosen = false;
                activeTool.pop()
            }
            // let isBuildingMemory = buildWithMemory(e) // get memory cell event
            if (buildWithMemory(e)) {
                flag = true; // chose memory item to use 
                updateMemory()
            }
        })

    })
}
function buildWithMemory (e) {
    console.log("buildWithMemory activated")
    // Choosing memoryCell
    if (e.path[0].dataset.chosen !== "true") {    
        e.path[0].dataset.chosen = true;
        e.path[1].dataset.chosen = true;
        console.log(e.path[0].dataset)
        return true
    } else if (e.path[0].dataset.chosen === "true") {
        e.path[0].dataset.chosen = false;
        e.path[1].dataset.chosen = false;
        return false
    }
}