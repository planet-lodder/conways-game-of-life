import "@planet-lodder/game-of-life/web-component";

//import { GameEngineCore, BenchmarkRenderer } from "@planet-lodder/game-of-life"
//
//class GameEngineExtended extends GameEngineCore {
//  load(data) {
//    this.data = data;
//    if (this.view) this.view.createView(this, data)
//  }
//
//  tick() {
//    let data = this.data;    
//    // TODO: Your next generation computation...
//  }
//}
//
//// Game settings
//let config = {
//    image: '/game/presets/basic/101.gif',
//    delay: 500,
//}
//
//// Add view as a new DOM element
//let view = new BenchmarkRenderer()
//document.body.appendChild(view)
//
//// Attach view to custom game engine and start
//let engine = new GameEngineExtended(config, view);
//engine.start()