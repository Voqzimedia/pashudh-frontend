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
  );
}
