import React from "react";
import { Container, Row, Col } from "reactstrap";

import dynamic from "next/dynamic";

import ContactInfo from "../components/Contact/ContactInfo";

const ContactForm = dynamic(() => import("../components/Contact/ContactForm"));

export default function Contact() {
  const pageTitle = "Contact";

  return (
    <>
      <section className={`contact-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
          <Row className={`contact-container`}>
            <Col lg="5">
              <ContactInfo />
            </Col>
            <Col lg="7">
              <ContactForm />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
