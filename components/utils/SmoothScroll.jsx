import React, { useEffect, useRef } from "react";

import useWindowSize from "../../hooks/useWindowSize";

const SmoothScroll = ({ children }) => {
  // 1.
  const windowSize = useWindowSize();

  //2.
  const scrollingContainerRef = useRef();

  // 3.
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  // 4.
  useEffect(() => {
    setBodyHeight();
  }, [windowSize.height]);

  const setBodyHeight = () => {
    document.body.style.height = `${
      scrollingContainerRef.current.getBoundingClientRect().height
    }px`;
  };

  // 5.
  useEffect(() => {
    windowSize.width > 500
      ? requestAnimationFrame(() => smoothScrollingHandler())
      : null;
  }, [windowSize]);

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    scrollingContainerRef.current
      ? (scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`)
      : null;

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return (
    <div className="scroll-parent">
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
};

export default SmoothScroll;