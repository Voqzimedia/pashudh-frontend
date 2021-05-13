import { useContext } from "react";
import { Row, Col } from "reactstrap";
import { QuantityBtn } from "./CartActions";
import { icons } from "feather-icons";
import AppContext from "../../context/AppContext";
import Link from "next/link";

import { currency } from "../../helper/functions";

// images

import productImg from "../../assets/images/products/prod1.jpg?webp";

export default function CartList() {
  const { cart, setCartOpen, deleteItem } = useContext(AppContext);

  const isInCart = (product) => {
    return !!cart.items.find((item) => item.id === product.id);
  };

  // console.log(cart);

  return (
    <div className="order-list">
      {cart.items.map((product, index) => {
        return (
          <Row className={`order-item`} key={index}>
            <Col xs="4">
              <div className="product-holder">
                <div className="image-holder">
                  <picture>
                    <img
                      width="100"
                      height="100"
                      src={`${
                        process.env.NODE_ENV === "development"
                          ? process.env.NEXT_PUBLIC_API_URL
                          : ""
                      }${product.image.url}`}
                      alt={product.name}
                    />
                  </picture>
                </div>
                <div className="quantity">{product.quantity}</div>
                <button
                  className={`close-btn btn`}
                  dangerouslySetInnerHTML={{ __html: icons.x.toSvg() }}
                  onClick={() => deleteItem(product)}
                ></button>
              </div>
            </Col>
            <Col xs="8">
              <div className="product-details">
                <div className="name">{product.name}</div>
                <div className="price">
                  {currency.format(product.price)} X {product.quantity} ={" "}
                  {currency.format(product.price * product.quantity)}
                </div>
                <QuantityBtn product={product} />
              </div>
            </Col>
            <Col xs="12"></Col>
          </Row>
        );
      })}

      <div className="checkout-action">
        {cart.total > 0 ? (
          <>
            <Link href={`/shop/checkout`}>
              <a className="btn solid-btn" onClick={() => setCartOpen(false)}>
                Checkout | {currency.format(cart.total)}
              </a>
            </Link>

            {/* <BuyButton product={cart.items[0]} /> */}
          </>
        ) : (
          <button className="btn solid-btn" onClick={() => setCartOpen(false)}>
            Continue Shoping
          </button>
        )}
      </div>
    </div>
  );
}
