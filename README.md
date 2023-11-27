# Conways Game of Life

A JavaScript implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

## Features

The main features included in this package:

- A `<game-of-life>` web component, that you can embed in your own website
- Configurable game settings, including a way to load a preset from an `image`
- Styled using `Tailwind CSS`, so look and feel can be easily customized
- Multiple `view types` can be selected, each implemented as a web component
- The `GameEngine` can be extended or replaced using `GameEngineCore`.

View types that are currently included:

- `html` - A simple view using `DIV`'s to paint cells (uses shadow DOM)
- `svg` - View is generated as a `SVG` image (uses shadow DOM)
- `canvas` - Draw the view directly onto an image canvas
- `webgl` - Game is rendered as polygons in a WebGL context
- `benchmark` - A special view type to measure game engine performance

Each view type has it's strengths and weaknesses, for example `html` and `svg`
performs really well (using the shadow DOM) for smaller game sizes, where as
`canvas` and `webgl` generally performs better for large and complex games.

By supporting multiple `GameEngine`'s and `view types`, we can benchmark
and compare their performance, given small and very large workloads.

## Installation

You can install the `npm` package into your local project using:

```bash
npm i @planet-lodder/game-of-life
```

Then import the game code and all its dependencies:

```javascript
// Import the custom web component and register in DOM
import "@planet-lodder/game-of-life/web-component";
```

Alternatively, you can just embed the minimized `javascript` file directly
into your project or website, using `web-component.js`.

## Usage

Include the required javascript, then you can declare the board game like so:

```html
<script src="/js/web-component.js"></script>

<game-of-life
  title="Demo of Life"
  image="/presets/simple/traffic-circle.gif"
  width="100"
  height="100"
  scale="10"
  delay="0"
  view="svg"
></game-board>
```

If you want to customize or extend the game logic, you can also use module imports:

```javascript
import { GameEngineCore, BenchmarkRenderer } from "@planet-lodder/game-of-life"

export class GameEngine extends GameEngineCore {

  load(data) {
    this.data = data;
    if (this.view) this.view.createView(this, data)
  }

  tick() {
    let data = this.data;
    ...
  }
}

// Add view as a new DOM element
let view = new BenchmarkRenderer()
document.body.appendChild(view)

// Attach view to custom game engine and start
let config = {
  image: '/presets/basic/101.gif'
}
let engine = new GameEngine(config, view);
engine.start()
```

## Configuration

The following settings are available:

| Setting | Description and defaults                                                      |
| ------- | ----------------------------------------------------------------------------- |
| title   | Optional title for the toolbar (default: "Game of Life").                     |
| image   | The image containing the preset to load on the board.                         |
| width   | The horizontal number of cells on the board. Defaults to image size.          |
| height  | The vertical number of cells on the board. Defaults to image size.            |
| scale   | The scale can be used to magnify the view.                                    |
| delay   | If specified, limits the frame rate by with some delay (in millisecons).      |
| wrapped | If set to `true`, the board wraps around both the x and y axis.               |
| view    | Specify the view type. Options: `html`, `svg`, `canvas`, `webgl`, `benchmark` |
| start   | If set to `true`, will auto start the game once loaded.                       |

## Local development with `web-dev-server`

You can download the source code locally and run it in development mode:

```bash
git clone git@github.com:planet-lodder/conways-game-of-life.git
cd conways-game-of-life

npm install
npm start
```

This runs a local development server that serves the game as a web component, located in `static/index.html`
