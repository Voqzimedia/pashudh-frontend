import React from "react";

export default function SignupForm() {
  return (
    <div className={`from-container`}>
      {/* <div className="form-header">
        <h2 className="form-title">Get in touch</h2>
        <p className="form-content">Feel free to drop us a message below</p>
      </div> */}
      <div className="form-body login-form">
        <form action="">
          <div className="input-Holder">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="Name" id="name" />
          </div>
          <div className="input-Holder">
            <label htmlFor="email">Enter Email / User name</label>
            <input type="email" name="Email" id="email" />
          </div>
          <div className="input-Holder">
            <label htmlFor="password"> Password</label>
            <input type="password" name="Password" id="password" />
          </div>
          <div className="input-Holder">
            <label htmlFor="Confirm_password">Confirm Password</label>
            <input
              type="password"
              name="ConfirmPassword"
              id="Confirm_password"
            />
          </div>

          <p>
            By continuing, you agree to Pashudh's <b>Terms of use</b> and{" "}
            <b>Privacy Policy</b>.
          </p>

          <div className="input-Holder">
            <center>
              <button type="submit" className={`btn submit-btn`}>
                Signup
              </button>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}
