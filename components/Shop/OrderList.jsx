import { useContext, useState, useEffect } from "react";
import { Row, Col, Alert } from "reactstrap";
import AppContext from "../../context/AppContext";
import { currency, sortByProperty } from "../../helper/functions";
import { getOrders } from "../../helper/auth";

// images

import productImg from "../../assets/images/products/prod1.jpg?webp";

export const OrderItem = ({ order }) => {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => {
    isShow ? setShow(false) : setShow(true);
  };

  console.log(order);

  return (
    <div className="order-item">
      <Row className="order-header">
        <Col xs="8">
          <h6 className="order-id">
            Order Id <span>#{order.id}</span>
          </h6>
        </Col>
        <Col xs="4">
          <Alert color="success" className={`order-status`}>
            {order.status}
          </Alert>
        </Col>
      </Row>

      <Row className={`cart-item`}>
        {order.Cart.map((item, index) => (
          <Col md="5">
            <div className="product-holder">
              <div className="product-details">
                <div className="name">{item.product.name}</div>
                <p className="quantity">{item.quantity}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="order-bottom">
        <Col md="8">
          <p className="price">
            Total : <span>{currency.format(order.total)}</span>
          </p>
        </Col>

        <Col md="4">
          <a className="show-more" onClick={toggleShow}>
            {isShow ? "View less" : "View Details"}
          </a>
        </Col>
      </Row>

      {isShow && (
        <div className="order-details-more">
          <div className={`transaction-details`}>
            <p className="payment">
              Payment Method :{" "}
              <span>
                {order?.paymentGateway
                  ? order?.paymentGateway
                  : "Credit cards or Debit cards"}
              </span>
            </p>
            <p className="transaction-id">
              Transaction ID # : <span>{order.transactionId}</span>
            </p>
            <br />
            <p className="transaction-id">
              Shipping address : <span>{order.address}</span>
            </p>
          </div>

          {order.promo && (
            <div className="tracking-details">
              <h6>Discount Details</h6>
              <p className="tracking-name">
                Promo Code Used: <span>{order.promo.promoCode}</span>
              </p>
              <p className="price">
                Discounted Amount:{" "}
                <span>{currency.format(order.promo.promoPrice)}</span>
              </p>
            </div>
          )}

          {order.Shipping && (
            <div className="tracking-details">
              <h6>Tracking Details</h6>
              <p className="tracking-name">
                Couriers Service: <span>{order.Shipping.shippingProvider}</span>
              </p>
              <p className="tracking-id">
                Tracking ID #: <span>{order.Shipping.trackingCode}</span>
              </p>
              <p className="tracking-msg">
                Tracking info: <span>{order.Shipping.shippingInfo}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const PromoItem = ({ promo }) => {
  const [isShow, setShow] = useState(false);
  const [isReveal, setReveal] = useState(false);

  const toggleShow = () => {
    isShow ? setShow(false) : setShow(true);
  };

  return (
    <div className="order-item">
      <Row className="order-header">
        <Col xs="8">
          <h6 className="order-id">
            Promo Id <span>#{promo.id}</span>
          </h6>
        </Col>
        <Col xs="4">
          <Alert
            color={!promo.paid || promo.redeemed ? "danger" : "success"}
            className={`order-status`}
          >
            {promo.paid
              ? !promo.redeemed
                ? "Available"
                : " Already redeemed"
              : "not Complete"}
          </Alert>
        </Col>
      </Row>

      <Row className={`cart-item`}>
        <Col md="8">
          <div className="product-holder">
            <div className="product-details">
              <h5>Promo Code: </h5>
              <div className="coupon" onClick={() => setReveal(true)}>
                <span className="scissors">✂</span>
                <span className={`code ${isReveal ? "" : "isblur"} `}>
                  <p>{promo.promoCode}</p>
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="order-bottom">
        <Col md="8">
          <p className="price">
            Worth : <span>{currency.format(promo.promoPrice)}</span>
          </p>
        </Col>
        <Col md="4">
          <a className="show-more" onClick={toggleShow}>
            {isShow ? "View less" : "Track order"}
          </a>
        </Col>
      </Row>
      {isShow && (
        <div className="order-details-more">
          <div className={`transaction-details`}>
            <p className="payment">
              Payment Method :{" "}
              <span>
                {promo?.paymentGateway
                  ? promo?.paymentGateway
                  : "Credit cards or Debit cards"}
              </span>
            </p>
            <p className="transaction-id">
              Transaction ID # : <span>{promo.transactionId}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const PromoList = () => {
  const { user } = useContext(AppContext);
  const [promoList, setPromoList] = useState(user ? user.promos : []);

  promoList.sort(sortByProperty("redeemed"));

  return (
    <div className="order-waraper">
      <div className="order-list">
        {promoList.map((promo, index) => (
          <PromoItem promo={promo} key={index} />
        ))}
      </div>
    </div>
  );
};

export default function OrderList() {
  const { user } = useContext(AppContext);

  const [orderlist, setOrderList] = useState(user ? user.orders : []);
  const [error, setError] = useState(null);

  // console.log(orderlist);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrderList(() => res.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, [user]);

  return (
    <div className="order-waraper">
      <div className="order-list">
        {orderlist.map((order, index) => (
          <OrderItem order={order} key={index} />
        ))}
      </div>
    </div>
  );
}
