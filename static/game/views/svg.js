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

  render(target) {
    let toolbar = target.querySelector(".game-toolbar");

    // Create the board game contents
    target.innerHTML = `
    <style>
        .game-board {
            width: 100px;
            height: 100px;
            background-color: red;
            border-radius: 50%;
        }
    </style>
    <div class="flex flex-col min-h-full justify-start">
        <div class="flex flex-col flex-1 justify-center">
            <div class="game-board"></div>
        </div> 
    </div>
  `;

    // Add back the original toolbar (if found)
    if (toolbar) target.insertBefore(toolbar, target.firstChild);

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
  }

  setLoading(active, context) {}

  createView(game, data) {}

  updateView(game, data) {}
}
