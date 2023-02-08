import { appState } from "../AppState.js"
import { Car } from "../Models/Car.js"
import { saveState } from "../Utils/Store.js"
import { sandboxApi } from "./AxiosService.js"

class CarsService {
  async deleteCar(carId) {
    let carIndex = appState.cars.findIndex(c => c.id == carId)

    if (carIndex == -1) {
      throw new Error('Yo, thats a bad car id....')
    }

    // saveState('cars', appState.cars)
    const res = await sandboxApi.delete('/cars/' + carId)
    appState.cars.splice(carIndex, 1)
    appState.emit('cars') // shine the light 🕯️🔦💡



  }

  setActiveCar(carId) {
    const car = appState.cars.find(c => c.id == carId)
    if (!car) {
      throw new Error('there is no car with that id')
    }
    appState.car = car
  }

  createCar(formData) {
    // FYI its gonna get more complex later.... 
    // so just get use to the pattern this week 
    let car = new Car(formData)

    appState.cars.push(car)
    appState.emit('cars')
    saveState('cars', appState.cars)

  }

  async getCars() {
    const response = await sandboxApi.get('/cars')
    const newArray = response.data.map(car => new Car(car))
    appState.cars = newArray
    console.log(appState.cars);
  }
}

export const carsService = new CarsService()