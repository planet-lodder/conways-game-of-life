class GameTickEngineCore {
  constructor() {
    if (this.constructor == GameTickEngineCore) {
      throw new Error("Class is of abstract type and can't be instantiated");
    }
  }

  load(data) {
    throw new Error("<GameEngine>.load(data) not implemented");
  }

  tick() {
    throw new Error("<TickGameEngineCore>.tick() not implemented");
  }

  start(delay) {
    // Start running game in ticks
    console.log("Starting the game...");
    this.delay = delay || this.delay || 0;
    this.generation = 0;
    this.intv = setInterval(() => this.tick(), this.delay);
    this.trackFPS(); // Compute the fps each second
  }

  stop() {
    // Check if game timer is active
    console.log("Stopping the game");
    if (this.intv > 0) clearInterval(this.intv);
    this.intv = null;
  }

  trackFPS() {
    let oldCount = this.generation || 0;
    let fps_intv = setInterval(() => {
      if (!this.intv) {
        // Simulation stopped
        clearInterval(fps_intv);
        return;
      }
      let newCount = this.generation;
      let diffFPS = newCount - oldCount;
      this.updateFPS(diffFPS);
      oldCount = newCount;
    }, 1000);
  }

  updateFPS(fps) {}
}

class GameEngineCore extends GameTickEngineCore {
  constructor(config, view) {
    super();

    // Configure and initialise the component
    this.view = view;
    this.init(config);
  }

  init(config) {
    config = this.config = config || {};

    // Reset the version number
    this.generation = 0;

    // Set view port to 'loading' state
    this.view && this.view.setLoading(true);

    if (config.image) {
      // Load the board game data from the source image
      this.view.loadImage(config.image, (buffer, width, height) => {
        // Parse raw image data into a simple array of 1's and 0's
        let data = this.mapData(buffer, width, height);
        config.width = width;
        config.height = height;
        this.dataLoaded(data);
      });
      return; // Wait for image to load and then initialise...
    } else {
      // Set defaults if no image is supplied
      config.title = config.title || "Blank Canvas";
      config.width = config.width || 60;
      config.height = config.height || 40;
      config.scale = config.scale || 10;

      // Load a blank canvas
      let data = this.mapData(null, config.width, config.height);
      this.dataLoaded(data);
    }
  }

  dataLoaded(data) {    
    console.log(
      "Creating game board...",
      [this.config.width, this.config.height],
      this.config.image
    );

    if (this.view) {
      // Trigger event that the view has been loaded (with updated config)
      const event = new CustomEvent("game:updated", {
        bubbles: true,
        detail: this.config,
      });
      this.view.dispatchEvent(event);
      this.view.setLoading(false);
    }

    // Load the data for this game
    this.load(data);
  }

  mapData(buffer, width, height) {
    let data = Array(width * height);
    if (!buffer) {
      // No buffer data, fill with empty zeros
      return data.fill(0);
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
        data[x + y * width] = val;
      }
    }

    return data;
  }

  updateFPS(fps) {
    if (this.view) {
      const event = new CustomEvent("game:fps", {
        bubbles: true,
        detail: fps,
      });
      this.view.dispatchEvent(event);
    }
  }

  resize(width, height) {
    let config = this.config;
    if (width < config.width || height < config.height) {
      // Prompt user before clipping contents
      if (!confirm("Image will be trucated. Continue?")) return false;
    }

    let data = this.data;
    let buffer = Array(width * height).fill(0);
    let offsetX = Math.floor((config.width - width) / 2);
    let offsetY = Math.floor((config.height - height) / 2);
    for (let y = 0; y < height; y++) {
      let offset = y * width;
      let dy = offsetY + y;
      let offsetOrig = dy * config.width;
      for (let x = 0; x < width; x++) {
        let dx = offsetX + x;
        if (0 <= dx && dx < config.width && 0 <= dy && dy < config.height) {
          buffer[x + offset] = data[dx + offsetOrig];
        }
      }
    }
    // Trigger a reload of the view
    config.width = width;
    config.height = height;
    this.dataLoaded(buffer);
  }

  reset() {
    this.clear();
    this.init(this.config);
  }

  clear() {
    this.data = [];
    this.updateFPS(0);
  }
}

class GameRendererCore extends HTMLElement {
  constructor() {
    super();
    if (this.constructor == GameRendererCore) {
      throw new Error("Class is of abstract type and can't be instantiated");
    }
    //this.shadow = this.attachShadow({ mode: "open" });
    this.root = this
  }

  connectedCallback() {
    this.render(this.root);
  }

  render(target) {
    throw new Error("<GameRendererCore>.render(target) not implemented");
  }

  setLoading(active) {}

  createView(game, data) {
    throw new Error(
      "<GameRendererCore>.createView(game, data) not implemented"
    );
  }

  updateView(game, data) {
    throw new Error(
      "<GameRendererCore>.updateView(game, data) not implemented"
    );
  }

  loadImage(src, callback) {
    let onLoad = (evt, target) => {
      const img = target;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let data = Array(canvas.width * canvas.height);
      let buffer = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      if (callback) callback(buffer, img.width, img.height);
    };

    // Add an invisible image tag to load the image
    let img = document.createElement("IMG");
    img.src = src;
    img.style.display = "none";
    img.style.position = "absolute";
    img.style.bottom = "0";
    img.style.right = "0";
    img.addEventListener("load", (e) => {
      onLoad(e, img);
      document.body.removeChild(img);
    });
    document.body.appendChild(img);
  }
}
