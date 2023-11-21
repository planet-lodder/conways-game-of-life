class GameEngine {
  generation = 0;
  view = null;
  intv = null;

  constructor(view) {
    this.view = view;
    this.config();
    this.init(this.image);
  }

  config() {
    let root = this.view.root;
    if (root) {
      // Load the preset (by reading attributes)
      this.image = root.getAttribute("image");
      this.title = root.getAttribute("title");
      this.width = root.getAttribute("width");
      this.height = root.getAttribute("height");
      this.scale = root.getAttribute("scale");
      this.delay = root.getAttribute("delay");
      this.wrapped = root.getAttribute("wrapped");
    }
  }

  reset() {
    this.config();
    this.init(this.image);
  }

  init(image) {
    // Set view port to 'loading' state
    this.view.setLoading(true);

    if (image) {
      // Load the board game data from the source image
      this.view.loadImage(image, (buffer, width, height) => {
        // Parse raw image data into a simple array of 1's and 0's
        let data = this.imageData(buffer, width, height);
        this.width = width;
        this.height = height;
        this.load(data);
      });
      return; // Wait for image to load and then initialise...
    } else {
      // Set defaults if no image is supplied
      this.title = this.title || "Blank Canvas";
      this.width = this.width || 60;
      this.height = this.height || 40;
      this.scale = this.scale || 16;

      // Load a blank canvas
      let data = Array(this.width * this.height).fill(0);
      this.load(data);
    }

    // Reset the version number
    this.generation = 0;
  }

  imageData(buffer, width, height) {
    let data = Array(width * height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let i = (x + y * width) * 4;
        let r = buffer[i];
        let g = buffer[i + 1];
        let b = buffer[i + 2];
        let a = buffer[i + 3];
        let val = a < 64 || (r + g + b) / 3 > 192 ? 0 : 1;
        data[x + y * width] = val;
      }
    }
    return data;
  }

  load(data) {
    let config = this;

    // Set the updated properties given the data
    this.data = data;
    this.width = config.width || data.length;
    this.height = config.height || data[0].length;
    this.delay = !isNaN(config.delay) ? config.delay : this.delay;

    // Clear and reset loading message
    this.view.setLoading(false);

    // Calculate the new dimentions
    this.view.createView(this, data);
  }

  start(delay) {
    console.log("Starting the game...");

    // Start running game in ticks
    this.generation = 0;
    this.delay = delay || this.delay || 0;
    this.intv = setInterval(() => this.tick(), this.delay);

    // Compute the fps each second
    this.view.trackFPS(this);
  }

  stop() {
    if (this.intv > 0) {
      console.log("Stopping the game");
      clearInterval(this.intv);
    }
    this.intv = null;
  }

  tick() {
    // Start new generation
    this.generation++;

    const getValue = (x, y) => {
      if (this.wrapped) {
        x = (x + this.width) % this.width;
        y = (y + this.height) % this.height;
      }
      if (x < 0 || x >= this.width) return 0;
      if (y < 0 || y >= this.height) return 0;
      return this.data[x + y * this.width];
    };
    const newValue = (x, y) => {
      // Check each neighbor cell and count them
      let count = 0; // Keep track of the count
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          count += dx == 0 && dy == 0 ? 0 : getValue(x + dx, y + dy);
          if (count > 3) return 0; // Over-populated, cell dies, no need to continue
        }
      }
      let val = getValue(x, y); // Get current value
      if (count == 3) return 1; // Cell is alive if count exactly 3
      if (count == 2 && val) return 1; // Cell stays alive if 2 neighbors
      return 0; // Cell is dead or not enough siblings
    };

    const newValueIndexed = (i) => {
      let x = i % this.width;
      let y = Math.floor(i / this.width);
      let data = this.data;
      let val = data[i]; // Get current value

      // Check each neighbor cell and count them
      let topLeft = x - 1 + (y - 1) * this.width;
      let bottomLeft = topLeft + 2 * this.width;
      let neighbors = [
        data[topLeft],
        data[topLeft + 1],
        data[topLeft + 2],
        data[i - 1],
        data[i + 1],
        data[bottomLeft],
        data[bottomLeft + 1],
        data[bottomLeft + 2],
      ];
      //neighbors.push(...data.slice(topLeft, topLeft + 3))
      //neighbors.push(data[i-1], data[i+1])
      //neighbors.push(...data.slice(bottomLeft, bottomLeft + 3))

      let count = neighbors.reduce((val, agg) => agg + val, 0);
      if (count == 3) return 1; // Cell is alive if count exactly 3
      if (count == 2 && val) return 1; // Cell stays alive if 2 neighbors
      return 0; // Cell is dead or not enough siblings
    };

    // Calculate for each cell its new value
    let data = Array(this.width * this.height); // New data frame
    for (let i = 0; i < data.length; i++) {
      data[i] = newValue(i % this.width, Math.floor(i / this.width));
      //data[i] = newValueIndexed(i);
    }
    this.data = data; // Save new data frame

    // Paint on screen
    this.view.updateView(this, data);
  }
}
