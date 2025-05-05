'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from "motion/react";

export default function AnimatedThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center justify-center rounded-full p-2 w-16 h-8 bg-gray-200 dark:bg-gray-800 overflow-hidden"
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: isDark ? 360 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{
          rotate: { duration: 0.5 },
          opacity: { duration: 0.25 }
        }}
      >
        <span className="text-lg">☀️</span>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: isDark ? 0 : -360,
          opacity: isDark ? 1 : 0,
        }}
        transition={{
          rotate: { duration: 0.5 },
          opacity: { duration: 0.25 }
        }}
      >
        <span className="text-lg">🌙</span>
      </motion.div>

      <motion.div
        className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md"
        layout
        animate={{
          x: isDark ? 8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      />
    </motion.button>
  );
}