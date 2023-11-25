class WebGLRenderer extends GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-webgl", WebGLRenderer);
    GameOfLife.addViewType(
      "webgl",
      "WebGL (GPU)",
      "icons/gpu.svg",
      () => new WebGLRenderer()
    );
  }

  constructor() {
    super();

    // Track if and when dark mode changes occur
    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type !== "attributes" ||
          mutation.attributeName !== "class"
        ) {
          return;
        }
        this.updateTheme();
      }
    });
    this.observer.observe(document.body, { attributes: true });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  updateTheme() {
    if (!this.board) return;
    if (document.body.classList.contains("dark")) {
      this.color = 1.0;
      this.board.classList.add("dark");
    } else {
      this.color = 0.0;
      this.board.classList.remove("dark");
    }
    if (this.game && this.data) {
      this.createView(this.game, this.data);
    }
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
<style>
  .game-board {
    width: 100%;
    height: 100%;
  }
</style>
<div class="flex flex-col justify-start">
    <div class="flex flex-col flex-1 justify-center relative">                
        <svg class="game-board" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
            </pattern>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="url(#smallGrid)"/>
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />          
        </svg>
        <div class="absolute left-0 top-0 right-0 bottom-0">
          <canvas class="game-canvas" style="width:100%; height:100%" width="460" height="314"></canvas>
          <div class="not-supported hidden flex flex-1 h-full text-center text-3xl items-center justify-center">
            WebGL not supported by your browser.
          <div>
        </div>
    </div> 
</div>
    `;

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.canvas = target.querySelector(".game-canvas");
    this.unsupported = target.querySelector(".not-supported");
    this.updateTheme();
  }

  setLoading(active, context) {}

  createView(game, data) {
    let config = game.config;
    let width = config.width;
    let height = config.height;
    let scale = config.scale || 1;
    let board = this.board;
    if (!board) return;

    // Remember game settings
    this.game = game;
    this.data = data;
    this.width = width;
    this.height = height;

    // Set the board dimentions
    board.setAttribute("viewBox", `0 0 ${width} ${height}`);
    board.style["min-width"] = `${width * scale}px`;
    board.style["min-height"] = `${height * scale}px`;

    // Populate the game board cells
    if (!this.canvas) return;
    this.canvas.setAttribute("width", width * scale);
    this.canvas.setAttribute("height", height * scale);

    // Initialize the GL context
    // Only continue if WebGL is available and working
    this.gl = this.initWebGL(this.canvas);
    if (this.gl === null) {
      if (this.canvas) this.canvas.classList.add("hidden");
      if (this.unsupported) this.unsupported.classList.remove("hidden");
      return;
    }

    // Clear the canvas and recreate scene
    this.clearCanvas(this.gl);
    this.createScene(this.gl, width, height, data);

    // Draw the scene once
    this.drawScene(this.gl);
  }

  updateView(game, data) {
    if (!this.canvas) return;
    let width = game.config.width;
    let height = game.config.height;

    // Clear the canvas and recreate scene
    this.clearCanvas(this.gl);
    this.createScene(this.gl, width, height, data);

    // Draw the scene once
    this.drawScene(this.gl);
  }

  initWebGL(canvas) {
    let gl = canvas.getContext("webgl");
    if (gl === null) {
      console.warn(
        "Unable to initialize WebGL. Your browser may not support it."
      );
      return null;
    }

    // Init shaders
    let vs = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying highp vec4 v_Color;
    void main() {
        gl_Position = a_Position;
        v_Color = a_Color;
    }`;
    let fs = `
    varying highp vec4 v_Color;
    void main() {
      gl_FragColor = v_Color;
    }`;
    if (!this.initShaders(gl, vs, fs)) {
      console.log("Failed to intialize shaders.");
      return null;
    }
    return gl;
  }

  initShaders(gl, vs_source, fs_source) {
    // Create program
    var glProgram = gl.createProgram();

    // Compile shaders
    var vertexShader = this.makeShader(gl, vs_source, gl.VERTEX_SHADER);
    var fragmentShader = this.makeShader(gl, fs_source, gl.FRAGMENT_SHADER);

    // Attach and link shaders to the program
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program");
      return false;
    }

    // Use program
    gl.useProgram(glProgram);
    gl.program = glProgram;

    return true;
  }

  makeShader(gl, src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
      return;
    }
    return shader;
  }

  clearCanvas(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  createScene(gl, width, height, data) {
    let dim = 3;
    let points = [];
    let indices = [];

    // Create the buffer of artifacts to render in the scene
    for (let y = 0; y < height; y++) {
      let dy = -2 * (y / this.height) + 1;
      for (let x = 0; x < width; x++) {
        let dx = 2 * (x / this.width) - 1;
        // Add point to pint array
        points.push(dx, dy, 0);

        // Check if the cell is to be drawn
        if (data[x + y * width]) {
          let from = x + y * width;
          let ends = x + 1 + (y + 1) * width;
          indices.push(from, from + 1, ends, from, ends - 1, ends);
        }
      }
    }

    // Create and attach all point vertices for the scene
    this.applyBuffer(gl, "a_Position", points);

    // Define all the colors for each point
    // TODO: Use static - vec4(1.0, 1.0, 1.0, 1.0);
    this.applyBuffer(gl, "a_Color", Array(width * height * 3).fill(this.color));

    // Set Indices to draw the triangles over selected cells
    let indexBuffer = new Uint16Array(indices);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexBuffer, gl.STATIC_DRAW);
    this.n = indexBuffer.length;
  }

  applyBuffer(gl, attribName, values) {
    // Create a buffer for the square's positions.
    let dim = 3;
    let buffer = gl.createBuffer();
    let vertexAttr = gl.getAttribLocation(gl.program, attribName);

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(vertexAttr);
    gl.vertexAttribPointer(vertexAttr, dim, gl.FLOAT, false, 0, 0);

    return buffer;
  }

  drawScene(gl) {
    let n = this.n;
    let type = gl.UNSIGNED_SHORT;
    //const ext = gl.getExtension("OES_element_index_uint");
    //if (ext) type = gl.UNSIGNED_INT;
    gl.drawElements(gl.TRIANGLES, n, type, 0);
  }
}
