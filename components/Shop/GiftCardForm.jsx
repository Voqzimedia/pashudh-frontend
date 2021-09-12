import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  promoRazorpayConfirm,
  promoConfirm,
  promoCheckout,
} from "../../helper/auth";
import { PromoItem } from "../../components/Shop/OrderList";
import { getCode } from "country-list";
import AppContext from "../../context/AppContext";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import stripeLogo from "../../assets/images/logo-stripe.png";
import razorpayLogo from "../../assets/images/logo-razorpay.png";

export const paymentGatewayList = [
  {
    name: "Stripe",
    img: stripeLogo,
  },
  {
    name: "Razorpay",
    img: razorpayLogo,
  },
];

export default function GiftCardForm({ giftCard }) {
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
    saveMe: "off",
    paymentGateway: null,
  });

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [order, setOrder] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const onChange = (event) => {
    updateData({ ...data, [event.target.name]: event.target.value });
  };

  const confirmPayment = async (clientSecret) => {
    setProcessing(true);

    // const checkoutData = checkOutDataFormater(data, cart);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: data.City,
            country: getCode(data.country),
            line1: data.Address,
            postal_code: data.PINcode,
            state: data.region,
          },
          email: data.Email,
          name: `${data.FirstName} ${data.LastName}`,
          phone: data.Phone,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      promoConfirm(payload.paymentIntent.id)
        .then((res) => {
          setOrder(res.data);
          setError(null);
          setProcessing(false);
          setSucceeded(true);
        })
        .catch((error) => {
          setError(error?.response?.data);
          setProcessing(false);
        });
    }
  };

  const displayRazorpay = (orderData) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      currency: orderData.currency,
      amount: orderData.amount.toString(),
      order_id: orderData.id,
      name: "Pashuth",
      description: "Thank you for nothing. Please give us some money",
      handler: function (response) {
        // console.log(response);

        promoRazorpayConfirm(response)
          .then((res) => {
            // console.log(res);

            setOrder(res.data);
            setError(null);
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

    // console.log({ data, giftCard });

    // const checkoutData = checkOutDataFormater(data, cart);

    promoCheckout({
      giftcard: giftCard.slug,
      emailTo: data.Email,
      paymentGateway: data.paymentGateway,
    })
      .then((res) => {
        // console.log(res);
        setProcessing(false);
        // set authed User in global context to update header/app state
        // setClientSecret(() => res.data.client_secret);
        if (data.paymentGateway?.name == "Stripe") {
          res?.data?.client_secret
            ? confirmPayment(res?.data?.client_secret)
            : null;
          setPaymentRequest(res?.data);
        } else {
          res?.data?.order ? displayRazorpay(res?.data?.order) : null;
        }
      })
      .catch((error) => {
        setError(error?.response?.data);
        setProcessing(false);
      });
  };

  // console.log(order);

  const cardStyle = {
    hidePostalCode: true,
    style: {
      base: {
        color: "#212529",
        fontFamily: "Arial, Poppins",
        fontSmoothing: "antialiased",
        padding: "5",
        lineHeight: "40px",
        fontSize: "1rem",
        "::placeholder": {
          color: "#212529",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <fieldset disabled={processing || !giftCard || succeeded}>
      <form onSubmit={formSubmit}>
        <div className="contact-info">
          <div className={`from-container`}>
            <div className="form-header">
              <h2 className="form-title">Send Promo to :</h2>
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
                    required
                    onChange={(event) => onChange(event)}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className={`from-container`}>
          <div className="form-header">
            <h2 className="form-title">Billing address :</h2>
          </div>
          <div className="form-body">
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
                      onChange={(val) => updateData({ ...data, country: val })}
                      required
                    />
                  </Col>
                  <Col lg="4" className="input-Holder">
                    <RegionDropdown
                      country={data.country}
                      value={data.region}
                      onChange={(val) => updateData({ ...data, region: val })}
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
                  onChange={(value) => updateData({ ...data, Phone: value })}
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
                <Row className="align-center justify-center">
                  {paymentGatewayList.map((payment_Gateway, index) => {
                    var isActive =
                      payment_Gateway?.name == data.paymentGateway?.name;
                    return (
                      <Col
                        lg="6"
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
                          <div className="img-holder">
                            <img src={payment_Gateway.img} alt="Stripe" />
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              {data.paymentGateway?.name == "Stripe" && (
                <Col lg="8" className="input-Holder stripe-card">
                  <CardElement
                    id="card-element"
                    options={cardStyle}
                    onChange={handleChange}
                  />
                </Col>
              )}
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
            </div>

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
                  <PromoItem promo={order} />
                </Col>
              </Row>
            )}
          </div>
        </div>
      </form>
    </fieldset>
  );
}
