import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { checkOutDataFormater } from "../../helper/functions";
import {
  productCheckout,
  paymentConfirm,
  razorpayConfirm,
} from "../../helper/auth";
import { OrderItem } from "../../components/Shop/OrderList";
import { getCode } from "country-list";
import AppContext from "../../context/AppContext";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

// import stripeLogo from "../../assets/images/logo-stripe.png";
import razorpayLogo from "../../assets/images/payment.svg";

export const paymentGatewayList = [
  {
    name: "Razorpay",
    img: razorpayLogo,
  },
];

export default function CheckoutForm({
  cart,
  clearCart,
  discount,
  useRedeemPoints,
}) {
  const { user, setModalLogin } = useContext(AppContext);

  const [data, updateData] = useState({
    Email: "",
    FirstName: "",
    LastName: "",
    PINcode: "",
    Address: "",
    City: "",
    country: "",
    region: "",
    Phone: "",
    keepMe: "off",
    saveMe: "off",
    discount: discount,
    useRedeemPoints: useRedeemPoints,
    paymentGateway: paymentGatewayList[0],
  });

  useEffect(() => {
    updateData({ ...data, discount: discount });
    return () => {
      updateData({ ...data, discount: null });
    };
  }, [discount]);

  useEffect(() => {
    updateData({ ...data, useRedeemPoints: useRedeemPoints });
    return () => {
      updateData({ ...data, useRedeemPoints: false });
    };
  }, [useRedeemPoints]);

  // console.log(data);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");

  const [order, setOrder] = useState(null);

  const onChange = (event) => {
    updateData({ ...data, [event.target.name]: event.target.value });
  };

  const displayRazorpay = (orderData) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      currency: orderData.currency,
      amount: orderData.amount.toString(),
      order_id: orderData.id,
      name: "Pashudh",
      description: "Thank you for nothing. Please give us some money",
      handler: function (response) {
        // console.log(response);

        razorpayConfirm(response, discount, useRedeemPoints)
          .then((res) => {
            // console.log(res);

            setOrder(res.data);
            setError(null);
            clearCart();
            setSucceeded(true);
            setProcessing(false);
          })
          .catch((error) => {
            setError(error.response.data);
            setProcessing(false);
          });
      },
      modal: {
        ondismiss: function () {
          setProcessing(() => false);
        },
      },
      prefill: {
        email: data.Email,
        contact: data.Phone,
      },
      theme: {
        color: "#e4003f",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    return paymentObject;
  };

  const formSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);

    const checkoutData = checkOutDataFormater(data, cart);

    // console.log(checkoutData);

    productCheckout(checkoutData)
      .then((res) => {
        setProcessing(false);
        // set authed User in global context to update header/app state
        // setClientSecret(() => res.data.client_secret);

        if (data.paymentGateway?.name == "Razorpay") {
          res?.data?.order ? displayRazorpay(res?.data?.order) : null;
        } else {
          console.log("COD");
        }

        // console.log(res);
      })
      .catch((error) => {
        setError(error?.response?.data);
        // console.log(error);
        setProcessing(false);
      });
  };

  return (
    <fieldset disabled={processing || cart.items.length < 1 || succeeded}>
      <form onSubmit={formSubmit}>
        <div className="contact-info">
          <div className={`from-container`}>
            <div className="form-header">
              <h2 className="form-title">Contact information</h2>
            </div>
            <div className="form-body">
              <Row>
                <Col lg="8" className="input-Holder">
                  <label htmlFor="Email"> Email</label>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    placeholder={`Email`}
                    onChange={(event) => onChange(event)}
                    required
                  />
                </Col>

                <Col lg="8" className="input-Holder lable-on">
                  <label htmlFor="keepMe" className={`flex-align-center`}>
                    <input
                      type="checkbox"
                      name={`keepMe`}
                      onChange={(event) => onChange(event)}
                      id={`keepMe`}
                    />{" "}
                    Keep me up to date on news and exclusive offers
                  </label>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className={`from-container`}>
          <div className="form-header">
            <h2 className="form-title">
              {order ? "Order Details" : "Shipping address"}
            </h2>
          </div>
          <div className="form-body">
            {!order && (
              <>
                <Row>
                  <Col lg="4" className="input-Holder">
                    <label htmlFor="Firstname"> First name</label>
                    <input
                      type="text"
                      name="FirstName"
                      id="Firstname"
                      placeholder={`First name`}
                      onChange={(event) => onChange(event)}
                      required
                    />
                  </Col>
                  <Col lg="4" className="input-Holder">
                    <label htmlFor="Lastname"> Last name</label>
                    <input
                      type="text"
                      name="LastName"
                      id="Lastname"
                      placeholder={`Last name`}
                      onChange={(event) => onChange(event)}
                    />
                  </Col>
                  <Col lg="8" className="input-Holder">
                    <label htmlFor="Address"> Address</label>
                    <input
                      type="text"
                      name="Address"
                      id="Address"
                      placeholder={`Address`}
                      onChange={(event) => onChange(event)}
                      required
                    />
                  </Col>
                  <Col lg="8" className="input-Holder">
                    <label htmlFor="City"> City</label>
                    <input
                      type="text"
                      name="City"
                      id="City"
                      placeholder={`City`}
                      onChange={(event) => onChange(event)}
                      required
                    />
                  </Col>
                  <Col lg="8">
                    <Row>
                      <Col lg="4" className="input-Holder">
                        <CountryDropdown
                          value={data.country}
                          onChange={(val) =>
                            updateData({ ...data, country: val })
                          }
                          required
                        />
                      </Col>
                      <Col lg="4" className="input-Holder">
                        <RegionDropdown
                          country={data.country}
                          value={data.region}
                          onChange={(val) =>
                            updateData({ ...data, region: val })
                          }
                          required
                        />
                      </Col>
                      <Col lg="4" className="input-Holder">
                        <label htmlFor="PINcode"> PINcode</label>
                        <input
                          type="text"
                          name="PINcode"
                          id="PINcode"
                          placeholder={`PIN code`}
                          onChange={(event) => onChange(event)}
                          required
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col lg="8" className="input-Holder">
                    <label htmlFor="Phone"> Phone</label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      country="IND"
                      value={data.Phone}
                      onChange={(value) =>
                        updateData({ ...data, Phone: value })
                      }
                    />
                  </Col>

                  <Col lg="8" className="input-Holder lable-on">
                    <label htmlFor="saveMe" className={`flex-align-center`}>
                      <input
                        type="checkbox"
                        name={`saveMe`}
                        onChange={(event) => onChange(event)}
                        id={`saveMe`}
                      />{" "}
                      Save this information for next time
                    </label>
                  </Col>
                  <Col lg="8" className="input-Holder lable-on">
                    <Row className="align-center">
                      {paymentGatewayList.map((payment_Gateway, index) => {
                        var isActive =
                          payment_Gateway?.name == data.paymentGateway?.name;
                        return (
                          <Col
                            lg="12"
                            key={index}
                            onClick={() =>
                              updateData({
                                ...data,
                                paymentGateway: payment_Gateway,
                              })
                            }
                          >
                            <div
                              className={`payment-gateway ${
                                isActive ? "active" : ""
                              }`}
                            >
                              <p className="content-holder">
                                Pay securely by Credit or Debit card or Internet
                                Banking through Razorpay.
                              </p>
                              <div className="img-holder">
                                <img src={payment_Gateway.img} alt="Stripe" />
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                </Row>

                {/* Show any error that happens when processing the payment */}
                {error && (
                  <div className="card-error" role="alert">
                    {error}
                  </div>
                )}

                <div className="input-Holder">
                  {user ? (
                    <button
                      type="submit"
                      className={`btn submit-btn`}
                      disabled={data.paymentGateway ? false : true}
                    >
                      {data.paymentGateway?.name == "Stripe"
                        ? "Complete Payment"
                        : "Proceed to Pay"}
                    </button>
                  ) : (
                    <a
                      style={{ cursor: "pointer" }}
                      className={`btn submit-btn`}
                      onClick={() => setModalLogin(true)}
                    >
                      Login / Signup to Continue
                    </a>
                  )}

                  {!user && (
                    <button
                      type="submit"
                      className={`btn submit-btn`}
                      disabled={data.paymentGateway ? false : true}
                    >
                      Complete as a Guest
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Show a success message upon completion */}
            {succeeded && order && (
              <Row className="order-waraper">
                <Col
                  lg="8"
                  className="order-list"
                  style={{
                    minHeight: "auto",
                  }}
                >
                  <OrderItem order={order} />
                </Col>
              </Row>
            )}
          </div>
        </div>
      </form>
    </fieldset>
  );
}
