class HtmlRenderer {
  target = null;
  root = null;

  constructor(target) {
    this.target = target;
    this.root = document.querySelector(target);
  }
  setLoading(active, context) {
    let root = this.root;
    if (active) {
      // Set the loading screen feedback
      console.log("Loading board game into:", root);
      root.innerHTML = "<em>Loading...</em>";
    } else {
      // Crear previous contents
      root.innerHTML = "";
    }
  }
  loadImage(src, callback) {
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
    let img = document.createElement("IMG");
    img.src = src;
    img.style.display = "none";
    img.style.position = "absolute";
    img.style.bottom = "0";
    img.style.right = "0";
    img.addEventListener("load", (e) => onLoad(e, img));
    document.body.appendChild(img);
  }
  trackFPS(config) {
    let fpsSelector = ".game-fps";
    let fpsElem = document.querySelector(fpsSelector);
    let oldCount = config.generation || 0;
    let fps_intv = setInterval(() => {
      if (!config.intv) {
        // Simulation stopped
        clearInterval(fps_intv);
        return;
      }
      let newCount = config.generation;
      if (fpsElem) {
        // Update DOM element
        fpsElem.innerHTML = `${newCount - oldCount}`;
      }
      oldCount = newCount;
    }, 1000);
  }
  createView(config, data) {
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;

    console.log("Creating game board...", [width, height]);
    let root = this.root;
    if (root) {
      root.style["min-width"] = `${width * scale}px`;
      root.style["min-height"] = `${height * scale}px`;
    }

    let setText = (qry, val) => {
      let elem = document.querySelector(qry);
      if (elem) {
        elem.innerHTML = val;
      }
    };

    setText(".board-width", width);
    setText(".board-height", height);

    // Create the canvas to visualise the data
    let canvas = Array(height);
    this.canvas = canvas;
    for (let y = 0; y < height; y++) {
      // Create a new data colum
      canvas[y] = Array(width);

      // Create the element to put on the board
      let rowElem = document.createElement("DIV");
      rowElem.className = "row";
      root.appendChild(rowElem);

      // Create each row and populate each row
      for (let x = 0; x < width; x++) {
        // Compute the target cell's value
        let col = data && data.length >= x ? data[x] : [];
        let cell = col && col.length >= y ? col[y] : null;
        let val = cell ? 1 : 0;

        // Create the cell at this x/y position on the board
        let cellElem = document.createElement("DIV");
        cellElem.id = `${x}x${y}`;
        cellElem.setAttribute("value", val);
        cellElem.onclick = this.handleClick(x, y, cellElem);
        cellElem.onmouseenter = this.handleOnEnter(x, y, cellElem);
        rowElem.appendChild(cellElem);

        canvas[y][x] = cellElem;
      }
    }
  }
  updateView(config, data) {
    console.log("...");
  }
  paint(x, y, val) {
    let elem = this.canvas[y][x];
    if (elem) {
      elem.setAttribute("value", val || 0);
    }
  }
  handleClick(x, y, elem, val) {
    return () => {
      val = elem.getAttribute("value") == "1" ? 0 : 1;
      this.paint(x, y, elem, val);
    };
  }
  handleOnEnter(x, y, elem, val) {
    return (evt) => {
      if (evt.buttons === 1) {
        this.paint(x, y, 1);
      }
    };
  }
}
