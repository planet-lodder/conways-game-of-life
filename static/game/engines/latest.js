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
    let config = this.config

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

    const newValueIndexed = (i) => {
      let x = i % config.width;
      let y = Math.floor(i / config.width);
      let data = this.data;
      let val = data[i]; // Get current value

      // Check each neighbor cell and count them
      let topLeft = x - 1 + (y - 1) * config.width;
      let bottomLeft = topLeft + 2 * config.width;
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
    let data = Array(config.width * config.height); // New data frame
    for (let i = 0; i < data.length; i++) {
      data[i] = newValue(i % config.width, Math.floor(i / config.width));
      //data[i] = newValueIndexed(i);
    }
    this.data = data; // Save new data frame

    // Paint on screen
    if (this.view) {
      this.view.updateView(this, data);
    }
  }
}
