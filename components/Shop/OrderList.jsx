import { useContext, useState, useEffect } from "react";
import { Row, Col, Alert } from "reactstrap";
import AppContext from "../../context/AppContext";
import { currency } from "../../helper/functions";
import { getOrders } from "../../helper/auth";

// images

import productImg from "../../assets/images/products/prod1.jpg?webp";

export const OrderItem = ({ order }) => {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => {
    isShow ? setShow(false) : setShow(true);
  };

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
              Payment Method : <span>Credit cards or Debit cards</span>
            </p>
            <p className="transaction-id">
              Transaction ID # : <span>{order.transactionId}</span>
            </p>
          </div>

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

export default function OrderList() {
  const { user } = useContext(AppContext);

  const [orderlist, setOrderList] = useState(user ? user.orders : []);

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
