class GameOfLife extends HTMLElement {
  static engines = [];
  static views = {};
  static addViewType(name, label, icon, viewInit) {
    GameOfLife.views[name] = {
      label,
      icon,
      viewInit,
    };
  }

  constructor() {
    super();
    //this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.config();
    this.render(this);

    let gameUpdated = () => {
      this.dispatchEvent(new CustomEvent("game:updated", { detail: this }));
    };
    let events = {
      "game:resize": (e) => {
        let success =
          this.game && this.game.resize(e.detail.width, e.detail.height);
        if (!success) {
          let src = e.detail.event;
          src.cancel = true;
          src.cancelBubble = true;
          src.stopPropagation();
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

  config() {
    // Check for a specified view type
    this.viewType = this.getAttribute("view");
    this.engines = GameOfLife.engines || [];

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
    this.toolbar = new GameToolbar(this);
    this.view = this.getView(this.viewType);
    this.game = this.game || new GameEngine(this, this.view);

    target.innerHTML = ``;
    target.appendChild(this.toolbar);
    target.appendChild(this.view);

    // Bind existing game to the latest view (if changed)
    if (this.game.view != this.view) this.game.view = this.view;
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
    return viewType.viewInit();
  }
}
customElements.define("game-of-life", GameOfLife);
