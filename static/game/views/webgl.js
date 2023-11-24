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
      this.fill = "#FFF";
      this.board.classList.add("dark");
    } else {
      this.fill = "#000";
      this.board.classList.remove("dark");
    }
  }

  render(target) {
    // Create the board game contents
    target.innerHTML = `
<style>
  .game-board {}  
  .game-cells {
    fill: #000;
  }
  .dark .game-cells {
    fill: #FFF;
  }
</style>
<script id="shaderVs" type="x-shader/x-vertex">
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying highp vec4 v_Color;
    void main() {
        gl_Position = a_Position;
        v_Color = a_Color;
    }
</script>

<script id="shaderFs" type="x-shader/x-fragment">
    varying highp vec4 v_Color;
    void main() {
        gl_FragColor = v_Color;
    }
</script>
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
        </div>
    </div> 
</div>
    `;

    // Get a refference to the board game elements
    this.board = target.querySelector(".game-board");
    this.canvas = target.querySelector(".game-canvas");
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
    let gl = this.canvas.getContext("webgl");
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
      return;
    }

    // Clear the color buffer with specified clear color
    gl.clearColor(0.0, 0.0, 0.0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (let y = 0; y < height; y++) {
      let offset = y * width;
      for (let x = 0; x < width; x++) {
        if (data[x + offset]) {          
          //context.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }

    // Init shaders
    var vs = this.root.querySelector('#shaderVs').innerHTML;
    var fs = this.root.querySelector('#shaderFs').innerHTML;
    if (!initShaders(gl, vs, fs)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    function initBuffers(gl) {
      // Vertices
      var dim = 3;
      var vertices = new Float32Array([
          -0.6, -0.6, 0.0, // 0
          -0.6, 0.6, 0.0, // 1
          0.6, 0.6, 0.0, // 2
          0.6, -0.6, 0.0, // 3
      ]);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      var vertexPositionAttribute = gl.getAttribLocation(gl.program, "a_Position");
      gl.enableVertexAttribArray(vertexPositionAttribute);
      gl.vertexAttribPointer(vertexPositionAttribute, dim, gl.FLOAT, false, 0, 0);

      // Colors
      var colors = new Float32Array([
          1.0, 1.0, 1.0,
          1.0, 1.0, 1.0,
          1.0, 1.0, 1.0,
          1.0, 1.0, 1.0,
      ]);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
      var vertexColorAttribute = gl.getAttribLocation(gl.program, "a_Color");
      gl.enableVertexAttribArray(vertexColorAttribute);
      gl.vertexAttribPointer(vertexColorAttribute, dim, gl.FLOAT, false, 0, 0);

      // Indices
      var indices = new Uint16Array([
          0, 1, 2,
          0, 2, 3,
      ]);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

      // Return number of vertices
      return indices.length;
    }

    function initShaders(gl, vs_source, fs_source) {
      // Compile shaders
      var vertexShader = makeShader(gl, vs_source, gl.VERTEX_SHADER);
      var fragmentShader = makeShader(gl, fs_source, gl.FRAGMENT_SHADER);

      // Create program
      var glProgram = gl.createProgram();

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

  function makeShader(gl, src, type) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
          return;
      }
      return shader;
  }

    // Init buffers
    var n = initBuffers(gl);
    if (n < 0) {
        console.log('Failed to init buffers');
        return;
    }

    // Draw
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
  }

  updateView(game, data) {
    if (!this.canvas) return;
    let width = game.config.width;
    let height = game.config.height;
    let scale = game.config.scale || 1;
    //let context = this.canvas.getContext("2d");
    //context.fillStyle = this.fill;
    //context.clearRect(0, 0, width * scale, height * scale);
    //for (let y = 0; y < height; y++) {
    //  let offset = y * width;
    //  for (let x = 0; x < width; x++) {
    //    if (data[x + offset]) {
    //      context.fillRect(x * scale, y * scale, scale, scale);
    //    }
    //  }
    //}
  }
}
