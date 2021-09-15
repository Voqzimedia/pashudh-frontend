import { currency, imgUrlCheck } from "../../helper/functions";
import { motion } from "framer-motion";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

export default function RelatedItems({ relatedItems, category }) {
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const productImgMotion = {
    initial: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
    animate: { opacity: 1, ease: "easeOut", duration: 0.2, type: "tween" },
    whileHover: {
      scale: 1.05,
      y: -5,
    },
    transition: {
      transition,
    },
  };
  return (
    <Container>
      <center>
        <h2 className={`grid-title`}>You May Also Like</h2>
      </center>
      <div className="product-grid">
        <Row>
          {relatedItems.map(
            (product, index) =>
              index < 3 && (
                <Col md="4" key={index}>
                  <motion.div
                    whileHover="whileHover"
                    animate="animate"
                    initial="initial"
                    variants={productImgMotion}
                    transition="transition"
                    key={index}
                  >
                    <Link href={`/shop/product/${product.slug}`}>
                      <a className="product-item">
                        <motion.div className="image-holder">
                          {product.StockDetails.isSoldOut && (
                            <motion.div className="sold-out">
                              <p>Sold Out</p>
                            </motion.div>
                          )}

                          <img
                            width="100"
                            height="100"
                            src={`${imgUrlCheck(product.image.url)}`}
                            alt={product.name}
                          />
                        </motion.div>
                        <Row className="product-content-holder">
                          <Col xs="9" className="no-pad">
                            <p className="title">{product.name}</p>
                          </Col>
                          <Col xs="3" className="no-pad">
                            <p className="price">
                              {currency.format(product.price)}
                            </p>
                          </Col>
                        </Row>
                      </a>
                    </Link>
                  </motion.div>
                </Col>
              )
          )}
        </Row>
      </div>
    </Container>
  );
}
