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

  render(target) {}

  setLoading(active, context) {}

  createView(game, data) {}

  updateView(game, data) {}

}
