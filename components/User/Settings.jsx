import { Alert } from "reactstrap";
import { useState, useContext } from "react";
import { login, changePassword } from "../../helper/auth";
import AppContext from "../../context/AppContext";

export default function Settings({ toggleSettings }) {
  const [data, updateData] = useState({
    password: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const { user, setUser } = useContext(AppContext);

  const onDismiss = () => setError(false);

  // console.log(user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (event) => {
    updateData({ ...data, [event.target.name]: event.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    // toggleSettings();

    setLoading(true);

    if (data.ConfirmPassword == data.NewPassword) {
      login(user.email, data.password)
        .then((res) => {
          // set authed User in global context to update header/app state
          passwordChanger(res.data.user.id, data.ConfirmPassword);
        })
        .catch(() => {
          setError({
            message: [
              {
                messages: [
                  {
                    id: "Auth.error.invalid",
                    message: "Old Password is wrong",
                  },
                ],
              },
            ],
          });
          setLoading(false);
        });
    } else {
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
    }

    // console.log(data);
  };

  const passwordChanger = (id, password) => {
    changePassword(id, password)
      .then((res) => {
        setLoading(false);
        setUser(res.data.user);
        toggleSettings();
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className={`from-container`}>
      <div className="form-header">
        <center>
          <h2 className="form-title">Change Password</h2>
        </center>
      </div>
      <div className="form-body login-form">
        <form onSubmit={formSubmit}>
          <fieldset disabled={loading}>
            <div className="input-Holder">
              <label htmlFor="password">Old Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="input-Holder">
              <label htmlFor="new_password">New Password</label>
              <input
                type="password"
                name="NewPassword"
                required
                id="new_password"
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="input-Holder">
              <label htmlFor="Confirm_password">Confirm Password</label>
              <input
                type="password"
                name="ConfirmPassword"
                required
                id="Confirm_password"
                onChange={(event) => onChange(event)}
              />
            </div>

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
                <button type="submit" className={`btn submit-btn`}>
                  {loading ? "Loading" : "Update"}
                </button>
              </center>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
