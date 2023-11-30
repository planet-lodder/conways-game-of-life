import { GameRendererCore } from "../core.js";
import { GameOfLife } from "../game.js";
import ViewIcon from '../icons/canvas.svg'

export class ImageCanvasRenderer extends GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-image-canvas", ImageCanvasRenderer);
    GameOfLife.addViewType(
      "canvas",
      "Image Canvas",
      () => ViewIcon,
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
    this.canvas.style["min-width"] = `${width * scale}px`;
    this.canvas.style["min-height"] = `${height * scale}px`;
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
