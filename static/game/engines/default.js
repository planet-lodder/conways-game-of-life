class GameEngine {
  generation = 0;
  intv = null;

  constructor() {}

  load(target) {}

  init(board, preset, data) {}

  start() {}

  stop() {}

  tick() {}

}

class HtmlRenderer {
  board = null

  constructor(target) {
    self.board = document.querySelector(target);
  }

  paint(x, y, elem, val) {}
  handleClick(x, y, elem, val) {}
  handleOnEnter(x, y, elem, val) {}

}

let engine = {
  fpsSelector: "#fps-counter",
  scale: 5,
  width: 60,
  height: 40,
  data: [],
  delay: 0,
  wrapped: false,
  generation: 0,
  intv: null,
  load: function (target) {
    // Find the target element to use as the board canvas
    board = document.querySelector(target);
    board.innerHTML = "<em>Loading...</em>";

    // Load the preset (by reading attributes)
    let preset = {
      title: board.getAttribute("title"),
      image: board.getAttribute("image"),
      width: board.getAttribute("width"),
      height: board.getAttribute("height"),
      scale: board.getAttribute("scale"),
      delay: board.getAttribute("delay"),
      wrapped: board.getAttribute("wrapped"),
    };
    console.log("Loading board game...", preset);

    if (preset.image) {
      // Load the board game data from the source image
      data = engine.loadImage(preset.image, (data) =>
        engine.init(board, preset, data)
      );
      return; // Wait for image to load and then initialise...
    } else {
      // Set defaults if no image is supplied
      preset.title = preset.title || "Blank Canvas";
      preset.width = preset.width || 60;
      preset.height = preset.height || 40;
      preset.scale = preset.scale || 16;

      // Load a blank canvas
      data = Array(engine.width);
      for (x = 0; x < engine.width; x++) {
        data[x] = Array(engine.height);
        for (y = 0; y < engine.height; y++) {
          data[x][y] = 0;
        }
      }
      engine.init(board, preset, data);
    }
  },
  loadImage: function (src, callback) {
    let onLoad = (evt, target) => {
      const img = target;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let data = Array(canvas.width);
      let buffer = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          let i = (x + y * canvas.width) * 4;
          let r = buffer[i];
          let g = buffer[i + 1];
          let b = buffer[i + 2];
          let a = buffer[i + 3];
          let val = a < 64 || (r + g + b) / 3 > 192 ? 0 : 1;
          data[x] = data[x] || Array(canvas.height);
          data[x][y] = val;
        }
      }
      if (callback) callback(data);
    };
    img = document.createElement("IMG");
    img.src = src;
    img.style.display = "none";
    img.style.position = "absolute";
    img.style.bottom = "0";
    img.style.right = "0";
    img.addEventListener("load", (e) => onLoad(e, img));
    document.body.appendChild(img);
  },
  init: function (board, preset, data) {
    engine.data = data;
    engine.width = preset.width || data.length;
    engine.height = preset.height || data[0].length;
    engine.scale = preset.scale || engine.scale;
    engine.wrapped = preset.wrapped || engine.wrapped;
    engine.delay = !isNaN(preset.delay) ? preset.delay : engine.delay;

    // Calculate the new dimentions
    w = engine.width;
    h = engine.height;
    ratio = Math.min(w / screen.width, h / screen.height);
    scale = engine.scale;
    board.innerHTML = ""; // Crear prev.
    board.style["min-width"] = `${w * scale}px`;
    board.style["min-height"] = `${h * scale}px`;

    // Create the canvas to visualise the data
    console.log("Creating game board...", [w, h]);
    canvas = Array(h);
    self.canvas = canvas;
    for (y = 0; y < h; y++) {
      // Create a new data colum
      canvas[y] = Array(w);

      // Create the element to put on the board
      rowElem = document.createElement("DIV");
      rowElem.className = "row";
      board.appendChild(rowElem);

      // Create each row and populate each row
      for (x = 0; x < w; x++) {
        // Compute the target cell's value
        col = data && data.length >= x ? data[x] : [];
        cell = col && col.length >= y ? col[y] : null;
        val = cell ? 1 : 0;

        // Create the cell at this x/y position on the board
        cellElem = document.createElement("DIV");
        cellElem.id = `${x}x${y}`;
        cellElem.setAttribute("value", val);
        cellElem.onclick = engine.handleClick(x, y, cellElem);
        cellElem.onmouseenter = engine.handleOnEnter(x, y, cellElem);
        rowElem.appendChild(cellElem);

        canvas[y][x] = cellElem;
      }
    }
  },
  start: function (delay) {
    console.log("Starting the game", delay);
    // Set the game defaults when starting
    engine.generation = 0;

    // Start running game ticks
    engine.intv = setInterval(engine.tick, engine.delay);

    // Compute the fps each second
    oldCount = engine.generation;
    fpsElem = document.querySelector(engine.fpsSelector);
    fps_intv = setInterval(() => {
      if (!engine.intv) {
        clearInterval(fps_intv); // Simulation stopped
        return;
      }
      if (fpsElem) {
        // Update DOM element
        fpsElem.setAttribute("value", engine.generation - oldCount);
      }
      oldCount = engine.generation;
    }, 1000);
  },
  stop: function () {
    console.log("Stopping the game");
    clearInterval(engine.intv);
    engine.intv = null;
  },
  tick: function () {
    // Start new generation
    engine.generation++;

    const getValue = (x, y) => {
      if (engine.wrapped) {
        x = (x + engine.width) % engine.width;
        y = (y + engine.height) % engine.height;
      } else {
        if (x < 0 || x >= engine.width) return 0;
        if (y < 0 || y >= engine.height) return 0;
      }
      return engine.data[x][y];
    };
    const newValue = (x, y) => {
      // Check each neighbor cell and count them
      count = 0; // Keep track of the count
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          count += dx == 0 && dy == 0 ? 0 : getValue(x + dx, y + dy);
          if (count > 3) return 0; // Over-populated, cell dies, no need to continue
        }
      }
      val = getValue(x, y); // Get current value
      if (count == 3) return 1; // Cell is alive if count exactly 3
      if (count == 2 && val) return 1; // Cell stays alive if 2 neighbors
      return 0; // Cell is dead or not enough siblings
    };

    // Calculate for each cell its new value
    data = []; // New data frame
    for (x = 0; x < w; x++) {
      data[x] = Array(engine.width);
      for (y = 0; y < h; y++) {
        // Set new value for the cell
        val = newValue(x, y);
        data[x][y] = val;

        // Update DOM element
        canvas[y][x].setAttribute("value", val);
      }
    }
    engine.data = data;
  },
  paint: function (x, y, elem, val) {
    engine.data[x][y] = val;
    if (elem) {
      elem.setAttribute("value", val || 0);
    }
  },
  handleClick: function (x, y, elem, val) {
    return () => {
      val = elem.getAttribute("value") == "1" ? 0 : 1;
      engine.paint(x, y, elem, val);
    };
  },
  handleOnEnter: function (x, y, elem, val) {
    return (evt) => {
      if (evt.buttons === 1) {
        engine.paint(x, y, elem, 1);
      }
    };
  },
};
