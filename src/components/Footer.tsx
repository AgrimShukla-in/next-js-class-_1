'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

// Add type declarations for browser-specific fullscreen properties
declare global {
  interface Document {
    webkitFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
    msFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  }
}

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [binaryText, setBinaryText] = useState<string>('');
  const [hackerText, setHackerText] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Color palette
  const colors = ["#0A84FF", "#3A3AE0", "#9B59F2", "#FF3B6E", "#32D6C5"];

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ));
    };

    // Check scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate if we're near the bottom
      setIsScrolledToBottom(scrollPosition + windowHeight >= documentHeight - 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate binary stream
  useEffect(() => {
    const generateBinary = () => {
      const binary = Array.from({ length: 24 }, () => Math.floor(Math.random() * 2)).join('');
      setBinaryText(binary);
    };

    generateBinary();
    const interval = setInterval(generateBinary, 200);
    return () => clearInterval(interval);
  }, []);

  // Matrix-like text effect
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+=<>{}[]';
    const generateHackerText = () =>
      Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    setHackerText(generateHackerText());
    const interval = setInterval(() => {
      setHackerText(generateHackerText());
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Create and move particles effect
  useEffect(() => {
    if (particles.length < 20) {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        opacity: 0.1 + Math.random() * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setParticles(prev => [...prev, newParticle]);
    }

    const moveParticles = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(moveParticles);
  }, [particles]);

  // If in fullscreen mode, hide the footer
  if (isFullscreen) {
    return null;
  }

  return (
    <footer 
      className={`relative w-full h-36 bg-black overflow-hidden border-t transition-opacity duration-300 ${
        isScrolledToBottom ? 'opacity-100' : 'opacity-80 hover:opacity-100'
      }`}
      style={{ 
        borderColor: '#32D6C5'
      }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(50,214,197,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(50,214,197,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Cursor follower */}
      <div 
        className="absolute w-32 h-32 rounded-full pointer-events-none opacity-10"
        style={{
          background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y - 200}px`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(8px)',
          transition: 'left 0.2s ease-out, top 0.2s ease-out'
        }}
      />

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            backgroundColor: p.color,
            boxShadow: `0 0 5px ${p.color}`,
          }}
        />
      ))}

      {/* Particle connections */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.slice(0, 10).map((p, i) =>
          particles.slice(i + 1, i + 4).map((p2, j) => (
            <line
              key={`line-${i}-${j}`}
              x1={`${p.x}%`}
              y1={`${p.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke={p.color}
              strokeOpacity="0.2"
              strokeWidth={0.5}
            />
          ))
        )}
      </svg>

      {/* Binary text */}
      <div className="absolute bottom-8 left-4 text-xs font-mono" style={{ color: '#32D6C5' }}>
        {binaryText}
      </div>

      {/* Hacker text */}
      <div className="absolute bottom-8 right-4 text-xs font-mono" style={{ color: '#9B59F2' }}>
        {hackerText}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-1/3 h-2 bg-black rounded overflow-hidden">
        <div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, #0A84FF, #3A3AE0, #9B59F2, #FF3B6E)',
            width: `${30 + Math.sin(Date.now() / 1000) * 20 + 20}%`,
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* Footer content */}
      <div className="absolute bottom-0 w-full px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* System status */}
          <div className="flex items-center mb-2 md:mb-0">
            <div className="font-mono text-xs" style={{ color: '#32D6C5' }}>
              system.status: <span style={{ color: '#0A84FF' }}>online</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-300">© {currentYear} TechNexus. All rights reserved.</p>

          {/* Links */}
          <div className="flex space-x-6 mt-2 md:mt-0 text-sm">
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors">
              Sitemap
            </Link>
            <div className="flex items-center">
              <span className="mr-2 text-gray-300">Theme:</span>
              <span className="font-medium text-gray-100">
                {theme === 'system' ? 'System' : theme?.charAt(0).toUpperCase()? + theme?.slice(1): theme}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Colorful bottom border */}
      <div className="absolute bottom-0 w-full h-1" style={{ 
        background: 'linear-gradient(to right, #0A84FF, #3A3AE0, #9B59F2, #FF3B6E, #32D6C5)'
      }}></div>
    </footer>
  );
};

export default Footer;