import { useEffect, useState } from 'react';

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 992);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 992);
      setWindowHeight(window.innerHeight);

    });
  });

  return { isMobile, isTablet, setIsMobile, windowHeight };
};

export default useResponsive;
