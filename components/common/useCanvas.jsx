import { useRef, useEffect } from "react";

const useCanvas = (draw, state) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let startPosition = { x: 0, y: 0 };
    let lineCoordinates = { x: 0, y: 0 };
    let isDrawStart = false;

    const mouseDownListener = (event) => {
      startPosition = getClientOffset(event);
      isDrawStart = true;
      state.push({ ...startPosition });
    };

    const getClientOffset = (event) => {
      const { pageX, pageY } = event.touches ? event.touches[0] : event;
      const x = pageX - canvas.offsetLeft;
      const y = pageY - canvas.offsetTop;

      return {
        x,
        y,
      };
    };

    const mouseMoveListener = (event) => {
      if (!isDrawStart) return;

      lineCoordinates = getClientOffset(event);
      clearCanvas();
      render();
    };


    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener("mousedown", mouseDownListener);
    canvas.addEventListener("mousemove", mouseMoveListener);

    canvas.addEventListener("touchstart", mouseDownListener);
    canvas.addEventListener("touchmove", mouseMoveListener);

    const render = () => {
      draw(context, lineCoordinates, state);
    };
    render();

  }, [draw]);

  return canvasRef;
};

export default useCanvas;
