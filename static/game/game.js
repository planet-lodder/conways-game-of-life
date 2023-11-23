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
    
    // Auto start the game (if requested)
    if (this.start) this.game.start();
  }

  config() {
    // Check for a specified view type
    this.viewType = this.getAttribute("view");
    this.engines = GameOfLife.engines || []

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
    this.view = this.getView(this.viewType);
    this.game = this.game || new GameEngine(this, this.view);
    this.toolbar = new GameToolbar(this.game);

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
