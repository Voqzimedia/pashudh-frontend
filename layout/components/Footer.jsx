import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

// Images
import footerLogo from "../../public/images/logo/logo-white@2x.png";

export default function Footer() {
  return (
    <footer className="footer-area">
      <div className="footer-header">
        <div className="container">
          <div className="footer-logo">
            <div className="logo-holder">
              <img src={footerLogo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
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
            </div>
            <div className="col-lg-3">
              <div className="footer-item">
                <div className="footer-contact">
                  <h3>Say Hello</h3>
                  <ul className="footer-nav">
                    <li>
                      <a href="#">
                        #191/420, Big Sourashtra Street, Sathyamurthy Road, Arni
                        632301, Tamil Nadu, India
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
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
            </div>
            <div className="col-lg-3">
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
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          <p>Copyright © 2021 Pashudh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
