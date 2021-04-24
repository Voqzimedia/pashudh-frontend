import React, { useEffect, useRef } from "react";

export default function ProductScroll({ children }) {
  const productScroller = useRef();
  const productDetails = useRef();

  useEffect(() => {
    console.log(productScroller.current.getBoundingClientRect());
    window.addEventListener("scroll", handleScroll);

    return window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {};

  return (
    <div ref={productScroller} className="product-scroller">
      <div ref={productDetails} className="product-details">
        {children}
      </div>
    </div>
  );
}
