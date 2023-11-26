/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameEngineCore: () => (/* binding */ GameEngineCore),
/* harmony export */   GameRendererCore: () => (/* binding */ GameRendererCore),
/* harmony export */   GameTickEngineCore: () => (/* binding */ GameTickEngineCore)
/* harmony export */ });
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
    this.trackFPS(); // Compute the fps each second
    if (!this.delay && this.view && this.view.tickAction) {
      // Delegate frame renders to the view (eg: WebGL)
      this.intv = -1;
      this.view.tickAction(this, () => this.tick());
    } else {
      // Render frames (possilybly rate limited)
      this.intv = setInterval(() => this.tick(), this.delay);
    }
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
      let fps = newCount - oldCount;
      this.updateFPS(fps);
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
    this.root = this;
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


/***/ }),

/***/ "./src/engine.js":
/*!***********************!*\
  !*** ./src/engine.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameEngine: () => (/* binding */ GameEngine)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./src/core.js");


class GameEngine extends _core_js__WEBPACK_IMPORTED_MODULE_0__.GameEngineCore {
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
      if (!config.wrapped) {
        if (x < 0 || x >= config.width) return 0;
        if (y < 0 || y >= config.height) return 0;
      }
      x = (x + config.width) % config.width;
      y = (y + config.height) % config.height;
      return this.data[x + y * config.width];
    };

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
          getValue(x - 1, y - 1) +
          getValue(x, y - 1) +
          getValue(x + 1, y - 1) +
          getValue(x - 1, y) +
          getValue(x + 1, y) +
          getValue(x - 1, y + 1) +
          getValue(x, y + 1) +
          getValue(x + 1, y + 1);
      }

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


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameOfLife: () => (/* binding */ GameOfLife)
/* harmony export */ });
/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine.js */ "./src/engine.js");
/* harmony import */ var _toolbar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbar.js */ "./src/toolbar.js");



class GameOfLife extends HTMLElement {
  static views = {};
  static addViewType(name, label, icon, viewInit) {
    GameOfLife.views[name] = {
      label,
      icon,
      viewInit,
    };
  }
  static get observedAttributes() {
    return [
      "view",
      "start",
      "title",
      "image",
      "width",
      "height",
      "delay",
      "scale",
      "wrapped",
      "engines",
    ];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.config();
    this.render(this);

    let gameUpdated = () => {
      this.dispatchEvent(new CustomEvent("game:updated", { detail: this }));
    };
    let events = {
      "game:updated": (e) => {},
      "game:resize": (e) => {
        let success =
          this.game && this.game.resize(e.detail.width, e.detail.height);
        if (!success) {
          let src = e.detail.event;
          if (src) {
            src.cancel = true;
            src.cancelBubble = true;
            src.stopPropagation();
          }

          let abort = e.detail.abort;
          if (abort) abort();
        }
        gameUpdated();
        return success;
      },
      "game:speed": (e) => {
        let delay = Number(e.detail);
        this.delay = delay;
        if (this.game) {
          this.game.delay = delay;
          if (this.started) {
            this.game.stop();
            this.game.start(delay);
          }
        }
        this.setAttribute("delay", delay);
        gameUpdated();
      },
      "game:scale": (e) => {
        this.scale = Number(e.detail) || 1;
        if (this.scale) {
          this.setAttribute("delay", this.scale);
          this.game.scale = this.scale;
          this.game.dataLoaded(this.game.data);
        }
        gameUpdated();
      },
      "game:reset": (e) => {
        if (this.game) {
          this.game.reset();
        }
        gameUpdated();
      },
      "game:start": (e) => {
        if (this.game) {
          this.game.start();
          this.started = true;
        }
        gameUpdated();
      },
      "game:stop": (e) => {
        if (this.game) {
          this.game.stop();
          this.started = false;
        }
        gameUpdated();
      },
    };
    Object.keys(events).forEach((eventName) => {
      this.addEventListener(eventName, events[eventName]);
    });

    // Auto start the game (if requested)
    if (this.start) this.game.start();
  }

