import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { saveState } from "../Utils/Store.js"

class HousesService {

  deleteHouse(houseAddress) {
    let houseIndex = appState.houses.findIndex(h => h.houseAddress == houseAddress)
    if (houseIndex == -1) {
      throw new Error('thats not a house dummy')
    }
    appState.houses.splice(houseIndex, 1)
    saveState('houses', appState.houses)
    appState.emit('houses')
  }

  setActiveHouse(houseAddress) {
    let house = appState.houses.find(h => h.houseAddress == houseAddress)
    if (!house) {
      throw new Error('sorry that house is no longer listed')
    }
    appState.house = house
  }
  createHouse(formData) {
    let house = new House(formData)
    appState.houses.push(house)
    appState.emit('houses')
    saveState('houses', appState.houses)
  }


}

// singleton pattern more on this later
export const housesService = new HousesService()