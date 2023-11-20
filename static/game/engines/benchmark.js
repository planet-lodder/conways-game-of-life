class BenchmarkRenderer {
  constructor(target, fpsSelector, titleSelector, subtitleSelector) {
    console.log("BenchmarkRenderer", [
      target,
      fpsSelector,
      titleSelector,
      subtitleSelector,
    ]);
    this.root = document.querySelector(target);
    this.fpsSelector = document.querySelector(fpsSelector);
    this.fpsTitle = document.querySelector(titleSelector);
    this.subtitleSelector = document.querySelector(subtitleSelector);
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

      let data = Array(canvas.width);
      let buffer = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          let i = (x + y * canvas.width) * 4;
          let r = buffer[i];
          let g = buffer[i + 1];
          let b = buffer[i + 2];
          let a = buffer[i + 3];
          let val = a < 64 || (r + g + b) / 3 > 192 ? 0 : 1;
          data[x] = data[x] || Array(canvas.height);
          data[x][y] = val;
        }
      }
      if (callback) callback(data);
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
    let root = this.root;
    if (root) {
      root.style["min-width"] = `${width * scale}px`;
      root.style["min-height"] = `${height * scale}px`;
    }

    let setText = (qry, val) => {
      let elem = document.querySelector(qry);
      if (elem) {
        elem.innerHTML = val;
      }
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
