import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Row, Col } from "reactstrap";

import { currency, imgUrlCheck } from "../../helper/functions";

export default function CategoryGrid({ categories }) {
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

  // console.log(categories);

  return (
    <div className="product-grid">
      <Row>
        {categories.map((category, index) => (
          <Col md="4" key={index}>
            <motion.div
              whileHover="whileHover"
              animate="animate"
              initial="initial"
              variants={productImgMotion}
              transition="transition"
              key={index}
            >
              <Link href={`/shop/${category.slug}`}>
                <a className="product-item">
                  <motion.div className="image-holder">
                    <img
                      width="100"
                      height="100"
                      src={`${imgUrlCheck(category.img.url)}`}
                      alt={category.title}
                    />
                  </motion.div>
                  <Row className="product-content-holder">
                    <Col xs="12" className="no-pad">
                      <center>
                        <h5 className="title">{category.title}</h5>
                      </center>
                    </Col>
                  </Row>
                </a>
              </Link>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
