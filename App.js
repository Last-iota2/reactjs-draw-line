import React, { Component } from "react";
import Canvas from "./components/canvas";

class App extends Component {
  state = {
    lines: [],
  };

  draw = (ctx, lineCoordinates, state) => {
    ctx.beginPath();
    state.map((cord) => {
      ctx.lineTo(cord["x"], cord["y"]);
      ctx.stroke();
      ctx.moveTo(cord["x"], cord["y"]);
    });
    ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
    ctx.stroke();
  };

  render() {
    return (
      <Canvas
        draw={this.draw}
        width="500"
        height="500"
        state={this.state.lines}
      />
    );
  }
}

export default App;
