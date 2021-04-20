import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

export default function Social({ className }) {
  return (
    <div className={`social ${className ? className : ""}`}>
      <a href="#" title={`Facebook`} className="icon">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="#" className="icon">
        <FontAwesomeIcon title={`Instagram`} icon={faInstagram} />
      </a>
      <a href="#" title={`Twitter`} className="icon">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="#" title={`Pinterest`} className="icon">
        <FontAwesomeIcon icon={faPinterest} />
      </a>
    </div>
  );
}
