import React, { useEffect, useRef, useState } from "react";
import background from "./background.jpg";
import a_1 from "./img/a_1.png";
import a_2 from "./img/a_2.png";
import a_3 from "./img/a_3.png";
import a_4 from "./img/a_4.png";
import a_5 from "./img/a_5.png";
import a_6 from "./img/a_6.png";
import a_7 from "./img/a_7.png";
import a_8 from "./img/a_8.png";

const canvas_width: number = 1200;
const canvas_height: number = 800;

type locationTypes = {
  x: number;
  y: number;
};

const imgs = [a_1, a_2, a_3, a_4, a_5, a_6, a_7, a_8];

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalIdRef = useRef<NodeJS.Timer | null>(null);

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [location, setLocation] = useState<locationTypes>({
    x: 0,
    y: 0,
  });

  let currentFrame = 0;

  const draw = () => {
    if (ctx) {
      const img = new Image();
      currentFrame = (currentFrame + 1) % imgs.length;
      img.src = imgs[currentFrame];
      img.onload = () => {
        ctx.fillRect(location.x, location.y, 50, 50); // 이전 이미지를 지웁니다.
        ctx.drawImage(img, location.x, location.y, 50, 50); // 새로운 이미지를 그립니다.
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    setCanvas(canvas);
    setCtx(ctx);

    canvas.width = canvas_width;
    canvas.height = canvas_height;
    ctx.strokeRect(0, 0, canvas_width, canvas_height);
    ctx.save();

    const bg = new Image();
    bg.src = background;
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, canvas_width, canvas_height);
    };

    // const img = new Image();
    // img.src = imgs[0];
    // img.onload = () => {
    //   ctx.drawImage(img, 0, 0, 50, 50);
    // };
    setLocation({
      x: canvas_width - canvas_width + 50,
      y: canvas_height - 150,
    });
  }, []);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      draw();
    }, 50);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [location]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Game;
