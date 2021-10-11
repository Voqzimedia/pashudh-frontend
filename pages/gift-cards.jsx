import { useState, useContext, useMemo } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

import { currency, imgUrlCheck } from "../helper/functions";

import AppContext from "../context/AppContext";
import { icons } from "feather-icons";

import client from "../helper/ApolloClient";
import Sticky from "react-stickynode";

import dynamic from "next/dynamic";
import SvgIcon from "../components/utils/SvgIcon";

import giftCardImg from "../assets/images/giftCard.png";
import Accordion, { AccordionItem } from "../components/utils/accordion";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));
const Logo = dynamic(() => import("../components/Logo"));

const giftCardsList = [5000, 10000, 20000];

export default function GiftCards() {
  const pageTitle = "Pashudh Gift Cards";

  const [selectedGiftCard, setSelectedGiftCard] = useState(giftCardsList[0]);

  // console.log(giftCards);

  const [isLoading, setIsLoading] = useState(false);

  const { deviceWidth, giftCard, addGiftCard } = useContext(AppContext);

  const isMobile = deviceWidth < 800;

  // console.log(giftCard);

  useMemo(() => {
    addGiftCard(selectedGiftCard);
  }, [selectedGiftCard]);

  const onGiftCardSelect = (event) => {
    setIsLoading(true);
    setSelectedGiftCard(event.target.value);
    setIsLoading(false);
  };

  function validate(event) {
    event.target.value = valBetween(
      event.target.value,
      event.target.min,
      event.target.max
    );
  }

  function valBetween(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  return (
    <PageMotion>
      <section className={`gift-card-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
          <Row className={`gift-card-container invers-mobile`}>
            <Col lg="6" className="gift-card-left">
              <div className="form-body">
                <h4 className="section-title content-title">
                  Select your Gift Card Amount
                </h4>
                <div className="input-Holder">
                  <label htmlFor="gift-card">
                    Select your Gift Card Amount
                  </label>
                  <select
                    name="gift-card"
                    id="gift-card"
                    value={selectedGiftCard?.id}
                    onChange={onGiftCardSelect}
                  >
                    {giftCardsList?.map((giftCard, index) => (
                      <option value={giftCard} key={index}>
                        {currency.format(giftCard)}
                      </option>
                    ))}
                  </select>
                </div>

                <center>
                  <p>Or</p>
                </center>

                <h4 className="section-title content-title">
                  Enter your Gift Card Amount
                </h4>
                <div className="input-Holder">
                  <label htmlFor="gift-card-txt">
                    Enter your Gift Card Amount
                  </label>
                  <input
                    type="number"
                    name="gift-card"
                    id="gift-card-txt"
                    onChange={onGiftCardSelect}
                    min="0"
                    max="80000"
                    onKeyUp={validate}
                  />
                </div>
                <div className="input-Holder">
                  {giftCard?.total > 4000 ? (
                    <Link href={`/shop/checkout-giftcard`}>
                      <a className="btn submit-btn">Checkout</a>
                    </Link>
                  ) : (
                    <button className="btn submit-btn" disabled={true}>
                      Checkout
                    </button>
                  )}
                </div>

                <br />
                <div className="content-holder">
                  <p>
                    Smart and sophisticated, Pashudh Gift Cards are the perfect
                    present to give your loved ones so they can choose from our
                    wide range of offerings!
                  </p>
                  <p>
                    Delivered via e-mail and redeemable on our website, Pashudh
                    Gift Cards have set denominations of the amount you can send
                    to recipients. The cards have an electronic link that can be
                    applied during checkout on our online store. This feature
                    does not render any additional processing fees for your
                    loved ones.
                  </p>
                </div>
                <br />
                <div className="gift-content-holder">
                  <Accordion atomic={true}>
                    <AccordionItem title={`Ordering Pashudh Gift Cards`}>
                      <div className="gift-content">
                        <article className="content-holder">
                          <p>
                            Go to our Pashudh Gift Cards page, select your
                            preferred Gift Card denomination, type the e-mail id
                            of the recipient you want to gift the card to, and
                            add it to your cart.
                          </p>
                          <p>
                            Once you have finished proceed to the checkout page.
                          </p>
                          <p>
                            On our checkout page, make sure you cross-check the
                            denomination and e-mail id of the recipient before
                            proceeding to payment.
                          </p>
                        </article>
                      </div>
                    </AccordionItem>
                    <AccordionItem title={`Redeeming the Pashudh Gift Cards`}>
                      <div className="support-item">
                        <article className="support-content">
                          <p>
                            A surprise awaits in your mailbox! You’ve received
                            an e-mail from Pashudh and you open it to see that
                            your loved one has sent you a Pashudh Gift Card!
                          </p>
                          <p>
                            Click on the ‘Copy’ button displayed below the
                            Pashudh Gift Cards in your e-mail. This will ensure
                            that the code with the intended denomination is
                            copied to your device and can further be redeemed on
                            our website.
                          </p>
                          <p>
                            In case you had opted to send the Pashudh Gift Cards
                            to your own e-mail id, and then wish to forward the
                            code to your loved ones, the same process can be
                            followed. Kindly ensure that you share the code with
                            the right person because Pashudh will not be
                            responsible for any such errors.
                          </p>
                          <p>
                            Once you copy the code, head to our website, shop to
                            your heart’s content, and once you are over the moon
                            with the products in your cart, paste the code in
                            the “Gift Card Code” box at checkout.
                          </p>
                          <p>
                            Voila! The value of the Gift Card will be assigned
                            to your checkout amount.
                          </p>
                        </article>
                      </div>
                    </AccordionItem>
                    <AccordionItem title={`Terms & Conditions`}>
                      <div className="gift-content">
                        <article className="content-holder">
                          <p>
                            A few points to note when opting for Pashudh Gift
                            Cards -
                          </p>
                          <p>
                            The Pashudh Gift Cards are paperless and viable only
                            for online transactions through our website. There
                            will be no processing charges while redeeming the
                            value of the Pashudh Gift Cards. Those receiving our
                            e-mail containing the Gift Cards can redeem it
                            online, but not in any physical stores or
                            exhibitions (in the future).
                          </p>
                          <p>
                            Pashudh Gift Cards, once allocated, cannot be
                            transferred to anyone else.
                          </p>
                          <p>
                            Please ensure that correct details are entered while
                            purchasing and delegating the Pashudh Gift Cards.
                            Cross-check the amount, and e-mail id of the
                            recipient/s before the final checkout.
                          </p>
                          <p>
                            The validity of our Gift Cards will last for a
                            period of 1 year from the date of issue.
                          </p>
                          <p>
                            The value of the Gift Cards cannot be exchanged for
                            cash.
                          </p>
                        </article>
                      </div>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </Col>
            <Col lg="6" className="gift-card-right">
              <Sticky bottomBoundary=".end-stick" enabled={!isMobile}>
                <div className="gift-card-img">
                  <div className="image-holder">
                    <picture>
                      <img src={giftCardImg} alt="gift" />
                    </picture>
                  </div>
                  <div className="price-holder">
                    {giftCard?.total > 0
                      ? currency.format(giftCard?.total)
                      : ""}
                  </div>
                </div>
              </Sticky>
            </Col>
          </Row>
        </Container>
      </section>
    </PageMotion>
  );
}
