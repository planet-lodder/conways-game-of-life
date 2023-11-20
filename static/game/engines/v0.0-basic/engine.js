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
    this.generation = 0;
  }

  init(image) {
    // Set view port to 'loading' state
    this.view.setLoading(true);

    if (image) {
      // Load the board game data from the source image
      this.view.loadImage(image, (data) => this.load(data));
      return; // Wait for image to load and then initialise...
    } else {
      // Set defaults if no image is supplied
      this.title = this.title || "Blank Canvas";
      this.width = this.width || 60;
      this.height = this.height || 40;
      this.scale = this.scale || 16;

      // Load a blank canvas
      let data = Array(this.width);
      for (let x = 0; x < this.width; x++) {
        data[x] = Array(this.height);
        for (let y = 0; y < this.height; y++) {
          data[x][y] = 0;
        }
      }
      this.load(data);
    }
  }

  load(data) {
    let config = this;
    let root = this.view.root;

    // Set the updated properties given the data
    this.data = data;
    this.width = config.width || data.length;
    this.height = config.height || data[0].length;
    this.scale = config.scale || this.scale;
    this.wrapped = config.wrapped || this.wrapped;
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
    console.log("Stopping the game");
    clearInterval(this.intv);
    this.intv = null;
  }

  tick() {
    // Start new generation
    this.generation++;

    const getValue = (x, y) => {
      if (!this.wrapped) {
        if (x < 0 || x >= this.width) return 0;
        if (y < 0 || y >= this.height) return 0;
      }
      x = (x + this.width) % this.width;
      y = (y + this.height) % this.height;
      return this.data[x][y];
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

    // Calculate for each cell its new value
    let data = []; // New data frame
    for (let x = 0; x < this.width; x++) {
      data[x] = Array(this.height);
      for (let y = 0; y < this.height; y++) {
        data[x][y] = newValue(x, y);
      }
    }
    this.data = data; // Save new data frame

    // Paint on screen
    this.view.updateView(this, data);
  }
}
