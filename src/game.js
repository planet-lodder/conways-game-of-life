import { GameEngine } from "./engine.js";
import { GameToolbar } from "./toolbar.js";

export class GameOfLife extends HTMLElement {
  static views = {};
  static addViewType(name, label, icon, viewInit) {
    GameOfLife.views[name] = {
      label,
      icon,
      viewInit,
    };
  }
  static get observedAttributes() {
    return [
      "view",
      "start",
      "title",
      "image",
      "width",
      "height",
      "delay",
      "scale",
      "wrapped",
      "engines",
    ];
  }

  constructor() {    
    super();
  }

  connectedCallback() {
    this.config();
    this.render(this);

    let gameUpdated = () => {
      this.dispatchEvent(new CustomEvent("game:updated", { detail: this }));
    };
    let events = {
      "game:updated": (e) => {},
      "game:resize": (e) => {
        let success =
          this.game && this.game.resize(e.detail.width, e.detail.height);
        if (!success) {
          let src = e.detail.event;
          if (src) {
            src.cancel = true;
            src.cancelBubble = true;
            src.stopPropagation();
          }

          let abort = e.detail.abort;
          if (abort) abort();
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
        this.setAttribute("delay", delay);
        gameUpdated();
      },
      "game:scale": (e) => {
        this.scale = Number(e.detail) || 1;
        if (this.scale) {
          this.setAttribute("delay", this.scale);
          this.game.scale = this.scale;
          this.game.dataLoaded(this.game.data);
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

  trigger(eventName, payload) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    let pass = ["start"].indexOf(name) >= 0;
    if (!pass && oldValue === "") return; // Skip initial value
    if (!pass && oldValue === null) return; // Skip initial value
    if (oldValue === newValue) return; // Skip initial value
    switch (name) {
      case "start":
        // Toggle start / stop
        let start = newValue == "true";
        if (start && !this.started) {
          this.trigger("game:start");
        } else if (!start && this.started) {
          this.trigger("game:stop");
        }
        break;
      case "view":
        // Change the view type
        this.setView(newValue);
        this.toolbar.render(this.toolbar);
        break;
      case "title":
        this.toolbar.gameTitle(newValue);
        break;
      case "width":
        //if (this.width !== newValue) {
        //  this.trigger("game:resize", {
        //    width: Number(newValue),
        //    height: Number(this.height),
        //    abort: () => {
        //      this.width = oldValue;
        //      this.setAttribute("width", oldValue);
        //    },
        //  });
        //}
        break;
      case "height":
        //if (this.height !== newValue) {
        //  this.trigger("game:resize", {
        //    width: Number(this.width),
        //    height: Number(newValue),
        //    abort: () => {
        //      this.height = oldValue;
        //      this.setAttribute("height", oldValue);
        //    },
        //  });
        //}
        break;
      case "delay":
        if (this.delay !== newValue) {
          this.trigger("game:speed", newValue);
          break;
        }
      case "scale":
        if (this.scale !== newValue) {
          this.trigger("game:scale", newValue);
          break;
        }
    }
    //this[name] = newValue;
  }

  config() {
    // Check for a specified view type
    this.viewType = this.getAttribute("view");
    this.engineTypes = this.getAttribute("engines");
    if (this.engineTypes) {
      this.engines = JSON.parse(this.engineTypes);
    }
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
    if (this.game.view != this.view) {
      this.game.view = this.view;
    }
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
    let view = viewType.viewInit();
    view.classList.add("h-full");
    return view;
  }

  setView(viewType) {
    let oldView = this.game.view;
    let newView = this.getView(viewType);
    this.viewType = viewType;
    if (newView && oldView) {
      oldView.parentElement.replaceChild(newView, oldView);
      this.game.view = newView;
      this.game.dataLoaded(this.game.data);
    }
  }
}
