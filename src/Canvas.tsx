import React, { useEffect, useRef, useState } from "react";

const canvas_width: number = 1200;
const canvas_height: number = 800;

const margin_top: number = 50;

const arrow_width: number = 50;
const arrow_height: number = 50;

let cursor = "start";

type CanvasPropsType = {
  isStartToggle: () => void;
};

type arrow = {
  x: number;
  y: number;
};

const Canvas = ({ isStartToggle }: CanvasPropsType) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalIdRef = useRef<NodeJS.Timer | null>(null);
  // const intervalIdRef = useRef<number | null>(null);
  const [canvas, setCnavas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [arrow, setArrow] = useState<arrow>({
    x: 0,
    y: 0,
  });

  const onKeyDown = (e: KeyboardEvent) => {
    const { code }: { code: string } = e;
    console.log(code);
    if (code === "ArrowDown") {
      if (cursor !== "about") {
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        cursor = "about";
        setArrow((prev) => {
          return { ...prev, y: prev.y + margin_top * 2 };
        });
      }
    } else if (code === "ArrowUp") {
      if (cursor !== "start") {
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        cursor = "start";
        setArrow((prev) => {
          return { ...prev, y: prev.y - margin_top * 2 };
        });
      }
    } else if (code === "Enter") {
      isStartToggle();
    }
  };
  const Draw_arrow = () => {
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.moveTo(arrow.x, arrow.y);
      ctx.lineTo(arrow.x, arrow.y + arrow_height);
      ctx.lineTo(arrow.x + arrow_width, arrow.y + arrow_height / 2);
      ctx.fill();

      ctx.save();
      setTimeout(() => {
        ctx.clearRect(arrow.x, arrow.y, arrow_width, arrow_height);
        ctx.restore();
      }, 500);
    }
  };

  useEffect(() => {
    if (ctx) {
      if (intervalIdRef.current) window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = setInterval(() => {
        Draw_arrow();
      }, 1000);
      return () => {
        if (intervalIdRef.current) {
          window.clearInterval(intervalIdRef.current);
        }
      };
    }
  }, [arrow, ctx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    setArrow({
      x: canvas_width / 2 - margin_top - 100,
      y: canvas_height / 2 - margin_top - 40,
    });

    setCtx(ctx);
    setCnavas(canvas);

    canvas.width = canvas_width;
    canvas.height = canvas_height;
    ctx.strokeRect(0, 0, canvas_width, canvas_height);

    ctx.font = "48px serif";
    ctx.fillText(
      "Start",
      canvas_width / 2 - margin_top,
      canvas_height / 2 - margin_top
    );
    ctx.fillText(
      "About",
      canvas_width / 2 - margin_top,
      canvas_height / 2 - margin_top * -1
    );

    // ctx.fillRect(0, 0, canvas_width / 2 - 50, canvas_height);
    // ctx.fill();

    // ctx.arc(50, 50, 10, Math.PI * 2, true);

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