  trigger(eventName, payload) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    let pass = ["start"].indexOf(name) >= 0;
    if (!pass && oldValue === "") return; // Skip initial value
    if (!pass && oldValue === null) return; // Skip initial value
    if (oldValue === newValue) return; // Skip initial value
    switch (name) {
      case "start":
        // Toggle start / stop
        let start = newValue == "true";
        if (start && !this.started) {
          this.trigger("game:start");
        } else if (!start && this.started) {
          this.trigger("game:stop");
        }
        break;
      case "view":
        // Change the view type
        this.setView(newValue);
        this.toolbar.render(this.toolbar);
        break;
      case "title":
        this.toolbar.gameTitle(newValue);
        break;
      case "width":
        //if (this.width !== newValue) {
        //  this.trigger("game:resize", {
        //    width: Number(newValue),
        //    height: Number(this.height),
        //    abort: () => {
        //      this.width = oldValue;
        //      this.setAttribute("width", oldValue);
        //    },
        //  });
        //}
        break;
      case "height":
        //if (this.height !== newValue) {
        //  this.trigger("game:resize", {
        //    width: Number(this.width),
        //    height: Number(newValue),
        //    abort: () => {
        //      this.height = oldValue;
        //      this.setAttribute("height", oldValue);
        //    },
        //  });
        //}
        break;
      case "delay":
        if (this.delay !== newValue) {
          this.trigger("game:speed", newValue);
          break;
        }
      case "scale":
        if (this.scale !== newValue) {
          this.trigger("game:scale", newValue);
          break;
        }
    }
    //this[name] = newValue;
  }

  config() {
    // Check for a specified view type
    this.viewType = this.getAttribute("view");
    this.engineTypes = this.getAttribute("engines");
    if (this.engineTypes) {
      this.engines = JSON.parse(this.engineTypes);
    }
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
    this.toolbar = new _toolbar_js__WEBPACK_IMPORTED_MODULE_1__.GameToolbar(this);
    this.view = this.getView(this.viewType);
    this.game = this.game || new _engine_js__WEBPACK_IMPORTED_MODULE_0__.GameEngine(this, this.view);

    target.innerHTML = ``;
    target.appendChild(this.toolbar);
    target.appendChild(this.view);

    // Bind existing game to the latest view (if changed)
    if (this.game.view != this.view) {
      this.game.view = this.view;
    }
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
    let view = viewType.viewInit();
    view.classList.add("h-full");
    return view;
  }

  setView(viewType) {
    let oldView = this.game.view;
    let newView = this.getView(viewType);
    this.viewType = viewType;
    if (newView && oldView) {
      oldView.parentElement.replaceChild(newView, oldView);
      this.game.view = newView;
      this.game.dataLoaded(this.game.data);
    }
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BenchmarkRenderer: () => (/* reexport safe */ _views_benchmark_js__WEBPACK_IMPORTED_MODULE_4__.BenchmarkRenderer),
/* harmony export */   GameEngine: () => (/* reexport safe */ _engine_js__WEBPACK_IMPORTED_MODULE_2__.GameEngine),
/* harmony export */   GameEngineCore: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.GameEngineCore),
/* harmony export */   GameOfLife: () => (/* reexport safe */ _game_js__WEBPACK_IMPORTED_MODULE_3__.GameOfLife),
/* harmony export */   GameRendererCore: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.GameRendererCore),
/* harmony export */   GameToolbar: () => (/* reexport safe */ _toolbar_js__WEBPACK_IMPORTED_MODULE_1__.GameToolbar),
/* harmony export */   HtmlDivRenderer: () => (/* reexport safe */ _views_html_js__WEBPACK_IMPORTED_MODULE_5__.HtmlDivRenderer),
/* harmony export */   ImageCanvasRenderer: () => (/* reexport safe */ _views_canvas_js__WEBPACK_IMPORTED_MODULE_7__.ImageCanvasRenderer),
/* harmony export */   SvgImageRenderer: () => (/* reexport safe */ _views_svg_js__WEBPACK_IMPORTED_MODULE_6__.SvgImageRenderer),
/* harmony export */   WebGLRenderer: () => (/* reexport safe */ _views_webgl_js__WEBPACK_IMPORTED_MODULE_8__.WebGLRenderer)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./src/core.js");
/* harmony import */ var _toolbar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbar.js */ "./src/toolbar.js");
/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine.js */ "./src/engine.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _views_benchmark_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/benchmark.js */ "./src/views/benchmark.js");
/* harmony import */ var _views_html_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/html.js */ "./src/views/html.js");
/* harmony import */ var _views_svg_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/svg.js */ "./src/views/svg.js");
/* harmony import */ var _views_canvas_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/canvas.js */ "./src/views/canvas.js");
/* harmony import */ var _views_webgl_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/webgl.js */ "./src/views/webgl.js");













/***/ }),

/***/ "./src/toolbar.js":
/*!************************!*\
  !*** ./src/toolbar.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameToolbar: () => (/* binding */ GameToolbar)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");


class GameToolbar extends HTMLElement {
  static {
    // Register custom HTML element
    customElements.define("game-toolbar", GameToolbar);
  }

  constructor(game) {
    super();
    this.parent = game;
    this.config = game || {};
  }

  connectedCallback() {
    this.render(this);
    let events = {
      // Keep toolbar values in sync with config values
      "game:updated": (e) => this.update(e.detail),
      // Track and display the frames per second
      "game:fps": (e) => this.gameFpsCounter(e.detail),
    };
    if (this.parent) {
      Object.keys(events).forEach((eventName) => {
        this.parent.addEventListener(eventName, events[eventName]);
      });
    }
  }

