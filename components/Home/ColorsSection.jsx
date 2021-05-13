import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import AppContext from "../../context/AppContext";
import Link from "next/link";

//

import img1Left from "../../assets/images/category/img1Left.png?webp";
import img1Right from "../../assets/images/category/img1Right.png?webp";
import img2Left from "../../assets/images/category/img2Left.png?webp";
import img2Right from "../../assets/images/category/img2Right.png?webp";
import img3Left from "../../assets/images/category/img3Left.png?webp";
import img3Right from "../../assets/images/category/img3Right.png?webp";

export default function ColorsSection() {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const colorsList = [
    {
      title: "Brilliant Blues",
      subTitle: "Shades Of Sky",
      slug: "brilliant-blues",
      longImg: img1Left,
      shortImg: img1Right,
    },
    {
      title: "Radiant Reds",
      subTitle: "Shades Of Fire",
      slug: "radiant-reds",
      longImg: img2Left,
      shortImg: img2Right,
    },
    {
      title: "Youthful Yellows",
      slug: "youthful-yellows",
      subTitle: "Shades Of Sunshine",
      longImg: img3Left,
      shortImg: img3Right,
    },
  ];

  return (
    <section className={`page-section colors-section`}>
      <Container>
        {colorsList.map(
          (category, intex) =>
            intex < 3 && (
              <Row className={`colors-item`} key={intex}>
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
                        <img
                          width="100"
                          height="100"
                          src={category.longImg}
                          alt={category.title}
                        />
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
                            <img
                              width="100"
                              height="100"
                              src={category.shortImg}
                              alt={category.title}
                            />
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
                        <Link href={`/shop/colors/${category.slug}`}>
                          <a className="shop-now btn">Shop Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            )
        )}
      </Container>
    </section>
  );
}
