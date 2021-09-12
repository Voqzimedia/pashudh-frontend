import React, { useState, useContext } from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import AppContext from "../../context/AppContext";
import { registerUser } from "../../helper/auth";
import { Alert } from "reactstrap";

import { icons } from "feather-icons";

import SvgIcon from "../../components/utils/SvgIcon";

export const PasswordEl = ({ name, onChange, id, required }) => {
  const [isShow, setShow] = useState(false);

  return (
    <div className="password-holder">
      <input
        type={isShow ? "text" : "password"}
        name={name}
        id={id}
        required={required}
        onChange={(event) => onChange(event)}
      />
      <div className={`icon`} onClick={() => setShow(!isShow)}>
        {isShow ? (
          <SvgIcon icon={icons[`eye-off`].toSvg()} />
        ) : (
          <SvgIcon icon={icons[`eye`].toSvg()} />
        )}
      </div>
    </div>
  );
};

export default function SignupForm() {
  const [data, updateData] = useState({
    email: "",
    username: "",
    password: "",
    ConfirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setUser, modalSignup, setModalSignup, setModalLogin } =
    useContext(AppContext);

  // const [phoneNumber, setPhoneNumber] = useState();

  const onDismiss = () => setError(false);

  const toggleSignup = () => {
    modalSignup ? setModalSignup(false) : setModalSignup(true);
  };

  const toggleLogin = () => {
    setModalSignup(false);
    setModalLogin(true);
  };

  const onChange = (event) => {
    updateData({ ...data, [event.target.name]: event.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    data.ConfirmPassword == data.password
      ? registerUser(
          data.username,
          data.email,
          data.ConfirmPassword,
          data.phone
        )
          .then((res) => {
            // set authed user in global context object
            setUser(res.data.user);
            setLoading(false);
            toggleSignup();
          })
          .catch((error) => {
            error?.response?.data ? setError(error.response.data) : null;
            setLoading(false);
          })
      : () => {
          setLoading(false);
          setError({
            message: [
              {
                messages: [
                  {
                    id: "Form.error.invalid",
                    message: "Confirm Password not match",
                  },
                ],
              },
            ],
          });
        };
  };

  return (
    <div className={`from-container`}>
      <div className="form-body login-form">
        <form onSubmit={formSubmit}>
          <fieldset disabled={loading}>
            <div className="input-Holder">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="username"
                id="name"
                required
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="input-Holder">
              {/* <label htmlFor="phone">Phone number</label> */}
              <PhoneInput
                placeholder="Enter phone number"
                country="IND"
                value={data.phone}
                onChange={(value) => updateData({ ...data, phone: value })}
              />
            </div>
            <div className="input-Holder">
              <label htmlFor="email">Enter Email / User name</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="input-Holder">
              <label htmlFor="password"> Password</label>
              <PasswordEl
                name="password"
                id="password"
                required
                onChange={onChange}
              />
            </div>
            <div className="input-Holder">
              <label htmlFor="Confirm_password">Confirm Password</label>
              <PasswordEl
                name="ConfirmPassword"
                id="Confirm_password"
                required
                onChange={onChange}
              />
            </div>

            <p>
              By continuing, you agree to Pashudh's <b>Terms of use</b> and{" "}
              <b>Privacy Policy</b>.
            </p>

            <p>
              I already have a account{" "}
              <b>
                <a style={{ cursor: "pointer" }} onClick={toggleLogin}>
                  Login
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
                <button type="submit" className={`btn shop-now`}>
                  {loading ? "Loading" : "Signup"}
                </button>
              </center>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
