import { useEffect } from 'react';

const useScrollFadeIn = (scrollSectionRef) => {
  useEffect(() => {
    const handleScroll = () => {
      scrollSectionRef.current.forEach((section) => {
        if (section && isInView(section)) {
          section.classList.add('scroll-section--visible');
        }
      });
    };

    const isInView = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollSectionRef]);
};

export default useScrollFadeIn;
