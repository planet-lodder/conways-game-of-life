import { GameRendererCore } from "../core.js";

export class ResolveRenderer extends GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-resolver", ResolveRenderer);
  }

  constructor() {
    super();
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
<div class="flex flex-col flex-1 justify-center justify-items-center items-center">
  <div class="game-board flex flex-col w-full mx-auto space-y-2 text-center justify-center items-center">
    <div class="loading-title my-20 text-2xl font-bold dark:text-white">Loading...</div>
  </div>
</div>
`;

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.label = target.querySelector(".loading-title");
  }

  setLoading(active) {
    if (!this.label) return;
    if (active) {
      // Set the loading screen feedback
      console.log("Loading benchmark into:", this);
      this.label.innerHTML = "<em>Loading...</em>";
    } else {
      // Crear previous contents
      this.label.innerHTML = "Calculating...";
    }
  }

  createView(game) {
    let name = game.config.viewType
    let config = game.config;    

    if (!name) {
      // Try and resolve default view type from URL param
      name = new URLSearchParams(location.search).get("view");      
    }

    if (!name && config.width && config.height) {
      let length = config.width * config.height;
      if (length > 65536) {
        // Use an image canvas for very large simulations (eg: 256x256)
        name = "canvas";
      } else if (length > 16384) {
        // Fall back to WebGL for medium sized images (eg: 128x128)
        name = "webgl";
      } else if (length > 1024) {
        // Use SVG for best vector graphics on small images (eg: 32x32)
        name = "svg";
      } else {
        // For very tiny images, use a simple DIV view
        name = "html";
      }
    }
    if (!name) name = 'html';
    
    // Switch to a new view type
    let parent = this.parentElement
    if (name && parent.setView) {
      game.config.viewType = name
      parent.setView(name)
    }
  }

  updateView() {}

  updateFPS() {}
}
