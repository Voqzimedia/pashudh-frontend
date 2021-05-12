import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { checkOutDataFormater } from "../../helper/functions";
import { promoCheckout, promoConfirm } from "../../helper/auth";
import { PromoItem } from "./OrderList";
import { getCode } from "country-list";

export default function GiftCardForm({ giftCard }) {
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
          setError(null);
          setProcessing(false);
          setSucceeded(true);
          setOrder(res.data);
        })
        .catch((error) => {
          setError(error.response.data);
          setProcessing(false);
        });
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);

    // console.log({ data, giftCard });

    // const checkoutData = checkOutDataFormater(data, cart);

    promoCheckout({ giftcard: giftCard.slug, emailTo: data.Email })
      .then((res) => {
        setProcessing(false);
        // set authed User in global context to update header/app state
        // setClientSecret(() => res.data.client_secret);
        confirmPayment(res.data.client_secret);
      })
      .catch((error) => {
        setError(error.response.data);
        setProcessing(false);
      });
  };

  console.log(order);

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
                />
              </Col>
              <Col lg="8">
                <Row>
                  <Col lg="4" className="input-Holder">
                    <CountryDropdown
                      value={data.country}
                      onChange={(val) => updateData({ ...data, country: val })}
                    />
                  </Col>
                  <Col lg="4" className="input-Holder">
                    <RegionDropdown
                      country={data.country}
                      value={data.region}
                      onChange={(val) => updateData({ ...data, region: val })}
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
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg="8" className="input-Holder">
                <label htmlFor="Phone"> Phone</label>
                <input
                  type="number"
                  name="Phone"
                  id="Phone"
                  placeholder={`Phone`}
                  onChange={(event) => onChange(event)}
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

              <Col lg="8" className="input-Holder stripe-card">
                <CardElement
                  id="card-element"
                  options={cardStyle}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            {/* Show any error that happens when processing the payment */}
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}

            <div className="input-Holder">
              <button type="submit" className={`btn submit-btn`}>
                Continue to shipping
              </button>
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
