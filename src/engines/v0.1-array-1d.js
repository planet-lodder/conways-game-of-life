class GameEngine extends GameEngineCore {
  load(data) {
    // Set the updated properties for new data
    this.data = data;

    // Create the initial display
    if (this.view) {
      this.view.createView(this, data);
    }
  }

  tick() {
    let config = this.config;

    // Start new generation
    this.generation++;

    const getValue = (x, y) => {
      if (config.wrapped) {
        x = (x + config.width) % config.width;
        y = (y + config.height) % config.height;
      }
      if (x < 0 || x >= config.width) return 0;
      if (y < 0 || y >= config.height) return 0;
      return this.data[x + y * config.width];
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
    let data = Array(config.width * config.height); // New data frame
    for (let i = 0; i < data.length; i++) {
      data[i] = newValue(i % config.width, Math.floor(i / config.width));
    }
    this.data = data; // Save new data frame

    // Paint on screen
    if (this.view) {
      this.view.updateView(this, data);
    }
  }
}
