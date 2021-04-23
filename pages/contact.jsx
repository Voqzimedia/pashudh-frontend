import React from "react";
import { Container, Row, Col } from "reactstrap";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));

const ContactInfo = dynamic(() => import("../components/Contact/ContactInfo"));
const ContactForm = dynamic(() => import("../components/Contact/ContactForm"));

export default function Contact() {
  const pageTitle = "Contact";

  return (
    <PageMotion>
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
    </PageMotion>
  );
}
