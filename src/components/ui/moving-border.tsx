'use client';

import React, { useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  glowEffect = true,
  multiColor = false,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  glowEffect?: boolean;
  multiColor?: boolean;
  className?: string;
  [key: string]: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl group",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder 
          duration={isHovered ? duration * 0.7 : duration} 
          rx="30%" 
          ry="30%"
          multiColor={multiColor}
          isHovered={isHovered}
          isPressed={isPressed}
        >
          <div
            className={cn(
              "h-20 w-20",
              "opacity-[0.8] transition-opacity duration-300",
              isHovered ? "opacity-90" : "opacity-70",
              borderClassName,
            )}
            style={{
              background: multiColor 
                ? "radial-gradient(var(--moving-gradient))" 
                : "radial-gradient(#0ea5e9 40%, transparent 60%)"
            }}
          />
        </MovingBorder>
      </div>

      {glowEffect && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0"
              style={{ borderRadius: borderRadius }}
            >
              <div 
                className="absolute inset-0 blur-md"
                style={{
                  background: multiColor 
                    ? "radial-gradient(var(--glow-gradient))" 
                    : "radial-gradient(circle at center, rgba(14, 165, 233, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 80%)"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <motion.div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          "transition-all duration-300",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
        animate={{
          scale: isPressed ? 0.97 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  multiColor = false,
  isHovered = false,
  isPressed = false,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  multiColor?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);
  
  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30
  });

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      const direction = isPressed ? -1 : 1;
      const speedMultiplier = isHovered ? 1.5 : 1;
      progress.set((time * pxPerMillisecond * direction * speedMultiplier) % length);
    }
  });

  const x = useTransform(
    smoothProgress,
    (val) => pathRef.current?.getPointAtLength(val)?.x || 0
  );
  const y = useTransform(
    smoothProgress,
    (val) => pathRef.current?.getPointAtLength(val)?.y || 0
  );

  const rotateZ = useMotionValue(0);
  
  useEffect(() => {
    if (isHovered) {
      rotateZ.set(isPressed ? -10 : 5);
    } else {
      rotateZ.set(0);
    }
  }, [isHovered, isPressed, rotateZ]);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%) rotate(${rotateZ}deg)`;

  // Fix: Create CSS variables properly with React inline styles
  let movingGradient = "#0ea5e9 40%, #3b82f6 65%, transparent 80%";
  let glowGradient = "circle at center, rgba(34, 211, 238, 0.4) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 80%";
  
  if (multiColor) {
    if (isPressed) {
      movingGradient = "#f472b6 40%, #c084fc 65%, transparent 80%";
      glowGradient = "circle at center, rgba(244, 114, 182, 0.4) 0%, rgba(192, 132, 252, 0.2) 50%, transparent 80%";
    } else if (isHovered) {
      movingGradient = "#22d3ee 40%, #0ea5e9 65%, transparent 80%";
      glowGradient = "circle at center, rgba(34, 211, 238, 0.4) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 80%";
    }
  }

  return (
    <div style={{
      // Define CSS variables using the style property with proper TypeScript typing
      "--moving-gradient": movingGradient,
      "--glow-gradient": glowGradient
    } as React.CSSProperties}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
          filter: isHovered ? "blur(0px)" : "blur(1px)",
          scale: isPressed ? 1.2 : isHovered ? 1.1 : 1,
          transition: "filter 0.3s, scale 0.2s",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};