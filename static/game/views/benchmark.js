class HtmlRenderer {
  constructor(target) {
    if (typeof target == "string") {
      target = document.querySelector(target);
    }
    this.create(target);
  }

  create(target) {
    let toolbar = target.querySelector(".game-toolbar");

    // Create the board game contents
    this.root = target;
    this.root.innerHTML = `
<link href="/game/css/benchmark.css" rel="stylesheet" />
<div class="flex flex-col flex-1 justify-center">
  <div class="flex flex-col w-full mx-auto space-y-2 text-center">
    <div class="metric w-full">
      <svg viewBox="0 0 1000 500">
        <path d="M 950 500 A 450 450 0 0 0 50 500"></path>
        <path class="data-arc" d=""></path>
        <text
          class="benchmark-fps"
          text-anchor="middle"
          alignment-baseline="middle"
          x="500"
          y="300"
          font-size="140"
          font-weight="bold"
        ></text>
        <text
          class="benchmark-title"
          text-anchor="middle"
          alignment-baseline="middle"
          x="500"
          y="450"
          font-size="90"
          font-weight="normal"
        >
          Press Start
        </text>
      </svg>
    </div>
    <!--
    <div
      class="benchmark-timeline max-w-96 w-full h-20 space-x-1 flex flex-0 justify-end items-end border border-gray-200 dark:border-gray-700"
    >
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-16 w-2 bg-blue-500"></div>
      <div class="h-12 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-24 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
      <div class="h-20 w-2 bg-blue-500"></div>
    </div>
    -->
    <h4 class="benchmark-subtitle text-2xl font-bold dark:text-white"></h4>
  </div>
</div>
`;

    // Add back the original toolbar (if found)
    if (toolbar) this.root.insertBefore(toolbar, this.root.firstChild);

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.fpsSelector = document.querySelector(".benchmark-fps");
    this.fpsTitle = document.querySelector(".benchmark-title");
    this.subtitleSelector = document.querySelector(".benchmark-subtitle");
  }

  toolbar() {
    // TODO: Generate the toolbar programatically
    return this.root.querySelector(".game-toolbar");
  }

  setLoading(active, context) {
    if (!this.subtitleSelector) return;
    if (active) {
      // Set the loading screen feedback
      console.log("Loading benchmark into:", this.root);
      this.subtitleSelector.innerHTML = "<em>Loading...</em>";
    } else {
      // Crear previous contents
      this.subtitleSelector.innerHTML = "";
    }
  }

  loadImage(src, callback) {
    let onLoad = (evt, target) => {
      const img = target;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let buffer = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      if (callback) callback(buffer, img.width, img.height);
    };
    let img = document.createElement("IMG");
    img.src = src;
    img.style.display = "none";
    img.style.position = "absolute";
    img.style.bottom = "0";
    img.style.right = "0";
    img.addEventListener("load", (e) => onLoad(e, img));
    document.body.appendChild(img);
  }

  trackFPS(config) {
    // Define some vars before we start
    let svgPath = document.querySelector(".metric svg .data-arc");
    let gameFPS = document.querySelector(".game-fps");
    let timeline = document.querySelector(".benchmark-timeline");
    let oldCount = config.generation || 0;

    // Check every second how many frames were rendered
    let fps_intv = setInterval(() => {
      if (!config.intv) {
        clearInterval(fps_intv);
        return; // Simulation stopped
      }

      let newCount = config.generation;
      let framesPerSecond = newCount - oldCount;
      let percentage = Math.min(1, framesPerSecond / 250); // Theoretical max frequency with setTimeout

      // Update FPS counters
      if (this.fpsSelector) {
        this.fpsSelector.innerHTML = `${framesPerSecond} fps`;
      }
      if (gameFPS) {
        gameFPS.innerHTML = `${framesPerSecond}`;
      }

      // Update SVG element(s)
      if (svgPath) {
        let polar_to_cartesian = (cx, cy, radius, angle) => {
          let radians = ((angle - 90) * Math.PI) / 180.0;
          return [
            Math.round((cx + radius * Math.cos(radians)) * 100) / 100,
            Math.round((cy + radius * Math.sin(radians)) * 100) / 100,
          ];
        };
        let svg_circle_arc_path = (x, y, radius, start_angle, end_angle) => {
          let start_xy = polar_to_cartesian(x, y, radius, end_angle);
          let end_xy = polar_to_cartesian(x, y, radius, start_angle);
          return (
            "M " +
            start_xy[0] +
            " " +
            start_xy[1] +
            " A " +
            radius +
            " " +
            radius +
            " 0 0 0 " +
            end_xy[0] +
            " " +
            end_xy[1]
          );
        };
        let path = svg_circle_arc_path(
          500,
          500,
          450,
          -90,
          percentage * 180.0 - 90
        );
        svgPath.setAttribute("d", path);
      }

      //console.log(timeline);
      //if (timeline) {
      //  let bar = document.createElement("DIV");
      //  bar.setAttribute("style", `height: ${Math.floor(100 * percentage)}%`);
      //  bar.classList.add("w-2");
      //  bar.classList.add("bg-green-500");
      //  if (timeline.children.length > 256) {
      //    // Truncate trailing part of the timeline...
      //    timeline.removeChild(timeline.children[0]);
      //  }
      //  // Add latest slice
      //  timeline.appendChild(bar);
      //}
      oldCount = newCount;
    }, 1000);
  }

  createView(config, data) {
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;

    console.log("Creating game board...", [width, height]);
    let board = this.board;
    if (board) {
      board.style["min-width"] = `${width * scale}px`;
      board.style["min-height"] = `${height * scale}px`;
    }

    let setText = (qry, val) => {
      let elem = document.querySelector(qry);
      if (elem) elem.innerHTML = val;
    };

    setText(".board-width", width);
    setText(".board-height", height);

    this.subtitleSelector.innerHTML = `${config.title} ( ${width} x ${height} )`;
  }

  updateView(config, data) {
    if (this.fpsTitle) {
      this.fpsTitle.innerHTML = `Generation: ${config.generation}`;
    }
  }
}
