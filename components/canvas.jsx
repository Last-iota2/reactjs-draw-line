import React from "react";
import useCanvas from "./common/useCanvas";

const Canvas = (props) => {
  const { draw, state, ...rest } = props;
  const canvasRef = useCanvas(draw, state);


  const undo = () => {
    state.pop();
    state.pop();
  };
  
  
  const clear = () => {
    state.length = 0
  };

  
  return (
    <React.Fragment>
      <canvas
        ref={canvasRef}
        className="border mx-5"
        {...rest}
      />
      <button className="btn btn-outline-primary mx-1" style={{ width: "75px", height: "40px" }} onClick={undo}>
        Undo
      </button>
      <button className="btn btn-outline-danger mx-1" style={{ width: "75px", height: "40px" }} onClick={clear}>
        Clear
      </button>
    </React.Fragment>
  );
};

export default Canvas;