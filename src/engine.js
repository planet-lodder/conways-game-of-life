import { GameEngineCore } from "./core.js";

export class GameEngine extends GameEngineCore {
  load(data) {
    // Set the updated properties for new data
    this.data = data;
    this.hidden = false;

    // Create the initial display
    if (this.view) {
      this.view.createView(this, data);
    }

    // Auto start the game (if requested)
    if (this.config.start) {
      console.log(this);
      this.start();
    }
  }

  getValue(x, y) {
    let config = this.config;
    if (!config.wrapped) {
      if (x < 0 || x >= config.width) return 0;
      if (y < 0 || y >= config.height) return 0;
    }
    x = (x + config.width) % config.width;
    y = (y + config.height) % config.height;
    return this.data[x + y * config.width];
  }

  tick() {
    let config = this.config;

    // Skip ticks while out of view
    if (this.hidden) return;

    // Start new generation
    this.generation++;

    const newValueIndexed = (i) => {
      let x = i % config.width;
      let y = Math.floor(i / config.width);
      let data = this.data;
      let val = data[i]; // Get current value

      // Check each neighbor cell and count them
      let count = 0;
      let topLeft = x - 1 + (y - 1) * config.width;
      let bottomLeft = topLeft + 2 * config.width;
      let w = config.width - 1;
      let h = config.height - 1;
      if (0 < x && x < w && 0 < y && y < h) {
        // Normal case, not close to an adge (no overflow)
        count =
          data[topLeft] +
          data[topLeft + 1] +
          data[topLeft + 2] +
          data[i - 1] +
          data[i + 1] +
          data[bottomLeft] +
          data[bottomLeft + 1] +
          data[bottomLeft + 2];
      } else {
        // Edge case: count cells on the edge
        count =
          this.getValue(x - 1, y - 1) +
          this.getValue(x, y - 1) +
          this.getValue(x + 1, y - 1) +
          this.getValue(x - 1, y) +
          this.getValue(x + 1, y) +
          this.getValue(x - 1, y + 1) +
          this.getValue(x, y + 1) +
          this.getValue(x + 1, y + 1);
      }

      if (count == 3) return 1; // Cell is alive if count exactly 3
      if (count == 2 && val) return 1; // Cell stays alive if 2 neighbors
      return 0; // Cell is dead or not enough siblings
    };

    // Calculate for each cell its new value
    let newData = Array(config.width * config.height); // New data frame
    if (config.explain) this.counts = Array(config.width * config.height);
    for (let i = 0; i < newData.length; i++) {
      newData[i] = newValueIndexed(i);
    }
    this.data = newData; // Save new data frame

    // Paint on screen
    if (this.view) {
      this.view.updateView(this, this.data);
    }
  }
}
