// Platform.js
class Platform {
    constructor(id, position, color="#ff6000", size = [3, 0.5, 3], type="regular") {
      this.id = id;
      this.position = position;
      this.color = color;
      this.size = size;
      this.type = type;
    }
  }
  
  export default Platform;
  