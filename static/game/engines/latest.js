class GameEngine extends GameEngineCore {
  constructor(view) {
    super(view);
  }

  load(data) {
    // Set the updated properties for new data
    this.data = data;

    // Create the initial display
    this.view.createView(this, data);
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
