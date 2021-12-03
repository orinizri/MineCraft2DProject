
let inventory = document.querySelector("#inventory")
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
const ToolKit = {
    axeStone: { name: "axeStone", id: 0 },
    shovel: { name: "shovel", id: 1 },
    axeTree: { name: "axeTree", id: 2 },
}
function setInventory(ItemsObj) {
    Object.entries(ItemsObj).forEach((key, value) => {
        let newItem = document.createElement("div")
        newItem.classList.add("item-container")
        newItem.innerHTML = `<div class="item" data-type='${key[0]}'></div><span>${key[0]}</span>`
        inventory.appendChild(newItem)
    });
}
let lastPosition = [];
function getPosition() {
    divs.forEach((div) => {
        div.addEventListener("click", (e) => {
            let x = e.target.dataset.x
            let y = e.target.dataset.y
            let type = e.target.dataset.type
            lastPosition.push({
                'x' : x, 
                'y' : y,
                'type' : type
            })
            return e.target
        })
    })
}


buildWorld("ground", 0, 20, 15, 20);
buildWorld("grassGround", 0, 20, 14, 14);
buildWorld("oak", 5, 5, 12, 13);
buildWorld("leaves", 4, 6, 9, 11);
buildWorld("cloud", 15, 17, 7, 8);
setInventory(ToolKit);


function getItem() {
    const items = document.querySelectorAll(".item-container")
    items.forEach((item) => {
        let itemChosen = item.firstElementChild
        itemChosen.dataset.use = 'null';
        item.firstElementChild.addEventListener("click", () => { // loop over item container's first child 
            // toggle dataset-use attribute for item functionality (use - true/not use - false)
            if (itemChosen.dataset.use === 'true') {
                itemChosen.dataset.use = false;
            } else {
                itemChosen.dataset.use = true;
            }
            item.dataset.chosen = itemChosen.dataset.use;
        })
    })
    return items
}

// console.log(getItem())

    function useItem () {
        let items = getItem()
        inventory.addEventListener("click", () => {
            for (let item of items) {
                if (item.firstElementChild.dataset.use == "true") {
                    let activeItem = item.firstElementChild.dataset.type
                    return activeItem;

                }

            }
        })
    }

    function removeBrick () {
        let item = useItem()
        console.log(item)
        let location = getPosition()
        console.log(location)

        
        // location.forEach( (att) => {
        //     console.log(att)
        // })
        // for (let i=0 ; i<divs.length ; i++) {
        //     console.log(divs[i].dataset)
        // }
        
    }
        

console.log(removeBrick())
