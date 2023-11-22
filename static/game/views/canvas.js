class ImageCanvasRenderer extends GameRendererCore {
  static {
    // Register game engine view type
    customElements.define("view-image-canvas", ImageCanvasRenderer);
    GameOfLife.addViewType(
      "canvas",
      "Image Canvas",
      "icons/canvas.svg",
      () => new ImageCanvasRenderer()
    );
  }
  
  render(target) {}

  setLoading(active, context) {}

  createView(config, data) {}

  updateView(config, data) {}

  updateFPS(fps) {}
}
