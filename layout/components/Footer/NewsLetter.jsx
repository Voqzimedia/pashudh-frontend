import React from "react";
import { Button, Container } from "reactstrap";

export default function NewsLetter() {
  return (
    <section className="newsletter alter-bg">
      <Container>
        <div className="subscription-block">
          <form action="#" className="subscription-form">
            <h2 className="section-title">Sign up for newsletter</h2>
            <input type="email" name="email" placeholder={`Enter Email...`} />
            <Button type="submit" className={`subscribe`}>
              Subscribe
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
