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
  constructor(view) {
    if (!view) throw new Error("Game 'view' is required");
    super();

    // Configure and initialise the component
    this.view = view;
    this.config();
    this.init();
  }

  config() {
    // Load the game settings (by reading attribute vals)
    let root = this.view.root;
    if (root) {
      this.image = root.getAttribute("image");
      this.title = root.getAttribute("title");
      this.width = root.getAttribute("width");
      this.height = root.getAttribute("height");
      this.scale = root.getAttribute("scale");
      this.delay = root.getAttribute("delay");
      this.wrapped = root.getAttribute("wrapped");
    }
  }

  init() {
    // Reset the version number
    this.generation = 0;

    // Set view port to 'loading' state
    this.view.setLoading(true);

    if (this.image) {
      // Load the board game data from the source image
      this.view.loadImage(this.image, (buffer, width, height) => {
        // Parse raw image data into a simple array of 1's and 0's
        let data = this.mapData(buffer, width, height);
        this.width = width;
        this.height = height;
        this.view.setLoading(false);
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
      let data = this.mapData(null, this.width, this.height);
      this.view.setLoading(false);
      this.load(data);
    }
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
    this.view.updateFPS(fps);
  }

  reset() {
    this.clear();
    this.config();
    this.init();
  }

  clear() {}
}

class GameRendererCore extends HTMLElement {
  constructor() {
    super();
    if (this.constructor == GameRendererCore) {
      throw new Error("Class is of abstract type and can't be instantiated");
    }
    this.root = this;
    //this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render(this);
  }

  render(target) {
    throw new Error("<GameRendererCore>.render(target) not implemented");
  }

  setLoading(active) {}

  createView(config, data) {
    throw new Error(
      "<GameRendererCore>.createView(config, data) not implemented"
    );
  }

  updateView(config, data) {
    throw new Error(
      "<GameRendererCore>.updateView(config, data) not implemented"
    );
  }

  updateFPS(fps) {}

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
      this.root.removeChild(img);
    });
    this.root.appendChild(img);
  }
}

class GameOfLife extends HTMLElement {
  static views = {};
  static addViewType(name, label, icon, viewInit) {
    GameOfLife.views[name] = {
      label,
      icon,
      viewInit,
    };
  }

  constructor() {
    super();
    //this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.config();
    this.render(this);
  }

  config() {
    // Check for a specified view type
    this.viewType = this.getAttribute("view");

    // Parse and evaluate game parameters
    this.start = this.getAttribute("start");
    this.title = this.getAttribute("title");
    this.image = this.getAttribute("image");
    this.width = this.getAttribute("width");
    this.height = this.getAttribute("height");
    this.scale = this.getAttribute("scale");
    this.delay = this.getAttribute("delay");
    this.wrapped = this.getAttribute("wrapped");
  }

  render(target) {
    // Define the game board elements
    let toolbar = new GameToolbar();
    let view = this.getView(this.viewType);
    target.appendChild(toolbar);
    target.appendChild(view);

    if (!this.game) {
      // Create a new game engine
      this.game = new GameEngine(view);
    } else {
      // Update existing engine
      this.game.view = view;
    }

    // Auto start the game (if required)
    if (this.start) this.game.start();
  }

  getView(name) {
    let views = GameOfLife.views;
    let viewKeys = Object.keys(views || {});
    if (!viewKeys.length) {
      throw new Error("No view types registered. Nothing to display");
    }
    let viewType = name ? views[name] : views[viewKeys[0]];
    if (!viewType) {
      let name = this.view || "default";
      throw new Error(
        `Game view type '${name}' not found. Available: ${viewKeys}`
      );
    }
    return viewType.viewInit();
  }
}
customElements.define("game-of-life", GameOfLife);
