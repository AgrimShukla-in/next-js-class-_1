"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

// Define the interface for your testimonial data
interface TestimonialItem {
  id: number;
  clientName: string;
  testimonial: string;
  rating: number;
  image: string;
  date: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: TestimonialItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [centerItemId, setCenterItemId] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    addAnimation();
    setupIntersectionObserver();
    
    return () => {
      // Cleanup observer on unmount
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  const [start, setStart] = useState(false);
  
  // Setup intersection observer to detect when cards are in the center
  const setupIntersectionObserver = () => {
    if (!scrollerRef.current) return;
    
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
            setCenterItemId(id);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.8,
        rootMargin: '-30% 0px -30% 0px' // This creates a "center zone"
      }
    );
    
    // Observe all card elements
    const cards = scrollerRef.current.querySelectorAll('li');
    cards.forEach(card => {
      if (observerRef.current) {
        observerRef.current.observe(card);
      }
    });
  };
  
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i < rating ? "text-yellow-500" : "text-gray-300"}`}>
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          isHovered && pauseOnHover && "animate-pause"
        )}
      >
        {items.map((item) => (
          <li
            data-id={item.id}
            className={cn(
              'bg-white dark:bg-black',
              "relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 px-8 py-6 md:w-[450px] dark:border-zinc-700 transition-all duration-700",
              centerItemId === item.id ? "scale-105 z-10 shadow-lg" : "scale-100",
              // Add fade-in/fade-out classes
              "opacity-transition"
            )}
            key={item.id}
          >
            <blockquote className="transition-all duration-500">
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-full w-full"
              ></div>
              
              <div className="flex items-center mb-4">
                {item.image && (
                  <div className="mr-3">
                    <img 
                      src={item.image || "/api/placeholder/40/40"} 
                      alt={item.clientName} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-base text-neutral-800 dark:text-white">
                    {item.clientName}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-gray-400">
                    {item.date}
                  </p>
                </div>
              </div>
              
              {renderStars(item.rating)}
              
              <p className="relative z-20 mt-3 text-sm leading-relaxed font-normal text-neutral-700 dark:text-gray-300">
                {item.testimonial}
              </p>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;