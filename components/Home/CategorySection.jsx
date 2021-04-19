import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import AppContext from "../../context/AppContext";

//

import img1Left from "../../images/category/img1Left.png?webp";
import img1Right from "../../images/category/img1Right.png?webp";
import img2Left from "../../images/category/img2Left.png?webp";
import img2Right from "../../images/category/img2Right.png?webp";
import img3Left from "../../images/category/img3Left.png?webp";
import img3Right from "../../images/category/img3Right.png?webp";

export default function CategorySection() {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const categoryList = [
    {
      title: "Brilliant Blues",
      subTitle: "Shades Of Sky",
      imgLeft: img1Left,
      imgRight: img1Right,
    },
    {
      title: "Radiant Reds",
      subTitle: "Shades Of Fire",
      imgLeft: img2Left,
      imgRight: img2Right,
    },
    {
      title: "Youthful Yellows",
      subTitle: "Shades Of Sunshine",
      imgLeft: img3Left,
      imgRight: img3Right,
    },
  ];

  return (
    <section className={`page-section category-section`}>
      <Container>
        {categoryList.map((category, intex) => (
          <Row className={`category-item`} key={intex}>
            <div className="content-header">
              {isMobile && (
                <div className="content-holder">
                  <p className="sub-title">{category.subTitle}</p>
                  <hr className="small gradient no-m" />
                  <h2 className="title">{category.title}</h2>
                </div>
              )}
            </div>
            <Col md="6" sm="6" xs="6" className={`seperator-left`}>
              <div className="left-section">
                <div className="image-holder">
                  <picture>
                    <img src={category.imgLeft} alt={category.title} />
                  </picture>
                </div>
              </div>
            </Col>
            <Col md="6" sm="6" xs="6" className={`seperator-right`}>
              <div className="right-section">
                <div className="cate-wrapper">
                  <div className="cate-holder">
                    <div className="image-holder">
                      <picture>
                        <img src={category.imgRight} alt={category.title} />
                      </picture>
                    </div>
                    {!isMobile && (
                      <div className="content-holder">
                        <p className="sub-title">{category.subTitle}</p>
                        <hr className="small gradient no-m" />
                        <h2 className="title">{category.title}</h2>
                      </div>
                    )}
                  </div>
                  <div className="action-holder">
                    <a href="#" className="shop-now btn">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
}
