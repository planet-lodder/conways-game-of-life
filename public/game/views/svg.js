class SvgImageRenderer extends GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-svg-image", SvgImageRenderer);
    GameOfLife.addViewType(
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
