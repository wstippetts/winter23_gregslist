import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"
import { getFormData } from "../Utils/FormHandler.js"


function _drawHouses() {
  let template = ''
  appState.houses.forEach(h => template += h.HouseCardTemplate)
  setHTML('listings', template)
}

function _drawHouse() {
  setText('listingModalLabel', `${appState.house.address} ${appState.house.pic} ${appState.house.price}`, 'houseListingDetail')
  setHTML('listing-modal-body', appState.house.getHouseDetailsTemplate)
}

export class HousesController {


  constructor() {
    this.show()
    appState.on('houses', _drawHouses)
    appState.on('house', _drawHouse)

  }

  show() {
    setText('add-listing-button', '🏠 sell a crib')
    setText('listingFormLabel', 'sell it before they forclose!')
    setHTML('the-actual-form', House.HouseForm)
    _drawHouses()
  }

  setActiveHouse(houseAddress) {
    try {
      housesService.setActiveHouse(houseAddress)
    } catch (error) {
      Pop.error(error)
    }
  }

  handleHouseFormSubmit() {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      housesService.createHouse(formData)
      console.log(formData)
      form.reset()

    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async deleteHouse(houseAddress) {
    try {
      const yes = await Pop.confirm('dont you dare!')
      if (!yes) { return }
      housesService.deleteHouse(houseAddress)
    } catch (error) {
      Pop.error(error)
    }
  }

}
