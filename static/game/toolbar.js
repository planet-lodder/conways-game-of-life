class GameToolbar extends HTMLElement {
  static {
    // Register custom HTML element
    customElements.define("game-toolbar", GameToolbar);
  }

  constructor(game) {
    super();
    this.parent = game;
    this.config = game || {};
  }

  connectedCallback() {
    this.render(this);
    let events = {
      // Keep toolbar values in sync with config values
      "game:updated": (e) => this.update(e.detail),
      // Track and display the frames per second
      "game:fps": (e) => this.gameFpsCounter(e.detail),
    };
    if (this.parent) {
      Object.keys(events).forEach((eventName) => {
        this.parent.addEventListener(eventName, events[eventName]);
      });
    }
  }

  render(target) {
    let config = this.config;

    target.innerHTML = `
    <link href="/game/css/toolbar.css" rel="stylesheet" />
    <form class="game-toolbar flex flex-col flex-0" x-data="{ show_menu: '' }">
      <div class="flex flex-0 text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-b border-gray-400 dark:border-gray-500">

        <!-- Game Engine Icon -->
        <div class="game-engine flex flex-0 pl-1 relative"></div>
    
        <!-- Game Title -->
        <p
          class="game-title flex flex-0 flex-shrink-1 py-1.5 px-2 text-sm font-bold"
          style="overflow: hidden; white-space: nowrap"
        ></p>
    
        <!-- Dimentions -->
        <label class="game-dimentions flex flex-0 py-2 text-xs font-thin">
          ( <span class="board-width"></span> x <span class="board-height"></span> )
        </label>
    
        <div class="flex flex-1 flex-shrink-0"></div>
    
        <!-- Frames Per Second -->
        <label class="game-fps-container py-1.5 text-sm font-slim italic">
          <span class="game-fps font-bold pl-2">0</span> fps
        </label>
    
        <div class="inline-flex text-sm font-medium px-2 space-x-2" role="group">
          <!-- Revert to beginning -->
          <button
            type="button"
            title="Reset Game"
            class="game-reset flex flex-1 space-x-2 items-center justify-center text-gray-400 dark:text-gray-500 hidden"
          >
            <img class="include w-6 h-6" src="/icons/revert.svg" />
          </button>
          <!-- Game Config -->
          <button
            type="button"
            title="Game Settings"
            class="game-config flex flex-1 space-x-2 items-center justify-center text-gray-400 dark:text-gray-500"            
          >
            <img class="include w-6 h-6" src="/icons/gears.svg" />
          </button>
        </div>
    
        <div class="inline-flex text-sm font-medium shadow-sm w-24" role="group">
          <!-- Stop Button -->
          <button
            type="button"
            title="Stop Game"
            class="game-stop flex flex-1 space-x-2 items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden"
          >
            <img class="include w-6 h-6" src="/icons/stop.svg" />
            <span>Stop</span>
          </button>

          <!-- Start Button -->
          <button
            type="button"
            title="Start Game"
            class="game-start flex flex-1 space-x-2 items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"            
          >
            <img class="include w-6 h-6" src="/icons/play.svg" />
            <span>Start</span>
          </button>
        </div>
      </div>
    
      <div class="game-settings flex flex-0 z-20 h-8 -mb-8 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 border-b border-gray-400 dark:border-gray-500"></div>
    </form>
    
  `;

    // Hook up button events
    this.onClick(".game-reset", () => this.trigger("game:reset"));
    this.onClick(".game-start", () => this.trigger("game:start"));
    this.onClick(".game-stop", () => this.trigger("game:stop"));
    this.onClick(".game-config", () => {
      this.show_settigs = !this.show_settigs;
      this.gameSettings(config);
    });

    // Populate the toolbar with its UI elements
    this.gameEngine(config.engines);
    this.populateSettings(config);
    this.populateViewTypes(GameOfLife.views);
    this.gameFpsCounter(0);

    // Update UI elements
    this.update(config);

    // Capture Config changes
    this.onChanged(".game-width", (e) =>
      this.trigger("game:resize", {
        width: Number(e.target.value),
        height: config.height,
        event: e,
      })
    );
    this.onChanged(".game-height", (e) =>
      this.trigger("game:resize", {
        width: config.width,
        height: Number(e.target.value),
        event: e,
      })
    );
    this.onChanged(".game-delay", (e) =>
      this.trigger("game:speed", e.target.value)
    );

    // Try and load the SVG images inline, so it can take advantage of styling
    this.inlineIncludeImages(target);
  }

  update(config) {
    this.gameTitle(config.title);
    this.gameDimentions(config);
    this.gameResetBtn(!config.started && config.game && config.game.generation);
    this.gameConfigBtn(!config.started);
    this.gameStartBtn(!config.started);
    this.gameStopBtn(config.started);
    this.gameSettings(config);

    if (!config.started) {
      // Hide the FPS counter
      this.gameFpsCounter(0);
    }
  }

  onClick(selector, action) {
    let elem = this.querySelector(selector);
    if (elem) {
      elem.addEventListener("click", action);
    }
  }

  onChanged(selector, action) {
    let elem = this.querySelector(selector);
    if (elem) {
      elem.addEventListener("change", action);
    }
  }

  trigger(eventName, payload) {
    let event = new CustomEvent(eventName, { bubbles: true, detail: payload });
    this.dispatchEvent(event);
  }

  gameEngine(engines) {
    let container = this.querySelector(".game-engine");
    if (!container) return;

    // Set the templated content
    container.innerHTML = `
    <button
        type="button"
        class="game-engines-btn p-2 -m-2 cursor-default"
    >
        <img class="include w-6 h-6" src="/icons/cpu.svg" />
    </button>
    <div class="game-engines-menu hidden absolute origin-top-left left-0 z-30 mt-8 w-40 shadow-lg bg-white dark:bg-gray-700">
        <div
            class="text-gray-500 dark:text-gray-400 outline outline-gray-300 dark:outline-gray-500"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
        >
            <div class="px-2 py-2 text-sm font-bold border-b border-gray-200 dark:border-gray-500">
                Select Game Engine
            </div>
            <div class=game-engines-menu-items></div>
        </div>
    </div>
`;

    // Get refs to UI components
    this.gameEnginesButton = container.querySelector(".game-engines-btn");
    this.gameEnginesMenu = container.querySelector(".game-engines-menu");
    this.gameEnginesMenuItems = container.querySelector(
      ".game-engines-menu-items"
    );

    // Check if we have additional game engines that can be bound
    let queryParams = window.location.search;
    let selected = new URLSearchParams(queryParams).get("engine") || "latest";
    if (engines && engines.length && this.gameEnginesMenu) {
      // Clear previous contents
      this.gameEnginesMenuItems.innerHTML = "";

      // Hook up button click to toggle the menu
      this.gameEnginesButton.classList.add("cursor-pointer");
      this.gameEnginesButton.classList.remove("cursor-default");
      this.gameEnginesButton.onclick = () => {
        this.gameEnginesMenu.classList.toggle("hidden");
      };

      // Populate with menu items for selecting different engine types
      engines.forEach((id) => {
        let item = document.createElement("A");
        let css =
          "flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600";
        let style =
          id == selected
            ? css + "font-bold text-gray-900 dark:text-white"
            : css;

        item.setAttribute("role", "menuitem");
        item.className = style;
        item.onclick = () => {
          this.updateQueryParams({ engine: id }, true);
          this.gameEnginesMenu.classList.add("hidden");
        };
        item.innerHTML = `
            <img class="include w-6 h-6" src="/icons/cpu.svg" />
            <span class="py-0.5">${id}</span>
        `;

        this.gameEnginesMenuItems.appendChild(item);
      });
    }
  }

  gameTitle(title) {
    let container = this.querySelector(".game-title");
    if (container) {
      container.innerHTML = title || `Game of Life`;
    }
  }

  gameDimentions(config) {
    let container = this.querySelector(".game-dimentions");
    if (!container) return;

    let setText = (qry, val) => {
      let elem = container.querySelector(qry);
      if (elem) elem.innerHTML = val;
    };

    if (config.width && config.height) {
      setText(".board-width", config.width);
      setText(".board-height", config.height);
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameFpsCounter(fps) {
    let container = this.querySelector(".game-fps-container");
    let label = this.querySelector(".game-fps");
    if (!container) return;
    if (fps) {
      label.innerHTML = fps;
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameResetBtn(show) {
    let container = this.querySelector(".game-reset");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameConfigBtn(show) {
    let container = this.querySelector(".game-config");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameStartBtn(show) {
    let container = this.querySelector(".game-start");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameStopBtn(show) {
    let container = this.querySelector(".game-stop");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }

  gameSettings(config) {
    let show = !config.started && this.show_settigs;
    let container = this.querySelector(".game-settings");
    if (!container) return;
    if (show) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }

    let setValue = (qry, val) => {
      let elem = this.querySelector(qry);
      if (elem) elem.value = val;
    };

    // Update the input values
    setValue("input.game-width", config.width);
    setValue("input.game-height", config.height);
    setValue("input.game-delay", config.delay);
  }

  populateSettings(config) {
    let container = this.querySelector(".game-settings");
    if (!container) return;

    container.innerHTML = `
    <div class="flex w-full relative px-2 space-x-2 border-y-1">

      <!-- Set Width -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Width</span>
        <input
          type="text"
          class="game-width w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <!-- Set Height -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Height</span>
        <input
          type="text"
          class="game-height w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <!-- Set Delay -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Delay</span>
        <input
          type="text"
          class="game-delay w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <div class="flex flex-1"></div>

      <div class="game-views flex flex-0 relative space-x-2">
        <div class="flex flex-0">
          <button
            type="button"
            title="View Options"
            class="game-views-btn px-2 -mx-2"
          >
            <img class="include w-6 h-6" src="/icons/ellipsis-vertical.svg" />
          </button>
          <div
            id="dropdown-menu"
            class="game-views-menu hidden origin-top-right absolute right-0 mt-8 w-40 shadow-lg bg-white dark:bg-gray-700 ring-1 ring-gray-500 ring-opacity-5"
          >
            <div
              class="text-gray-500 dark:text-gray-400 outline outline-gray-300 dark:outline-gray-500"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <div class="px-2 py-2 text-sm font-bold border-b border-gray-200 dark:border-gray-500">
                Select View Type
              </div>
              <div class="game-views-menu-body"></div>
              <hr class="border border-gray-200 dark:border-gray-500" />
              <div class="game-views-menu-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
    this.inlineIncludeImages(container);
  }

  populateViewTypes(views) {
    let container = this.querySelector(".game-views");
    if (!container) return;

    let current = new URLSearchParams(window.location.search).get("view");
    let styles =
      "flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600";
    let styleSelected = "font-bold text-gray-900 dark:text-white";

    let viewMenuBtn = container.querySelector(".game-views-btn");
    let viewMenuWindow = container.querySelector(".game-views-menu");
    let viewMenuContent = container.querySelector(".game-views-menu-body");
    let viewMenuBottom = container.querySelector(".game-views-menu-bottom");

    if (viewMenuBtn && viewMenuWindow)
      viewMenuBtn.addEventListener("click", () => {
        this.show_views = !this.show_views;
        if (this.show_views) {
          viewMenuWindow.classList.remove("hidden");
        } else {
          viewMenuWindow.classList.add("hidden");
        }
      });

    let menuItemClick = (key, info) => {
      this.updateQueryParams({ view: key }, false);
      this.show_views = false;

      // Create and attach the new view
      this.parent.setView(key);

      // Update the menu to show new selected item
      current = key;
      menuItemsRecreate();

      // Update the menu to show newly seleted menu its
      if (viewMenuWindow) viewMenuWindow.classList.add("hidden");
    };

    let menuItemCreate = (key) => {
      let info = views[key];
      let css = current == key ? styles + styleSelected : styles;
      let target = key == "benchmark" ? viewMenuBottom : viewMenuContent;
      let item = document.createElement("A");

      item.setAttribute("role", "menuitem");
      item.className = css;
      item.addEventListener("click", () => menuItemClick(key, info));
      item.innerHTML = `
        <img class="include w-6 h-6" src="${info.icon}" />
        <span class="py-0.5">${info.label}</span>
        `;

      target.appendChild(item);
    };

    // Attach the menu items for all the registered view types
    let menuItemsRecreate = () => {
      viewMenuContent.innerHTML = "";
      viewMenuBottom.innerHTML = "";
      Object.keys(views).forEach(menuItemCreate);
      this.inlineIncludeImages(container);
    };
    menuItemsRecreate();

    // Inline SVG images
    //this.inlineIncludeImages(container);
  }

  inlineIncludeImages(target) {
    let includes = target.querySelectorAll("img.include");
    let loadSVG = async (target, src) => {
      let replace = document.createElement("span");
      let response = await fetch(src);
      replace.innerHTML = await response.text();
      for (var i = 0; i < target.attributes.length; i++) {
        var attr = target.attributes[i];
        replace.setAttribute(attr.name, attr.value);
      }
      if (target.parentNode) {
        target.parentNode.replaceChild(replace, target);
      }
    };
    if (includes) {
      includes.forEach((elem) => {
        let src = elem.getAttribute("src");
        if (src) loadSVG(elem, src);
      });
    }
  }

  updateQueryParams(changes, reload = false) {
    if (!changes) return;
    let params = new URLSearchParams(window.location.search);
    Object.keys(changes).forEach((key) => params.set(key, changes[key]));
    history.pushState(null, null, "?" + params.toString());
    if (reload) window.location.reload();
  }
}
