// hooks/useSlideInAnimation.js
export function useSlideInAnimation() {
    return {
      initial: { x: "100%", opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
      transition: { duration: 1 },
      viewport: { once: false, amount: 0.1 },
    };
  }
  