

export class House {
  constructor(data) {
    this.address = data.address
    this.sqrFt = data.sqrFt
    this.bed = data.bed
    this.bath = data.bath
    this.pic = data.pic
    this.price = data.price
    this.desc = data.desc
  }
  get HouseCardTemplate() {
    return /*html*/`
  <div class="col-md-4-my-3">
    <div class="card elevation-4 car" onclick="app.housesController.setActiveHouse('${this.address}')" data-bs-toggle="modal" data-bs-target="#listingModal">
      <img
        src="${this.pic}"
        alt="${this.address}" class="rounded">
        <p><b>${this.address} - $${this.price} </b></p>
      
    </div>
  </div>
  `
  }

  getHouseDetailsTemplate() {
    return /*html*/`
    <div>
        <button class="btn btn-primary" data-bs-dismiss="modal" onclick="app.housesController.deleteHouse('${this.address}')">DELETE THE HOUSE</button>
      </div>
    `
  }

  static HouseForm() {
    return /*html*/`
    <form onsubmit="app.carsController.handleFormSubmit()">

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="address" required minlength="3" maxlength="100">
          <label for="address">Make</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="sqrFt" required>
          <label for="sqrFt">Model</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="bed" required>
          <label for="bed">Year</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="bath" required>
          <label for="bath">Year</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="price" required min="0">
          <label for="price">Price</label>
        </div>

        <div class="form-floating mb-3">
          <input type="url" class="form-control" name="imgUrl">
          <label for="imgUrl">Image Url <i>(We are too lazy for uploads)</i></label>
        </div>

        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your Listing" name="description"></textarea>
          <label for="description">Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit" data-bs-dismiss="offcanvas">Submit</button>
        </div>

      </form>
    `
  }
}
