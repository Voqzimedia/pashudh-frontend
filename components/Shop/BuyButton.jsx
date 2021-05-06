import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { API_URL, STRIPE_PK, getToken } from "../../helper/auth";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const stripePromise = loadStripe(STRIPE_PK);

export default function BuyButton({ product }) {
  const router = useRouter();

  //   console.log(product);

  //   var tempProduct = {
  //     id: 1,
  //   };

  const handleBuy = async (e) => {
    const stripe = await stripePromise;
    const token = await getToken();
    console.log("handleBuy token", token);
    e.preventDefault();
    const res = await fetch(`${API_URL}/orders/`, {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const session = await res.json();
    console.log("session", session);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <>
      {/* {user &&
                <button className={styles.buy} onClick={handleBuy}>BUY</button>
            }
            {!user &&
                <button className={styles.buy} onClick={redirectToLogin}>Login to Buy</button>
            } */}

      <button className={`btn solid-btn`} onClick={handleBuy}>
        BUY
      </button>
    </>
  );
}
