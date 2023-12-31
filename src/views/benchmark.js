import { GameRendererCore } from "../core.js";
import { GameOfLife } from "../game.js";
import ViewIcon from '../icons/benchmark.svg'

export class BenchmarkRenderer extends GameRendererCore {
  static {
    // Register game engine view type
    let tag = "view-benchmark";
    let cls = BenchmarkRenderer;
    if (!customElements.get(tag)) customElements.define(tag, cls);

    GameOfLife.addViewType(
      "benchmark",
      "Run Benchmark",
      () => ViewIcon,
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
<style>
  .metric svg {
    width: 100%;
  }

  .metric path {
    stroke-width: 75;
    stroke: #ecf0f1;
    fill: none;
  }

  .metric text {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .metric path.data-arc {
    stroke: #3498db;
  }

  .metric text {
    fill: #3498db;
  }
</style>
<div class="flex flex-col flex-1 justify-center justify-items-center items-center">
  <div class="game-board flex flex-col w-full mx-auto space-y-2 text-center justify-center items-center">
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
    <div class="benchmark-subtitle text-2xl font-bold dark:text-white"></div>
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
      console.debug("Loading benchmark into:", this);
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
