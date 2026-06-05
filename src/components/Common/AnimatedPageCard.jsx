import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

const AnimatedPageCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.style.opacity = "1";
      card.style.transform = "none";
      return undefined;
    }

    const animation = animate(card, {
      opacity: [0, 1],
      translateY: [18, -3, 0],
      scale: [0.98, 1.008, 1],
      duration: 620,
      ease: "out(3)",
    });

    return () => animation.pause();
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(18px) scale(0.98)",
        transformOrigin: "center top",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedPageCard;
