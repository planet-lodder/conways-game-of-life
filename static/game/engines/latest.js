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

    const newValueIndexed = (i) => {
      let x = i % config.width;
      let y = Math.floor(i / config.width);
      let data = this.data;
      let val = data[i]; // Get current value

      // Check each neighbor cell and count them
      let topLeft = x - 1 + (y - 1) * config.width;
      let bottomLeft = topLeft + 2 * config.width;
      let count =
        data[topLeft] +
        data[topLeft + 1] +
        data[topLeft + 2] +
        data[i - 1] +
        data[i + 1] +
        data[bottomLeft] +
        data[bottomLeft + 1] +
        data[bottomLeft + 2];

      if (count == 3) return 1; // Cell is alive if count exactly 3
      if (count == 2 && val) return 1; // Cell stays alive if 2 neighbors
      return 0; // Cell is dead or not enough siblings
    };

    // Calculate for each cell its new value
    let newData = Array(config.width * config.height); // New data frame
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
