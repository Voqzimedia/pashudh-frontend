import React from "react";

export default function QuantityBtn() {
  return (
    <div className="quantity-action">
      <div className="quantity-wrapper">
        <button className={`quantity-inc btn`}>+</button>1
        <button className={`quantity-dec btn`}>-</button>
      </div>
    </div>
  );
}
