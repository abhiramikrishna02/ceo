import { useEffect, useRef, useState } from "react";

export function useReveal(threshold = 0.22) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export function revealStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
    transition: `opacity 820ms ease ${delay}ms, transform 820ms ease ${delay}ms`,
  };
}
