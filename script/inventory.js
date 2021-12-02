import { inventory } from "./main.js"
//Inventory = div #inventory
export const ToolKit = {
    axeStone: { name: "axeStone", id: 0 },
    shovel: { name: "shovel", id: 1 },
    axeTree: { name: "axeTree", id: 2 },
}

export function setInventory (ItemsObj) {
    Object.entries(ItemsObj).forEach((key, value) => {
        let newItem = document.createElement("div")
        newItem.innerHTML = `<div data-type='${key[0]}'></div><span>${key[0]}</span>`
        inventory.appendChild(newItem)
        console.log(newItem.innerHTML)
    });
    
} 
