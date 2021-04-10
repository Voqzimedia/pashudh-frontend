import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

import { Container, Row, Col } from "reactstrap";
import AppContext from "../../context/AppContext";

// Images
import footerLogo from "../../images/logo/logo-white.png?webp";
import footerLogoMobile from "../../images/logo/logo-mobile-white.png?webp";

export default function Footer() {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;
  return (
    <footer className="footer-area">
      <div className="footer-header">
        <Container>
          <div className="footer-logo">
            <div className="logo-holder">
              {isMobile ? (
                <img src={footerLogoMobile} alt="logo" />
              ) : (
                <img src={footerLogo} alt="logo" />
              )}
            </div>
            {isMobile ? (
              <>
                <div className="copyright-area mobile">
                  <p>Copyright © 2021 Pashudh. All Rights Reserved.</p>
                </div>
                <div className="social mobile">
                  <a href="#" className="icon">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a href="#" className="icon">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="#" className="icon">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="#" className="icon">
                    <FontAwesomeIcon icon={faPinterest} />
                  </a>
                </div>
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
                        <a href="#">Home </a>
                      </li>
                      <li>
                        <a href="#">Shop</a>
                      </li>
                      <li>
                        <a href="#">Gift Cards</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
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
                        <div className="social">
                          <a href="#" className="icon">
                            <FontAwesomeIcon icon={faFacebookF} />
                          </a>
                          <a href="#" className="icon">
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                          <a href="#" className="icon">
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                          <a href="#" className="icon">
                            <FontAwesomeIcon icon={faPinterest} />
                          </a>
                        </div>
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
                        <a href="#">Shipping Policy </a>
                      </li>
                      <li>
                        <a href="#">Cancellation Policy</a>
                      </li>
                      <li>
                        <a href="#">Exchange Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms of Service</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">FAQs</a>
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
                      <a href="#">Terms of Service</a>
                    </li>
                    <li>
                      <a href="#">Shipping Policy</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer-item">
                <div className="footer-contact">
                  <ul className="footer-nav">
                    <li>
                      <a href="#">Cancellation Policy </a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer-item">
                <div className="footer-contact">
                  <ul className="footer-nav">
                    <li>
                      <a href="#">Exchange Policy</a>
                    </li>
                    <li>
                      <a href="#">FAQs</a>
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
