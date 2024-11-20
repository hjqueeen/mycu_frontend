import { useState, useEffect } from 'react';

const useResponsive = (
  mobileBreakpoint = 768,
  lgBreakpoint = 1200,
  xlBreakpoint = 1536
) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= mobileBreakpoint
  );
  const [lgUp, setLgUp] = useState(window.innerWidth >= lgBreakpoint);
  const [xlUp, setXlUp] = useState(window.innerWidth >= xlBreakpoint);
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth > mobileBreakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= mobileBreakpoint);
      setLgUp(width >= lgBreakpoint);
      setXlUp(width >= xlBreakpoint);
      setIsDesktop(width > mobileBreakpoint);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint, lgBreakpoint]);

  return { isMobile, isDesktop, lgUp, xlUp };
};

export default useResponsive;