  render(target) {
    let config = this.config;

    target.innerHTML = `
    <style>
      img.include {
        opacity: 10%;    
      }
    </style>
    <form class="game-toolbar flex flex-col flex-0" x-data="{ show_menu: '' }">
      <div class="flex flex-0 text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-b border-gray-400 dark:border-gray-500">

        <!-- Game Engine Icon -->
        <div class="game-engine flex flex-0 pl-1 relative"></div>
    
        <!-- Game Title -->
        <p
          class="game-title flex flex-0 flex-shrink-1 py-1.5 px-2 text-sm font-bold"
          style="overflow: hidden; white-space: nowrap"
        ></p>
    
        <!-- Dimentions -->
        <label class="game-dimentions flex flex-0 py-2 text-xs font-thin">
          ( <span class="board-width"></span> x <span class="board-height"></span> )
        </label>
    
        <div class="flex flex-1 flex-shrink-0"></div>
    
        <!-- Frames Per Second -->
        <label class="game-fps-container py-1.5 text-sm font-slim italic">
          <span class="game-fps font-bold pl-2">0</span> fps
        </label>
    
        <div class="inline-flex text-sm font-medium px-2 space-x-2" role="group">
          <!-- Revert to beginning -->
          <button
            type="button"
            title="Reset Game"
            class="game-reset flex flex-1 space-x-2 items-center justify-center text-gray-400 dark:text-gray-500 hidden"
          >
            <img class="include w-6 h-6" src="/icons/revert.svg" />
          </button>
          <!-- Game Config -->
          <button
            type="button"
            title="Game Settings"
            class="game-config flex flex-1 space-x-2 items-center justify-center text-gray-400 dark:text-gray-500"            
          >
            <img class="include w-6 h-6" src="/icons/gears.svg" />
          </button>
        </div>
    
        <div class="inline-flex text-sm font-medium shadow-sm w-24" role="group">
          <!-- Stop Button -->
          <button
            type="button"
            title="Stop Game"
            class="game-stop flex flex-1 space-x-2 items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden"
          >
            <img class="include w-6 h-6" src="/icons/stop.svg" />
            <span>Stop</span>
          </button>

          <!-- Start Button -->
          <button
            type="button"
            title="Start Game"
            class="game-start flex flex-1 space-x-2 items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"            
          >
            <img class="include w-6 h-6" src="/icons/play.svg" />
            <span>Start</span>
          </button>
        </div>
      </div>
    
      <div class="game-settings flex flex-0 z-20 h-8 -mb-8 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 border-b border-gray-400 dark:border-gray-500"></div>
    </form>
    
  `;

    // Hook up button events
    this.onClick(".game-reset", () => this.trigger("game:reset"));
    this.onClick(".game-start", () => this.trigger("game:start"));
    this.onClick(".game-stop", () => this.trigger("game:stop"));
    this.onClick(".game-config", () => {
      this.show_settigs = !this.show_settigs;
      this.gameSettings(config);
    });

    // Populate the toolbar with its UI elements
    this.gameEngine(config.engines);
    this.populateSettings(config);
    this.populateViewTypes(_game_js__WEBPACK_IMPORTED_MODULE_0__.GameOfLife.views);
    this.gameFpsCounter(0);

    // Update UI elements
    this.update(config);

    // Capture Config changes
    this.onChanged(".game-width", (e) =>
      this.trigger("game:resize", {
        width: Number(e.target.value),
        height: config.height,
        event: e,
      })
    );
    this.onChanged(".game-height", (e) =>
      this.trigger("game:resize", {
        width: config.width,
        height: Number(e.target.value),
        event: e,
      })
    );
    this.onChanged(".game-delay", (e) =>
      this.trigger("game:speed", e.target.value)
    );

    // Try and load the SVG images inline, so it can take advantage of styling
    this.inlineIncludeImages(target);
  }

  update(config) {
    this.gameTitle(config.title);
    this.gameDimentions(config);
    this.gameResetBtn(!config.started && config.game && config.game.generation);
    this.gameConfigBtn(!config.started);
    this.gameStartBtn(!config.started);
    this.gameStopBtn(config.started);
    this.gameSettings(config);

    if (!config.started) {
      // Hide the FPS counter
      this.gameFpsCounter(0);
    }
  }

  onClick(selector, action) {
    let elem = this.querySelector(selector);
    if (elem) {
      elem.addEventListener("click", action);
    }
  }

  onChanged(selector, action) {
    let elem = this.querySelector(selector);
    if (elem) {
      elem.addEventListener("change", action);
    }
  }

  trigger(eventName, payload) {
    let event = new CustomEvent(eventName, { bubbles: true, detail: payload });
    this.dispatchEvent(event);
  }

  gameEngine(engines) {
    let container = this.querySelector(".game-engine");
    if (!container) return;

    // Set the templated content
    container.innerHTML = `
    <button
        type="button"
        class="game-engines-btn p-2 -m-2 cursor-default"
    >
        <img class="include w-6 h-6" src="/icons/cpu.svg" />
    </button>
    <div class="game-engines-menu hidden absolute origin-top-left left-0 z-30 mt-8 w-40 shadow-lg bg-white dark:bg-gray-700">
        <div
            class="text-gray-500 dark:text-gray-400 outline outline-gray-300 dark:outline-gray-500"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
        >
            <div class="px-2 py-2 text-sm font-bold border-b border-gray-200 dark:border-gray-500">
                Select Game Engine
            </div>
            <div class=game-engines-menu-items></div>
        </div>
    </div>
`;

    // Get refs to UI components
    this.gameEnginesButton = container.querySelector(".game-engines-btn");
    this.gameEnginesMenu = container.querySelector(".game-engines-menu");
    this.gameEnginesMenuItems = container.querySelector(
      ".game-engines-menu-items"
    );

    // Check if we have additional game engines that can be bound
    let queryParams = window.location.search;
    let selected = new URLSearchParams(queryParams).get("engine") || "latest";
    if (engines && engines.length && this.gameEnginesMenu) {
      // Clear previous contents
      this.gameEnginesMenuItems.innerHTML = "";

      // Hook up button click to toggle the menu
      this.gameEnginesButton.classList.add("cursor-pointer");
      this.gameEnginesButton.classList.remove("cursor-default");
      this.gameEnginesButton.onclick = () => {
        this.gameEnginesMenu.classList.toggle("hidden");
      };

      // Populate with menu items for selecting different engine types
      engines.forEach((id) => {
        let item = document.createElement("A");
        let css =
          "flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600";
        let style =
          id == selected
            ? css + "font-bold text-gray-900 dark:text-white"
            : css;

        item.setAttribute("role", "menuitem");
        item.className = style;
        item.onclick = () => {
          this.updateQueryParams({ engine: id }, true);
          this.gameEnginesMenu.classList.add("hidden");
        };
        item.innerHTML = `
            <img class="include w-6 h-6" src="/icons/cpu.svg" />
            <span class="py-0.5">${id}</span>
        `;

        this.gameEnginesMenuItems.appendChild(item);
      });
    }
  }

  gameTitle(title) {
    let container = this.querySelector(".game-title");
    if (container) {
      container.innerHTML = title || `Game of Life`;
    }
  }

