import React from "react";

export default function ContactForm() {
  return (
    <div className={`from-container`}>
      <div className="form-header">
        <h2 className="form-title">Get in touch</h2>
        <p className="form-content">Feel free to drop us a message below</p>
      </div>
      <div className="form-body">
        <form action="">
          <div className="input-Holder">
            <label htmlFor="name"> Full name</label>
            <input
              type="text"
              name="Name"
              id="name"
              placeholder={`Full name`}
            />
          </div>
          <div className="input-Holder">
            <label htmlFor="email">Email</label>
            <input type="email" name="Email" id="email" placeholder={`Email`} />
          </div>
          <div className="input-Holder">
            <label htmlFor="message">Message</label>
            <textarea
              name="Message"
              id="message"
              cols="30"
              rows="5"
              placeholder={`Message`}
            ></textarea>
          </div>

          <div className="input-Holder">
            <button type="submit" className={`btn submit-btn`}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
