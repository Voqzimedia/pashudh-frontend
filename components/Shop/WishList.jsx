import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import AppContext from "../../context/AppContext";
import { icons } from "feather-icons";
import Link from "next/link";

import { currency } from "../../helper/functions";

// images

import productImg from "../../assets/images/products/prod1.jpg?webp";

export default function WishList() {
  const { wishlist, setWishlistOpen, deleteItemWishlist } = useContext(
    AppContext
  );

  return (
    <div className="order-list">
      {wishlist.items.length > 0 ? (
        wishlist.items.map((product, index) => {
          return (
            <Row className={`order-item`} key={index}>
              <Col xs="4">
                <div className="product-holder">
                  <div className="image-holder">
                    <picture>
                      <img
                        width="100"
                        height="100"
                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                        alt={product.name}
                      />
                    </picture>
                  </div>
                  <button
                    className={`close-btn btn`}
                    dangerouslySetInnerHTML={{ __html: icons.x.toSvg() }}
                    onClick={() => deleteItemWishlist(product)}
                  ></button>
                </div>
              </Col>
              <Col xs="8">
                <div className="product-details">
                  <Link href={`/shop/whole-six-yards/${product.slug}`}>
                    <a className="name">{product.name}</a>
                  </Link>
                  <div className="price">{currency.format(product.price)}</div>
                </div>
              </Col>
              <Col xs="12"></Col>
            </Row>
          );
        })
      ) : (
        <div className="emptyList">
          <center>
            <h5>No products in your wishlist</h5>
          </center>
        </div>
      )}
    </div>
  );
}