  gameDimentions(config) {
    let container = this.querySelector(".game-dimentions");
    if (!container) return;

    let setText = (qry, val) => {
      let elem = container.querySelector(qry);
      if (elem) elem.innerHTML = val;
    };

    if (config.width && config.height) {
      setText(".board-width", config.width);
      setText(".board-height", config.height);
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameFpsCounter(fps) {
    let container = this.querySelector(".game-fps-container");
    let label = this.querySelector(".game-fps");
    if (!container) return;
    if (fps) {
      label.innerHTML = fps;
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameResetBtn(show) {
    let container = this.querySelector(".game-reset");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameConfigBtn(show) {
    let container = this.querySelector(".game-config");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameStartBtn(show) {
    let container = this.querySelector(".game-start");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameStopBtn(show) {
    let container = this.querySelector(".game-stop");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameSettings(config) {
    let show = !config.started && this.show_settigs;
    let container = this.querySelector(".game-settings");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }

    let setValue = (qry, val) => {
      let elem = this.querySelector(qry);
      if (elem) elem.value = val;
    };

    // Update the input values
    setValue("input.game-width", config.width);
    setValue("input.game-height", config.height);
    setValue("input.game-delay", config.delay);
  }

  populateSettings(config) {
    let container = this.querySelector(".game-settings");
    if (!container) return;

    container.innerHTML = `
    <div class="flex w-full relative px-2 space-x-2 border-y-1">

      <!-- Set Width -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Width</span>
        <input
          type="text"
          class="game-width w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <!-- Set Height -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Height</span>
        <input
          type="text"
          class="game-height w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <!-- Set Delay -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Delay</span>
        <input
          type="text"
          class="game-delay w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <div class="flex flex-1"></div>

      <div class="game-views flex flex-0 relative space-x-2">
        <div class="flex flex-0">
          <button
            type="button"
            title="View Options"
            class="game-views-btn px-2 -mx-2"
          >
            <img class="include w-6 h-6" src="/icons/ellipsis-vertical.svg" />
          </button>
          <div
            id="dropdown-menu"
            class="game-views-menu hidden origin-top-right absolute right-0 mt-8 w-40 shadow-lg bg-white dark:bg-gray-700 ring-1 ring-gray-500 ring-opacity-5"
          >
            <div
              class="text-gray-500 dark:text-gray-400 outline outline-gray-300 dark:outline-gray-500"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <div class="px-2 py-2 text-sm font-bold border-b border-gray-200 dark:border-gray-500">
                Select View Type
              </div>
              <div class="game-views-menu-body"></div>
              <hr class="border border-gray-200 dark:border-gray-500" />
              <div class="game-views-menu-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
    this.inlineIncludeImages(container);
  }

  populateViewTypes(views) {
    let container = this.querySelector(".game-views");
    if (!container) return;

    let current =
      this.parent.viewType ||
      new URLSearchParams(window.location.search).get("view");
    let styles =
      "flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600";
    let styleSelected = "font-bold text-gray-900 dark:text-white";

    let viewMenuBtn = container.querySelector(".game-views-btn");
    let viewMenuWindow = container.querySelector(".game-views-menu");
    let viewMenuContent = container.querySelector(".game-views-menu-body");
    let viewMenuBottom = container.querySelector(".game-views-menu-bottom");

    if (viewMenuBtn && viewMenuWindow)
      viewMenuBtn.addEventListener("click", () => {
        this.show_views = !this.show_views;
        if (this.show_views) {
          viewMenuWindow.classList.remove("hidden");
        } else {
          viewMenuWindow.classList.add("hidden");
        }
      });

    let menuItemClick = (key, info) => {
      this.updateQueryParams({ view: key }, false);
      this.show_views = false;

      // Create and attach the new view
      this.parent.setView(key);

      // Update the menu to show new selected item
      current = key;
      menuItemsRecreate();

      // Update the menu to show newly seleted menu its
      if (viewMenuWindow) viewMenuWindow.classList.add("hidden");
    };

    let menuItemCreate = (key) => {
      let info = views[key];
      let css = current == key ? styles + styleSelected : styles;
      let target = key == "benchmark" ? viewMenuBottom : viewMenuContent;
      let item = document.createElement("A");

      item.setAttribute("role", "menuitem");
      item.className = css;
      item.addEventListener("click", () => menuItemClick(key, info));
      item.innerHTML = `
        <img class="include w-6 h-6" src="${info.icon}" />
        <span class="py-0.5">${info.label}</span>
        `;

      target.appendChild(item);
    };

    // Attach the menu items for all the registered view types
    let menuItemsRecreate = () => {
      viewMenuContent.innerHTML = "";
      viewMenuBottom.innerHTML = "";
      Object.keys(views).forEach(menuItemCreate);
      this.inlineIncludeImages(container);
    };
    menuItemsRecreate();

    // Inline SVG images
    //this.inlineIncludeImages(container);
  }

  inlineIncludeImages(target) {
    let includes = target.querySelectorAll("img.include");
    let loadSVG = async (target, src) => {
      let replace = document.createElement("span");
      let response = await fetch(src);
      replace.innerHTML = await response.text();
      for (var i = 0; i < target.attributes.length; i++) {
        var attr = target.attributes[i];
        replace.setAttribute(attr.name, attr.value);
      }
      if (target.parentNode) {
        target.parentNode.replaceChild(replace, target);
      }
    };
    if (includes) {
      includes.forEach((elem) => {
        let src = elem.getAttribute("src");
        if (src) loadSVG(elem, src);
      });
    }
  }

  updateQueryParams(changes, reload = false) {
    if (!changes) return;
    let params = new URLSearchParams(window.location.search);
    Object.keys(changes).forEach((key) => params.set(key, changes[key]));
    history.pushState(null, null, "?" + params.toString());
    if (reload) window.location.reload();
  }
}


/***/ }),

/***/ "./src/views/benchmark.js":
/*!********************************!*\
  !*** ./src/views/benchmark.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BenchmarkRenderer: () => (/* binding */ BenchmarkRenderer)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core.js */ "./src/core.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game.js */ "./src/game.js");



class BenchmarkRenderer extends _core_js__WEBPACK_IMPORTED_MODULE_0__.GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-benchmark", BenchmarkRenderer);
    _game_js__WEBPACK_IMPORTED_MODULE_1__.GameOfLife.addViewType(
      "benchmark",
      "Run Benchmark",
      "icons/benchmark.svg",
      () => new BenchmarkRenderer()
    );
  }

  constructor() {
    super();
    this.addEventListener("game:fps", (e) => {
      this.updateFPS(e.detail);
    });
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
<style>
  .metric svg {
    width: 100%;
  }

  .metric path {
    stroke-width: 75;
    stroke: #ecf0f1;
    fill: none;
  }

  .metric text {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .metric path.data-arc {
    stroke: #3498db;
  }

  .metric text {
    fill: #3498db;
  }
</style>
<div class="flex flex-col flex-1 justify-center justify-items-center items-center">
  <div class="game-board flex flex-col w-full mx-auto space-y-2 text-center justify-center items-center">
    <div class="metric w-full">
      <svg viewBox="0 0 1000 500">
        <path d="M 950 500 A 450 450 0 0 0 50 500"></path>
        <path class="data-arc" d=""></path>
        <text
          class="benchmark-fps"
          text-anchor="middle"
          alignment-baseline="middle"
          x="500"
          y="300"
          font-size="140"
          font-weight="bold"
        ></text>
        <text
          class="benchmark-title"
          text-anchor="middle"
          alignment-baseline="middle"
          x="500"
          y="450"
          font-size="90"
          font-weight="normal"
        >
          Press Start
        </text>
      </svg>
    </div>    
    <h4 class="benchmark-subtitle text-2xl font-bold dark:text-white"></h4>
  </div>
</div>
`;

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.fpsCounter = target.querySelector(".game-fps");
    this.fpsMetric = target.querySelector(".benchmark-fps");
    this.fpsTitle = target.querySelector(".benchmark-title");
    this.subtitleSelector = target.querySelector(".benchmark-subtitle");
    this.svgPath = target.querySelector(".metric svg .data-arc");
  }

  setLoading(active, context) {
    if (!this.subtitleSelector) return;
    if (active) {
      // Set the loading screen feedback
      console.log("Loading benchmark into:", this);
      this.subtitleSelector.innerHTML = "<em>Loading...</em>";
    } else {
      // Crear previous contents
      this.subtitleSelector.innerHTML = "";
    }
  }

  createView(game, data) {
    let config = game.config;
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;

    if (this.board) {
      this.board.style["min-width"] = `${width * scale}px`;
      this.board.style["min-height"] = `${height * scale}px`;
    }

    let setText = (qry, val) => {
      let elem = this.querySelector(qry);
      if (elem) elem.innerHTML = val;
    };

    setText(".board-width", width);
    setText(".board-height", height);

    if (this.subtitleSelector) {
      this.subtitleSelector.innerHTML = `${config.title} ( ${width} x ${height} )`;
    }
  }

  updateView(game, data) {
    if (this.fpsTitle) {
      this.fpsTitle.innerHTML = `Generation: ${game.generation}`;
    }
  }

  updateFPS(fps) {
    // Theoretical max frequency with setTimeout is 250 hertz
    let percentage = Math.min(1, fps / 250);

    // Update DOM elements for benchmark stats
    if (this.fpsCounter) {
      this.fpsCounter.innerHTML = `${fps}`;
    }
    if (this.fpsMetric) {
      this.fpsMetric.innerHTML = `${fps} fps`;
    }

    // Update SVG element(s)
    if (this.svgPath) {
      let polar_to_cartesian = (cx, cy, radius, angle) => {
        let radians = ((angle - 90) * Math.PI) / 180.0;
        return [
          Math.round((cx + radius * Math.cos(radians)) * 100) / 100,
          Math.round((cy + radius * Math.sin(radians)) * 100) / 100,
        ];
      };
      let svg_circle_arc_path = (x, y, radius, start_angle, end_angle) => {
        let start_xy = polar_to_cartesian(x, y, radius, end_angle);
        let end_xy = polar_to_cartesian(x, y, radius, start_angle);
        return (
          "M " +
          start_xy[0] +
          " " +
          start_xy[1] +
          " A " +
          radius +
          " " +
          radius +
          " 0 0 0 " +
          end_xy[0] +
          " " +
          end_xy[1]
        );
      };
      let path = svg_circle_arc_path(
        500,
        500,
        450,
        -90,
        percentage * 180.0 - 90
      );
      this.svgPath.setAttribute("d", path);
    }

    //console.log(timeline);
    //if (timeline) {
    //  let bar = document.createElement("DIV");
    //  bar.setAttribute("style", `height: ${Math.floor(100 * percentage)}%`);
    //  bar.classList.add("w-2");
    //  bar.classList.add("bg-green-500");
    //  if (timeline.children.length > 256) {
    //    // Truncate trailing part of the timeline...
    //    timeline.removeChild(timeline.children[0]);
    //  }
    //  // Add latest slice
    //  timeline.appendChild(bar);
    //}
  }
}


/***/ }),

/***/ "./src/views/canvas.js":
/*!*****************************!*\
  !*** ./src/views/canvas.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCanvasRenderer: () => (/* binding */ ImageCanvasRenderer)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core.js */ "./src/core.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game.js */ "./src/game.js");



class ImageCanvasRenderer extends _core_js__WEBPACK_IMPORTED_MODULE_0__.GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-image-canvas", ImageCanvasRenderer);
    _game_js__WEBPACK_IMPORTED_MODULE_1__.GameOfLife.addViewType(
      "canvas",
      "Image Canvas",
      "icons/canvas.svg",
      () => new ImageCanvasRenderer()
    );
  }

  constructor() {
    super();

    // Track if and when dark mode changes occur
    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type !== "attributes" ||
          mutation.attributeName !== "class"
        ) {
          return;
        }
        this.updateTheme();
      }
    });
    this.observer.observe(document.body, { attributes: true });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  updateTheme() {
    if (!this.board) return;
    if (document.body.classList.contains("dark")) {
      this.fill = "#FFF";
      this.board.classList.add("dark");
    } else {
      this.fill = "#000";
      this.board.classList.remove("dark");
    }
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
<style>
  .game-board {}  
  .game-cells {
    fill: #000;
  }
  .dark .game-cells {
    fill: #FFF;
  }
</style>
<div class="flex flex-col justify-start">
    <div class="flex flex-col flex-1 justify-center relative">                
        <svg class="game-board" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
            </pattern>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="url(#smallGrid)"/>
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />          
        </svg>        
        <div class="absolute left-0 top-0 right-0 bottom-0">
          <canvas class="game-canvas" style="width:100%; height:100%" width="460" height="314"></canvas>
        </div>
    </div> 
</div>
    `;

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.canvas = target.querySelector(".game-canvas");
    this.updateTheme();
  }

  setLoading(active, context) {}

  createView(game, data) {
    let config = game.config;
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;

    let board = this.board;
    if (!board) return;

    // Set the board dimentions
    board.setAttribute("viewBox", `0 0 ${width} ${height}`);
    board.style["min-width"] = `${width * scale}px`;
    board.style["min-height"] = `${height * scale}px`;

    // Populate the game board cells
    if (!this.canvas) return;
    this.canvas.setAttribute("width", width * scale);
    this.canvas.setAttribute("height", height * scale);

    let context = this.canvas.getContext("2d");
    context.fillStyle = this.fill;
    context.clearRect(0, 0, width * scale, height * scale);
    for (let y = 0; y < height; y++) {
      let offset = y * width;
      for (let x = 0; x < width; x++) {
        if (data[x + offset]) {
          context.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }

  updateView(game, data) {
    if (!this.canvas) return;
    let width = game.config.width;
    let height = game.config.height;
    let scale = game.config.scale || 1;
    let context = this.canvas.getContext("2d");
    context.fillStyle = this.fill;
    context.clearRect(0, 0, width * scale, height * scale);
    for (let y = 0; y < height; y++) {
      let offset = y * width;
      for (let x = 0; x < width; x++) {
        if (data[x + offset]) {
          context.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }
}


/***/ }),

/***/ "./src/views/html.js":
/*!***************************!*\
  !*** ./src/views/html.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlDivRenderer: () => (/* binding */ HtmlDivRenderer)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core.js */ "./src/core.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game.js */ "./src/game.js");



class HtmlDivRenderer extends _core_js__WEBPACK_IMPORTED_MODULE_0__.GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-html-divs", HtmlDivRenderer);
    _game_js__WEBPACK_IMPORTED_MODULE_1__.GameOfLife.addViewType(
      "html",
      "HTML Divs",
      "icons/html.svg",
      () => new HtmlDivRenderer()
    );
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.root = this.shadow;

    // Track if and when dark mode changes occur
    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type !== "attributes" ||
          mutation.attributeName !== "class"
        ) {
          return;
        }
        this.updateTheme();
      }
    });
    this.observer.observe(document.body, { attributes: true });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
    <style>
      .game-board {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      .game-board .row {
        display: flex;
        flex-grow: 1;
      }
      .game-board .row [value] {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        min-width: 1px;
        min-height: 1px;
      }
      .game-board .row [value]:hover {
        cursor: pointer;
      }
      .game-board .row [value="0"]:hover {
        background-color: #aaaaaa44;
      }
      .game-board .row [value="1"] {
        background-color: #000000;
      }
      
      .dark .game-board .row [value="0"]:hover {
        background-color: #aaaaaa44;
      }
      .dark .game-board .row [value="1"] {
        background-color: #ffffff;
      }
    </style>
    <div class="game-container flex flex-col flex-1 justify-center" style="position: relative; height: 100%">      
      <svg class="game-grid" style="position: absolute; left:0; top:0; right:0 bottom:0;" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
            <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
          </pattern>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="url(#smallGrid)"/>
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />          
      </svg>
      <div class="game-board"></div>
      
    </div>
`;
    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.grid = target.querySelector(".game-grid");
    this.container = target.querySelector(".game-container");
    this.updateTheme();
  }

  setLoading(active) {
    if (!this.board) return;
    if (active) {
      // Set the loading screen feedback
      console.log("Loading board game into:", this);
      this.board.innerHTML = "<em>Loading...</em>";
    } else {
      // Crear previous contents
      this.board.innerHTML = "";
    }
  }

  createView(game, data) {
    let config = game.config;
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;

    if (this.grid) {
      this.grid.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }

    let board = this.board;
    if (!board) return;

    // Set the board dimentions
    board.style["min-width"] = `${width * scale}px`;
    board.style["min-height"] = `${height * scale}px`;
    board.style["aspect-ratio"] = `${width} / ${height}`;

    // Create the canvas to visualise the data
    this.width = width;
    this.height = height;
    this.canvas = Array(width * height);
    for (let y = 0; y < height; y++) {
      // Create the element to put on the board
      let rowElem = document.createElement("DIV");
      rowElem.className = "row";
      board.appendChild(rowElem);

      // Create each row and populate each row
      for (let x = 0; x < width; x++) {
        // Compute the target cell's value
        let val = data[x + y * width] ? 1 : 0;

        // Create the cell at this x/y position on the board
        let cellElem = document.createElement("DIV");
        cellElem.id = `${x}x${y}`;
        cellElem.setAttribute("value", val);
        cellElem.onclick = this.handleClick(x, y, cellElem);
        cellElem.onmouseenter = this.handleOnEnter(x, y, cellElem);
        rowElem.appendChild(cellElem);

        // Save ref to element
        this.canvas[x + y * width] = cellElem;
      }
    }
  }

  updateView(game, data) {
    let config = game.config;
    let total = config.width * config.height;
    for (let i = 0; i < total; i++) {
      let elem = this.canvas[i];
      if (elem) {
        elem.setAttribute("value", data[i] || 0);
      }
    }
  }

  updateTheme() {
    if (!this.container) return;
    if (document.body.classList.contains("dark")) {
      this.container.classList.add("dark");
    } else {
      this.container.classList.remove("dark");
    }
  }

  paint(x, y, val) {
    let elem = this.canvas[x + y * this.width];
    if (elem) {
      elem.setAttribute("value", val || 0);
    }
  }

  handleClick(x, y, elem, val) {
    return () => {
      val = elem.getAttribute("value") == "1" ? 0 : 1;
      this.paint(x, y, val);
    };
  }

  handleOnEnter(x, y, elem, val) {
    return (evt) => {
      if (evt.buttons === 1) {
        val = elem.getAttribute("value") == "1" ? 0 : 1;
        this.paint(x, y, val);
      }
    };
  }
}


