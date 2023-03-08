import React, { useEffect, useRef } from 'react';

const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    // const contextRef = useRef<CanvasRenderingContext2D | undefined>(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        canvas.width = 1400;
        canvas.height = 800;
    },[])


    return (
        <canvas ref={canvasRef}>
            
        </canvas>
    );
};

export default Canvas;