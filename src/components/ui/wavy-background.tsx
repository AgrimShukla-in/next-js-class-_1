"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors, // optional override
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[]; // if you still want to pass custom colors
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = createNoise3D();
  let w: number, h: number, nt = 0, animationId: number;
  let ctx: CanvasRenderingContext2D;

  const appleWavePalettes = {
    light: [
      "#007AFF", // systemBlue (light)
      "#5856D6", // systemIndigo (light)
      "#AF52DE", // systemPurple (light)
      "#FF2D55", // systemPink (light)
      "#5AC8FA", // systemTeal (light)
    ],
    dark: [
      "#0A84FF", // systemBlue (dark)
      "#3A3AE0", // modified Indigo (dark)
      "#9B59F2", // modified Purple (dark)
      "#FF3B6E", // modified Pink (dark)
      "#32D6C5", // modified Teal (dark alternative)
    ],
  };

  const [waveColors, setWaveColors] = useState<string[]>(
    appleWavePalettes.light
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const setColors = () => {
      setWaveColors(
        mql.matches ? appleWavePalettes.dark : appleWavePalettes.light
      );
    };
    setColors();
    mql.addEventListener("change", setColors);
    return () => mql.removeEventListener("change", setColors);
  }, []);

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  const init = () => {
    const canvas = canvasRef.current!;
    ctx = canvas.getContext("2d")!;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    resize();
    window.addEventListener("resize", resize);
    render();
  };

  const drawWave = (n: number) => {
    nt += getSpeed();
    const palette = colors ?? waveColors;

    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth ?? 50;
      ctx.strokeStyle = palette[i % palette.length];

      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, i * 0.3, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }

      ctx.stroke();
      ctx.closePath();
    }
  };

  const render = () => {
    ctx.globalAlpha = waveOpacity;
    ctx.fillStyle = backgroundFill ?? "black";
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => cancelAnimationFrame(animationId);
  }, [waveColors, blur, speed, waveOpacity, waveWidth, backgroundFill, colors]);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={isSafari ? { filter: `blur(${blur}px)` } : {}}
      />

      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
