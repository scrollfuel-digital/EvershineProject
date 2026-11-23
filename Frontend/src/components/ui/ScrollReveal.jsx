import React, { useEffect, useRef, useState } from "react";

const ScrollReveal = ({
  children,
  className = "",
  innerClassName = "",
  direction = "up", // 'up' | 'down' | 'left' | 'right'
  duration = 2000,
  delay = 0,
  distance = 50,
  threshold = 0.15,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // reveal once, then stop watching
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const dir = ["up", "down", "left", "right"].includes(direction?.toLowerCase())
    ? direction.toLowerCase()
    : "up";

  // Calculate direction offsets (fallback & inline vars)
  let x = "0px";
  let y = "0px";
  if (dir === "up") y = `${distance}px`;
  else if (dir === "down") y = `-${distance}px`;
  else if (dir === "left") x = `-${distance}px`;
  else if (dir === "right") x = `${distance}px`;

  const hasHeight = className.includes("h-full") ? "h-full" : "";

  return (
    <div ref={ref} className={className}>
      <div
        className={`scroll-reveal reveal-${dir} ${isVisible ? "is-visible" : ""} ${hasHeight} ${innerClassName}`}
        style={{
          "--reveal-duration": `${duration}ms`,
          "--reveal-delay": `${delay}ms`,
          "--reveal-distance": `${distance}px`,
          "--reveal-x": x,
          "--reveal-y": y,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollReveal;
