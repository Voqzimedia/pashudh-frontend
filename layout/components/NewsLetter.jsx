import React from "react";

export default function NewsLetter() {
  return (
    <section className="newsletter alter-bg">
      <div className="container">
        <div className="subscription-block">
          <form action="#" className="subscription-form">
            <h2 className="section-title">Sign up for newsletter</h2>
            <input type="email" name="email" placeholder={`Enter Email...`} />
            <button type="submit" className={`subscribe btn`}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
