import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import {
  API_URL,
  STRIPE_PK,
  getToken,
  productCheckout,
} from "../../helper/auth";
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

    productCheckout(product)
      .then((res) => {
        const { session } = res.data;
        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });

    // console.log("session", session);

    // const result = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });
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
