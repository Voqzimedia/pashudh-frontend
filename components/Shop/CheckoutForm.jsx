import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

export default function CheckoutForm() {
  const [country, selectCountry] = useState("");
  const [region, selectRegion] = useState("");

  return (
    <>
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
                />
              </Col>

              <Col lg="8" className="input-Holder lable-on">
                <label htmlFor="keepMe" className={`flex-align-center`}>
                  <input type="checkbox" name={`keepMe`} id={`keepMe`} /> Keep
                  me up to date on news and exclusive offers
                </label>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className={`from-container`}>
        <div className="form-header">
          <h2 className="form-title">Shipping address</h2>
        </div>
        <div className="form-body">
          <form action="">
            <Row>
              <Col lg="4" className="input-Holder">
                <label htmlFor="Firstname"> First name</label>
                <input
                  type="text"
                  name="FirstName"
                  id="Firstname"
                  placeholder={`First name`}
                />
              </Col>
              <Col lg="4" className="input-Holder">
                <label htmlFor="Lastname"> Last name</label>
                <input
                  type="text"
                  name="LastName"
                  id="Lastname"
                  placeholder={`Last name`}
                />
              </Col>
              <Col lg="8" className="input-Holder">
                <label htmlFor="Address"> Address</label>
                <input
                  type="text"
                  name="Address"
                  id="Address"
                  placeholder={`Address`}
                />
              </Col>
              <Col lg="8" className="input-Holder">
                <label htmlFor="City"> City</label>
                <input type="text" name="City" id="City" placeholder={`City`} />
              </Col>
              <Col lg="8">
                <Row>
                  <Col lg="4" className="input-Holder">
                    <CountryDropdown
                      value={country}
                      onChange={(val) => selectCountry(val)}
                    />
                  </Col>
                  <Col lg="4" className="input-Holder">
                    <RegionDropdown
                      country={country}
                      value={region}
                      onChange={(val) => selectRegion(val)}
                    />
                  </Col>
                  <Col lg="4" className="input-Holder">
                    <label htmlFor="PINcode"> PINcode</label>
                    <input
                      type="text"
                      name="PINcode"
                      id="PINcode"
                      placeholder={`PIN code`}
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
                />
              </Col>

              <Col lg="8" className="input-Holder lable-on">
                <label htmlFor="saveMe" className={`flex-align-center`}>
                  <input type="checkbox" name={`saveMe`} id={`saveMe`} /> Save
                  this information for next time
                </label>
              </Col>
            </Row>

            <div className="input-Holder">
              <button type="submit" className={`btn submit-btn`}>
                Continue to shipping
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
