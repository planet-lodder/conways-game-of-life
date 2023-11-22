class HtmlRenderer {
  target = null;
  root = null;

  constructor(target) {
    if (typeof target == "string") {
      target = document.querySelector(target);
    }
    this.create(target);
  }

  create(target) {
    let toolbar = target.querySelector(".game-toolbar");

    // Create the board game contents
    this.root = target;
    this.root.innerHTML = `
    <link href="/game/css/board.css" rel="stylesheet" />
    <div class="flex flex-col flex-1 justify-center">
      <div class="game-board"></div>
    </div>
`;

    // Add back the original toolbar (if found)
    if (toolbar) this.root.insertBefore(toolbar, this.root.firstChild);

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.fpsCounter = this.root.querySelector(".game-fps");
  }

  toolbar() {
    // TODO: Generate the toolbar programatically
    return this.root.querySelector(".game-toolbar");
  }

  setLoading(active) {
    if (!this.board) return;
    if (active) {
      // Set the loading screen feedback
      console.log("Loading board game into:", this.root);
      this.board.innerHTML = "<em>Loading...</em>";
    } else {
      // Crear previous contents
      this.board.innerHTML = "";
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

  updateFPS(fps) {
    // Update DOM element for FPS (if available)
    if (this.fpsCounter) {
      this.fpsCounter.innerHTML = `${fps}`;
    }
  }

  createView(config, data) {
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;

    console.log("Creating game board...", [width, height]);

    let board = this.board;
    if (!board) return;

    // Set the board dimentions
    board.style["min-width"] = `${width * scale}px`;
    board.style["min-height"] = `${height * scale}px`;

    let setText = (qry, val) => {
      let elem = document.querySelector(qry);
      if (elem) elem.innerHTML = val;
    };

    setText(".board-width", width);
    setText(".board-height", height);

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

  updateView(config, data) {
    let total = config.width * config.height;
    for (let i = 0; i < total; i++) {
      let elem = this.canvas[i];
      if (elem) {
        elem.setAttribute("value", data[i] || 0);
      }
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
