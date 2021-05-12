import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { login } from "../../helper/auth";
import { Alert } from "reactstrap";

export default function LoginForm() {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { setUser, setModalLogin, modalLogin, setModalSignup } =
    useContext(AppContext);

  const toggleLogin = () => {
    modalLogin ? setModalLogin(false) : setModalLogin(true);
  };

  const toggleSignup = () => {
    setModalSignup(true);
    setModalLogin(false);
  };

  const onDismiss = () => setError(false);

  const onChange = (event) => {
    updateData({ ...data, [event.target.name]: event.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    login(data.identifier, data.password)
      .then((res) => {
        setLoading(false);
        // set authed User in global context to update header/app state
        setUser(res.data.user);
        toggleLogin();
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className={`from-container`}>
      <div className="form-body login-form">
        <form onSubmit={formSubmit}>
          <div className="input-Holder">
            <label htmlFor="email">Enter Email / User name</label>
            <input
              type="email"
              name="identifier"
              id="email"
              required
              onChange={(event) => onChange(event)}
            />
          </div>
          <div className="input-Holder">
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={(event) => onChange(event)}
            />
          </div>

          <p>
            By continuing, you agree to Pashudh's <b>Terms of use</b> and{" "}
            <b>Privacy Policy</b>.
          </p>

          <p>
            I don't have an account{" "}
            <b>
              <a style={{ cursor: "pointer" }} onClick={toggleSignup}>
                Signup
              </a>
            </b>
          </p>

          <Alert color="danger" isOpen={error} toggle={onDismiss}>
            {Object.entries(error).length !== 0 &&
              error.constructor === Object &&
              error.message.map((error) => {
                return (
                  <p style={{ margin: "5px" }} key={error.messages[0].id}>
                    {error.messages[0].message}
                  </p>
                );
              })}
          </Alert>

          <div className="input-Holder">
            <center>
              {loading ? (
                <button disabled className={`btn submit-btn`}>
                  Loading
                </button>
              ) : (
                <button type="submit" className={`btn submit-btn`}>
                  Login
                </button>
              )}
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}