/***/ }),

/***/ "./src/views/svg.js":
/*!**************************!*\
  !*** ./src/views/svg.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgImageRenderer: () => (/* binding */ SvgImageRenderer)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core.js */ "./src/core.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game.js */ "./src/game.js");



class SvgImageRenderer extends _core_js__WEBPACK_IMPORTED_MODULE_0__.GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-svg-image", SvgImageRenderer);
    _game_js__WEBPACK_IMPORTED_MODULE_1__.GameOfLife.addViewType(
      "svg",
      "SVG Image",
      "icons/svg.svg",
      () => new SvgImageRenderer()
    );
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.root = this.shadow;

    // Track if and when dark mode changes occur
    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type !== "attributes" ||
          mutation.attributeName !== "class"
        ) {
          return;
        }
        this.updateTheme();
      }
    });
    this.observer.observe(document.body, { attributes: true });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }
  
  updateTheme() {
    if (!this.board) return;
    if (document.body.classList.contains("dark")) {
      this.board.classList.add("dark");
    } else {
      this.board.classList.remove("dark");
    }
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
<style>
  .game-board {}  
  .game-cells {
    fill: #000;
  }
  .dark .game-cells {
    fill: #FFF;
  }
</style>
<div class="flex flex-col justify-start">
    <div class="flex flex-col flex-1 justify-center">        
        <svg class="game-board" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
            </pattern>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="url(#smallGrid)"/>
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <g class="game-cells" >
            <rect x="10" y="9" width="1" height="1" />
            <rect x="10" y="8" width="1" height="1" />
            <rect x="10" y="7" width="1" height="1" />
            <rect x="10" y="6" width="1" height="1" />
          </g>
        </svg>
    </div> 
</div>
    `;

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.cells = target.querySelector(".game-cells");
    this.updateTheme();
  }

  setLoading(active, context) {}

  createView(game, data) {
    let config = game.config;
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;

    let board = this.board;
    if (!board) return;

    // Set the board dimentions
    board.setAttribute("viewBox", `0 0 ${width} ${height}`);
    board.style["min-width"] = `${width * scale}px`;
    board.style["min-height"] = `${height * scale}px`;

    // Populate the game board cells
    if (!this.cells) return;
    let svgns = "http://www.w3.org/2000/svg";
    this.cells.innerHTML = "";
    this.width = width;
    this.height = height;
    this.canvas = Array(width * height);
    for (let y = 0; y < height; y++) {
      let offset = y * width;
      for (let x = 0; x < width; x++) {
        let rect = document.createElementNS(svgns, "rect");
        let val = data[x + y * width];
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", 1);
        rect.setAttribute("height", 1);
        rect.style.display = val ? "" : "none";
        this.canvas[x + offset] = rect;
        this.cells.appendChild(rect);
      }
    }
  }

  updateView(game, data) {
    let config = game.config;
    let total = config.width * config.height;
    for (let i = 0; i < total; i++) {
      let rect = this.canvas[i];
      let val = data[i];
      if (rect) {
        rect.style.display = val ? "" : "none";        
      }
    }
  }
}


/***/ }),

/***/ "./src/views/webgl.js":
/*!****************************!*\
  !*** ./src/views/webgl.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebGLRenderer: () => (/* binding */ WebGLRenderer)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core.js */ "./src/core.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game.js */ "./src/game.js");



class WebGLRenderer extends _core_js__WEBPACK_IMPORTED_MODULE_0__.GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-webgl", WebGLRenderer);
    _game_js__WEBPACK_IMPORTED_MODULE_1__.GameOfLife.addViewType(
      "webgl",
      "WebGL (GPU)",
      "icons/gpu.svg",
      () => new WebGLRenderer()
    );
  }

  constructor() {
    super();

    // Track if and when dark mode changes occur
    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type !== "attributes" ||
          mutation.attributeName !== "class"
        ) {
          return;
        }
        this.updateTheme();
      }
    });
    this.observer.observe(document.body, { attributes: true });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  updateTheme() {
    if (!this.board) return;
    if (document.body.classList.contains("dark")) {
      this.color = 1.0;
      this.board.classList.add("dark");
    } else {
      this.color = 0.0;
      this.board.classList.remove("dark");
    }
    if (this.game && this.data) {
      this.createView(this.game, this.data);
    }
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
<style>
  .game-board {
    width: 100%;
    height: 100%;
  }
</style>
<div class="flex flex-col justify-start">
    <div class="flex flex-col flex-1 justify-center relative">                
        <svg class="game-board" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
            </pattern>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="url(#smallGrid)"/>
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />          
        </svg>
        <div class="absolute left-0 top-0 right-0 bottom-0">
          <canvas class="game-canvas" style="width:100%; height:100%" width="460" height="314"></canvas>
          <div class="not-supported hidden flex flex-1 h-full text-center text-3xl items-center justify-center">
            WebGL not supported by your browser.
          <div>
        </div>
    </div> 
</div>
    `;

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.canvas = target.querySelector(".game-canvas");
    this.unsupported = target.querySelector(".not-supported");
    this.updateTheme();
  }

  setLoading(active, context) {}

  createView(game, data) {
    let config = game.config;
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;
    let board = this.board;
    if (!board) return;

    // Remember game settings
    this.game = game;
    this.data = data;
    this.width = width;
    this.height = height;

    // Set the board dimentions
    board.setAttribute("viewBox", `0 0 ${width} ${height}`);
    board.style["min-width"] = `${width * scale}px`;
    board.style["min-height"] = `${height * scale}px`;

    // Populate the game board cells
    if (!this.canvas) return;
    this.canvas.setAttribute("width", width * scale);
    this.canvas.setAttribute("height", height * scale);

    // Initialize the GL context
    // Only continue if WebGL is available and working
    this.gl = this.initWebGL(this.canvas);
    if (this.gl === null) {
      if (this.canvas) this.canvas.classList.add("hidden");
      if (this.unsupported) this.unsupported.classList.remove("hidden");
      return;
    }

    // Clear the canvas and recreate scene
    this.createScene(this.gl, width, height, data);
    this.drawScene(this.gl);
  }

  updateView(game, data) {
    if (!this.canvas) return;
    let width = game.config.width;
    let height = game.config.height;

    // Clear the canvas and recreate scene
    this.createScene(this.gl, width, height, data);
    this.drawScene(this.gl);
  }

  initWebGL(canvas) {
    let gl = canvas.getContext("webgl");
    if (gl === null) {
      console.warn(
        "Unable to initialize WebGL. Your browser may not support it."
      );
      return null;
    }

    // Init shaders
    let vs = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    void main() {
        gl_Position = a_Position;
    }`;
    let fs = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }`;
    if (!this.initShaders(gl, vs, fs)) {
      console.log("Failed to intialize shaders.");
      return null;
    }
    return gl;
  }

  initShaders(gl, vs_source, fs_source) {
    // Create program
    var glProgram = gl.createProgram();

    // Compile shaders
    var vertexShader = this.makeShader(gl, vs_source, gl.VERTEX_SHADER);
    var fragmentShader = this.makeShader(gl, fs_source, gl.FRAGMENT_SHADER);

    // Attach and link shaders to the program
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program");
      return false;
    }

    // Use program
    gl.useProgram(glProgram);
    gl.program = glProgram;

    return true;
  }

  makeShader(gl, src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
      return;
    }
    return shader;
  }

  createScene(gl, width, height, data) {
    let dim = 3;
    let points = [];
    let indices = [];

    // Create the buffer of artifacts to render in the scene
    for (let y = 0; y < height; y++) {
      let dy = -2 * (y / this.height) + 1;
      for (let x = 0; x < width; x++) {
        let dx = 2 * (x / this.width) - 1;
        // Add point to pint array
        points.push(dx, dy, 0);

        // Check if the cell is to be drawn
        if (data[x + y * width]) {
          let from = x + y * width;
          let ends = x + 1 + (y + 1) * width;
          indices.push(from, from + 1, ends, from, ends - 1, ends);
        }
      }
    }

    // Create and attach all point vertices for the scene
    this.applyBuffer(gl, points, "a_Position");

    // Set Indices to draw the triangles over selected cells
    let indexBuffer = new Uint16Array(indices);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexBuffer, gl.STATIC_DRAW);
    this.applyBuffer(gl, indices);
    this.n = indexBuffer.length;
  }

  applyBuffer(gl, values, bindAttr, callback) {
    // Create a buffer for the square's positions.
    let dim = 3;
    let buffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);

    if (bindAttr) {
      let vertexAttr = gl.getAttribLocation(gl.program, bindAttr);
      gl.enableVertexAttribArray(vertexAttr);
      gl.vertexAttribPointer(vertexAttr, dim, gl.FLOAT, false, 0, 0);
    }

    if (callback) {
      callback(buffer);
    }

    return buffer;
  }

  drawScene(gl) {
    let n = this.n;
    let type = gl.UNSIGNED_SHORT;

    // TODO: Support larger indexed buffer sizes
    //const ext = gl.getExtension("OES_element_index_uint");
    //if (ext) type = gl.UNSIGNED_INT;

    // Enable 3D depth tests
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    // Clear canvas before drawing
    gl.clearColor(0.0, 0.0, 0.0, 0);
    gl.clearDepth(1.0); // Clear everything
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Draw the elements to the screen
    //gl.drawArrays(gl.TRIANGLES, 0, n);
    gl.drawElements(gl.TRIANGLES, n, type, 0);
  }

  tickAction(game, callback) {
    // Redraw scene using WebGL
    this.drawScene(this.gl);
    if (callback) callback();

    // Trigger the next frame
    requestAnimationFrame(() => {
      if (!game.config.started) return;
      this.tickAction(game, callback);
    });
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/web-component.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");


window.customElements.define('game-of-life', _index_js__WEBPACK_IMPORTED_MODULE_0__.GameOfLife);

})();

/******/ })()
;
//# sourceMappingURL=game-of-life.js.map