import React from "react";

import { Row, Col } from "reactstrap";
import { icons } from "feather-icons";

import dynamic from "next/dynamic";

const SvgIcon = dynamic(() => import("../../components/utils/SvgIcon"), {
  ssr: false,
});

const Social = dynamic(() => import("../../components/Social"));

export default function ContactInfo() {
  return (
    <div className="contact-info-holder">
      <h2 className="contact-title">Contact us</h2>

      <div className="contact-items">
        <div className={`icon-holder`}>
          <div className="icon">
            <SvgIcon icon={icons["map-pin"].toSvg()} />
          </div>
        </div>
        <Col xs="10">
          <p>
            #191/420, Big Sourashtra Street, Sathyamurthy Road, Arni 632301,
            Tamil Nadu, India
          </p>
        </Col>
      </div>
      <div className="contact-items">
        <div className={`icon-holder`}>
          <div className="icon">
            <SvgIcon icon={icons["mail"].toSvg()} />
          </div>
        </div>
        <Col xs="10">
          <p>care@pashudh.com</p>
        </Col>
      </div>
      <div className="contact-items">
        <div className={`icon-holder`}>
          <div className="icon">
            <SvgIcon icon={icons["phone"].toSvg()} />
          </div>
        </div>
        <Col xs="10">
          <p>+91 90033 95998</p>
        </Col>
      </div>
      <div className={`social-wrapper`}>
        <Social />
      </div>
    </div>
  );
}
