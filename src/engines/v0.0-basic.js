class GameEngine extends GameEngineCore {
  load(data) {
    // Set the updated properties given the data
    this.data = data;

    // Calculate the new dimentions
    if (this.view) {
      this.view.createView(this, this.dataMapped(data));
    }
  }

  mapData(buffer, width, height) {
    let data = Array(width);
    if (!buffer) {
      // No buffer data, fill with empty zeros
      for (let x = 0; x < width; x++) {
        data[x] = Array(height);
        for (let y = 0; y < height; y++) {
          data[x][y] = 0;
        }
      }
      return data;
    }

    // Load data from buffer
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let i = (x + y * width) * 4;
        let r = buffer[i];
        let g = buffer[i + 1];
        let b = buffer[i + 2];
        let a = buffer[i + 3];
        let val = a < 64 || (r + g + b) / 3 > 192 ? 0 : 1;
        data[x] = data[x] || Array(height);
        data[x][y] = val;
      }
    }

    return data;
  }

  dataMapped(data) {
    let config = this.config;
    let mappedData = Array(config.width * config.height);
    for (let y = 0; y < config.height; y++) {
      let offset = y * config.width;
      for (let x = 0; x < config.width; x++) {
        mappedData[x + offset] = data[x][y];
      }
    }
    return mappedData;
  }

  resize(width, height) {
    let config = this.config;
    if (width < config.width || height < config.height) {
      // Prompt user before clipping contents
      if (!confirm("Image will be trucated. Continue?")) return false;
    }

    let data = this.data;
    let buffer = Array(width);
    let offsetX = Math.floor((config.width - width) / 2);
    let offsetY = Math.floor((config.height - height) / 2);
    for (let x = 0; x < width; x++) {
      buffer[x] = Array(height);
      for (let y = 0; y < height; y++) {
        let dx = offsetX + x;
        let dy = offsetY + y;
        if (0 <= dx && dx < config.width && 0 <= dy && dy < config.height) {
          buffer[x][y] = data[dx][dy];
        }
      }
    }
    // Trigger a reload of the view
    config.width = width;
    config.height = height;
    this.dataLoaded(buffer);
  }

  tick() {
    let config = this.config;

    // Start new generation
    this.generation++;

    const getValue = (x, y) => {
      if (!config.wrapped) {
        if (x < 0 || x >= config.width) return 0;
        if (y < 0 || y >= config.height) return 0;
      }
      x = (x + config.width) % config.width;
      y = (y + config.height) % config.height;
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
    for (let x = 0; x < config.width; x++) {
      data[x] = Array(config.height);
      for (let y = 0; y < config.height; y++) {
        data[x][y] = newValue(x, y);
      }
    }
    this.data = data; // Save new data frame

    // Paint on screen
    if (this.view) {
      this.view.updateView(this, this.dataMapped(data));
    }
  }
}
