class BenchmarkRenderer extends GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-benchmark", BenchmarkRenderer);
    GameOfLife.addViewType(
      "benchmark",
      "Run Benchmark",
      "icons/benchmark.svg",
      () => new BenchmarkRenderer()
    );
  }

  constructor() {
    super();
    this.addEventListener("game:fps", (e) => {
      this.updateFPS(e.detail);
    });
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
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

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.fpsCounter = target.querySelector(".game-fps");
    this.fpsMetric = target.querySelector(".benchmark-fps");
    this.fpsTitle = target.querySelector(".benchmark-title");
    this.subtitleSelector = target.querySelector(".benchmark-subtitle");
    this.svgPath = target.querySelector(".metric svg .data-arc");
  }

  setLoading(active, context) {
    if (!this.subtitleSelector) return;
    if (active) {
      // Set the loading screen feedback
      console.log("Loading benchmark into:", this);
      this.subtitleSelector.innerHTML = "<em>Loading...</em>";
    } else {
      // Crear previous contents
      this.subtitleSelector.innerHTML = "";
    }
  }

  createView(game, data) {
    let config = game.config;
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;
    
    if (this.board) {
      this.board.style["min-width"] = `${width * scale}px`;
      this.board.style["min-height"] = `${height * scale}px`;
    }

    let setText = (qry, val) => {
      let elem = this.querySelector(qry);
      if (elem) elem.innerHTML = val;
    };

    setText(".board-width", width);
    setText(".board-height", height);

    if (this.subtitleSelector) {
      this.subtitleSelector.innerHTML = `${config.title} ( ${width} x ${height} )`;
    }
  }

  updateView(game, data) {
    if (this.fpsTitle) {
      this.fpsTitle.innerHTML = `Generation: ${game.generation}`;
    }
  }

  updateFPS(fps) {
    // Theoretical max frequency with setTimeout is 250 hertz
    let percentage = Math.min(1, fps / 250);

    // Update DOM elements for benchmark stats
    if (this.fpsCounter) {
      this.fpsCounter.innerHTML = `${fps}`;
    }
    if (this.fpsMetric) {
      this.fpsMetric.innerHTML = `${fps} fps`;
    }

    // Update SVG element(s)
    if (this.svgPath) {
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
      this.svgPath.setAttribute("d", path);
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
  }
}
