class MyCircle extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
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
  }
}
//customElements.define("game-board", MyCircle);


class HtmlRenderer extends GameRendererCore {
  constructor(target) {
    super(target);
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

  createView(config, data) {}

  updateView(config, data) {}

  updateFPS(fps) {}
}
