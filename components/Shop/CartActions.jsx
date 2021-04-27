import React, { useState, useContext } from "react";

import AppContext from "../../context/AppContext";

export const QuantityBtn = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // const { cart, addItem, removeItem } = useContext(AppContext);

  const incrementHandler = () => {
    // cart.items.length < 100 ? addItem(product) : null;
    quantity < 100 ? setQuantity(() => quantity + 1) : null;
  };

  const decrementHandler = () => {
    // cart.items.length > 1 ? removeItem(product) : null;
    quantity > 1 ? setQuantity(() => quantity - 1) : null;
  };

  return (
    <div className="quantity-action">
      <div className="quantity-wrapper">
        <button className={`quantity-inc btn`} onClick={incrementHandler}>
          +
        </button>
        {/* {cart.items.length > 0 ? cart.items.length : 1} */}
        {quantity}
        <button className={`quantity-dec btn`} onClick={decrementHandler}>
          -
        </button>
      </div>
    </div>
  );
};

export const AddToCart = ({ product }) => {
  const { cart, addItem, removeItem, setCartOpen } = useContext(AppContext);

  return (
    <button
      className="btn solid-btn"
      onClick={() => {
        addItem(product);
        setCartOpen(true);
      }}
    >
      Add to Cart
    </button>
  );
};

export const BuyNow = ({ product }) => {
  return <button className="btn solid-btn">Buy Now</button>;
};
