class GameEngineCore {
  constructor(view) {
    if (this.constructor == GameEngineCore) {
      throw new Error("Class is of abstract type and can't be instantiated");
    }

    if (!view) throw new Error("Game 'view' is required");
    if (!this.load) throw new Error("<GameEngineCore>.load(data) method must be implemented");
    if (!this.tick) throw new Error("<GameEngineCore>.tick() method must be implemented");
  }
  
}
