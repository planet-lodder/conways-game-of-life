class GameToolbar extends HTMLElement {
  static {
    // Register custom HTML element
    customElements.define("game-toolbar", GameToolbar);
  }

  constructor(game) {
    super();
    this.game = game;
  }

  connectedCallback() {
    this.render(this);
  }

  render(target) {
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
        >Game of Life</p>
    
        <!-- Dimentions -->
        <label class="game-dimentions flex flex-0 py-1.5 text-sm font-thin">
          ( <span class="board-width"></span> x <span class="board-height"></span> )
        </label>
    
        <div class="flex flex-1 flex-shrink-0"></div>
    
        <!-- Frames Per Second -->
        <label class="game-fps-container py-1.5 text-sm font-slim italic">
          <span class="game-fps font-bold">0</span> fps
        </label>
    
        <div class="inline-flex text-sm font-medium px-2 space-x-2" role="group">
          <!-- Revert to beginning -->
          <button
            type="button"
            title="Reset Game"
            class="game-revert flex flex-1 space-x-2 items-center justify-center text-gray-400 dark:text-gray-500 hidden"
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

    // Populate the toolbar with its UI elements
    this.gameEngine(target.querySelector(".game-engine"));
    this.gameTitle(target.querySelector(".game-title"));
    this.gameDimentions(target.querySelector(".game-dimentions"));
    this.gameFpsCounter(target.querySelector(".game-fps-container"));
    this.gameReset(target.querySelector(".game-revert"));
    this.gameConfigBtn(target.querySelector(".game-config"));
    this.gameStartBtn(target.querySelector(".game-start"));
    this.gameStopBtn(target.querySelector(".game-stop"));
    this.gameSettings(target.querySelector(".game-settings"));

    // Try and load the SVG images inline, so it can take advantage of styling
    this.inlineIncludeImages(target);
  }

  gameEngine(container) {
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
    let engines = this.game ? this.game.config.engines : null;
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
          this.update_query_params({ engine: id });
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

  gameTitle(container) {
    if (!container) return;
    //container.innerHTML = `TODO: Title`;
  }

  gameDimentions(container) {
    if (!container) return;
    container.classList.add("hidden");
  }

  gameFpsCounter(container) {
    if (!container) return;
    container.classList.add("hidden");
  }

  gameReset(container) {
    if (!container) return;
    container.classList.add("hidden");
  }

  gameConfigBtn(container) {
    if (!container) return;
    container.classList.add("hidden");
  }

  gameStartBtn(container) {
    if (!container) return;
    //container.classList.add('hidden')
  }

  gameStopBtn(container) {
    if (!container) return;
    container.classList.add("hidden");
  }

  gameSettings(container) {
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
          class="game-delay w-10 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <div class="flex flex-1"></div>

      <div class="flex flex-0 relative space-x-2 pr-2">
        <div class="flex flex-0">
          <button
            type="button"
            title="View Options"
            class="p-2 -m-2"
            @click="show_menu = show_menu == 'views' ? '' : 'views'"
          >
            <img class="include w-6 h-6" src="/icons/ellipsis-vertical.svg" />
          </button>
          <div
            id="dropdown-menu"
            style="display: none"
            x-show="show_menu == 'views'"
            class="origin-top-right absolute right-0 mt-8 w-40 shadow-lg bg-white dark:bg-gray-700 ring-1 ring-gray-500 ring-opacity-5"
          >
            <div
              class="text-gray-500 dark:text-gray-400 outline outline-gray-300 dark:outline-gray-500"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <div
                class="px-2 py-2 text-sm font-bold border-b border-gray-200 dark:border-gray-500"
              >
                Select View Type
              </div>
              <a
                @click="show_menu = ''; update_query_params({view: 'html'})"
                class="flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600"
                :class="{ 'font-bold text-gray-900 dark:text-white': 'html' == (new URLSearchParams(window.location.search)).get('view') }"
                role="menuitem"
              >
                <img class="include w-6 h-6" src="/icons/html.svg" />
                <span class="py-0.5">HTML Divs</span>
              </a>
              <a
                @click="show_menu = ''; update_query_params({view: 'svg'})"
                class="flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600"
                :class="{ 'font-bold text-gray-900 dark:text-white': 'svg' == (new URLSearchParams(window.location.search)).get('view') }"
                role="menuitem"
                aria-disabled="true"
              >
                <img class="include w-6 h-6" src="/icons/svg.svg" />
                <span class="py-0.5">SVG Image</span>
              </a>
              <a
                @click="show_menu = ''; update_query_params({view: 'canvas'})"
                class="flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600"
                :class="{ 'font-bold text-gray-900 dark:text-white': 'canvas' == (new URLSearchParams(window.location.search)).get('view') }"
                role="menuitem"
              >
                <img class="include w-6 h-6" src="/icons/canvas.svg" />
                <span class="py-0.5">Image Canvas</span>
              </a>
              <a
                @click="show_menu = ''; update_query_params({view: 'webgl'})"
                class="flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600"
                :class="{ 'font-bold text-gray-900 dark:text-white': 'webgl' == (new URLSearchParams(window.location.search)).get('view') }"
                role="menuitem"
              >
                <img class="include w-6 h-6" src="/icons/gpu.svg" />
                <span class="py-0.5">WebGL (GPU)</span>
              </a>
              <hr class="border border-gray-200 dark:border-gray-500" />
              <a
                @click="show_menu = ''; update_query_params({view: 'benchmark'})"
                class="flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600"
                :class="{ 'font-bold text-gray-900 dark:text-white': 'benchmark' == (new URLSearchParams(window.location.search)).get('view') }"
                role="menuitem"
              >
                <img class="include w-6 h-6" src="/icons/benchmark.svg" />
                <span class="py-0.5">Run Benchmark</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
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
      target.parentNode.replaceChild(replace, target);
    };
    if (includes) {
      includes.forEach((elem) => {
        let src = elem.getAttribute("src");
        if (src) loadSVG(elem, src);
      });
    }
  }

  update_query_params(changes) {
    if (!changes) return;
    let params = new URLSearchParams(window.location.search);
    Object.keys(changes).forEach((key) => params.set(key, changes[key]));
    history.pushState(null, null, "?" + params.toString());
    window.location.reload();
  }
}
