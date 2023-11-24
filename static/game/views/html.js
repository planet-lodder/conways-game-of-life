class HtmlDivRenderer extends GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-html-divs", HtmlDivRenderer);
    GameOfLife.addViewType(
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
    <link href="/game/css/board.css" rel="stylesheet" />
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
    board.style["aspect-ratio"] = `${width} / ${height}`

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
