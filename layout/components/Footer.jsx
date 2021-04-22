import React, { useContext } from "react";
import Social from "../../components/Social";

import { Container, Row, Col } from "reactstrap";
import AppContext from "../../context/AppContext";

import Link from "next/link";

// Images
import footerLogo from "../../assets/images/logo/logo-white.svg";
import footerLogoMobile from "../../assets/images/logo/logo-mobile-white.svg";

export default function Footer({ className }) {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;
  return (
    <footer className={`footer-area ${className ? className : ""} `}>
      <div className="footer-header">
        <Container>
          <div className="footer-logo">
            <div className="logo-holder">
              {isMobile ? (
                <img
                  width="100"
                  height="100"
                  src={footerLogoMobile}
                  alt="logo"
                />
              ) : (
                <img width="100" height="100" src={footerLogo} alt="logo" />
              )}
            </div>
            {isMobile ? (
              <>
                <div className="copyright-area mobile">
                  <p>Copyright © 2021 Pashudh. All Rights Reserved.</p>
                </div>
                <Social className={`mobile`} />
              </>
            ) : null}
          </div>
        </Container>
      </div>
      <div className="footer-top">
        <Container>
          {!isMobile ? (
            <Row>
              <Col lg="3" md="6">
                <div className="footer-item">
                  <div className="footer-contact">
                    <h3>Quick Links</h3>
                    <ul className="footer-nav">
                      <li>
                        <Link href={`/`}>
                          <a>Home</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/shop`}>
                          <a>Shop</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/gift-cards`}>
                          <a>Gift Cards</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/contact`}>
                          <a>Contact</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg="3" md="6">
                <div className="footer-item">
                  <div className="footer-contact">
                    <h3>Say Hello</h3>
                    <ul className="footer-nav">
                      <li>
                        <a href="#">
                          #191/420, Big Sourashtra Street, Sathyamurthy Road,
                          Arni 632301, Tamil Nadu, India
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg="3" md="6">
                <div className="footer-item">
                  <div className="footer-contact">
                    <h3>Support</h3>
                    <ul className="footer-nav">
                      <li>
                        <a href="#">care@pashudh.com </a>
                      </li>
                      <li>
                        <a href="#">+91 90033 95998</a>
                      </li>
                      <li>
                        <Social />
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg="3" md="6">
                <div className="footer-item">
                  <div className="footer-contact">
                    <h3>Information</h3>
                    <ul className="footer-nav">
                      <li>
                        <Link href={`/support`}>
                          <a>Shipping Policy </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/support`}>
                          <a>Cancellation Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/support`}>
                          <a>Exchange Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/support`}>
                          <a>Terms of Service</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/support`}>
                          <a>Privacy Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/support`}>
                          <a>FAQs</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <div className="mobile-footer-bottom">
              <div className="footer-item">
                <div className="footer-contact">
                  <ul className="footer-nav">
                    <li>
                      <Link href={`/support`}>
                        <a>Terms of Service</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/support`}>
                        <a>Shipping Policy</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer-item">
                <div className="footer-contact">
                  <ul className="footer-nav">
                    <li>
                      <Link href={`/support`}>
                        <a>Cancellation Policy </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/support`}>
                        <a>Privacy Policy</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer-item">
                <div className="footer-contact">
                  <ul className="footer-nav">
                    <li>
                      <Link href={`/support`}>
                        <a>Exchange Policy</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/support`}>
                        <a href="#">FAQs</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
      {!isMobile ? (
        <div className="copyright-area">
          <Container>
            <p>Copyright © 2021 Pashudh. All Rights Reserved.</p>
          </Container>
        </div>
      ) : null}
    </footer>
  );
}
