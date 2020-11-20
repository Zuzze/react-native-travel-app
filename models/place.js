class Place {
  constructor(id, title, imageUri, address, lat = 0, lng = 0, elevation = 0) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
    this.elevation = elevation;
  }
}

export default Place;
