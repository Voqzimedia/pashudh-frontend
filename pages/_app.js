import "bootstrap/dist/css/bootstrap.min.css";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "../styles/globals.scss";

import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { ApolloProvider } from "@apollo/client";
import NextNprogress from "nextjs-progressbar";
import App from "next/app";
import Cookie from "js-cookie";

import SEO from "../seo.config";
import client from "../helper/ApolloClient";
import Layout from "../layout";
import { credits } from "../helper/credits";
import AppContext from "../context/AppContext";

class MyApp extends App {
  state = {
    user: null,
    cart: { items: [], total: 0, totalQuantity: 0 },
    wishlist: { items: [] },
    darkTheme: false,
    width: undefined,
    height: undefined,
    isCartOpen: false,
    isOrderOpen: false,
    isWishlistOpen: false,
    isMenuOpen: false,
    modalLogin: false,
    modalSignup: false,
  };

  componentDidMount() {
    credits();

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    const token = Cookie.get("token");
    // restore cart from cookie, this could also be tracked in a db
    const cart = Cookie.get("cart");

    if (typeof cart === "string" && cart !== "undefined") {
      JSON.parse(cart).forEach((item) => {
        this.setState({
          cart: { items: JSON.parse(cart), total: item.price * item.quantity },
        });
      });
    }
    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  // context functions

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  setUser = (user) => {
    this.setState({ user });
  };

  setCartOpen = (val) => {
    this.setState({ isCartOpen: val });
  };

  setOrderOpen = (val) => {
    this.setState({ isOrderOpen: val });
  };

  setWishlistOpen = (val) => {
    this.setState({ isWishlistOpen: val });
  };
  setMenuOpen = (val) => {
    this.setState({ isMenuOpen: val });
  };
  setModalLogin = (val) => {
    this.setState({ modalLogin: val });
  };
  setModalSignup = (val) => {
    this.setState({ modalSignup: val });
  };

  toggleTheme = () => {
    this.state.darkTheme
      ? this.setState({ darkTheme: false })
      : this.setState({ darkTheme: true });
    document ? (document.body.className = "") : null;
    document
      ? document.body.classList.add(
          `${this.state.darkTheme ? "light" : "dark"}`
        )
      : null;
  };

  addItem = (item) => {
    let { items } = this.state.cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      item.quantity = 1;
      // console.log(this.state.cart.total, item.price);
      this.setState(
        {
          cart: {
            items: [...items, item],
            total: this.state.cart.total + item.price,
            totalQuantity: this.state.cart.totalQuantity + 1,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    } else {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + item.price,
            totalQuantity: this.state.cart.totalQuantity + 1,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    }
  };

  deleteItem = (item) => {
    let { items } = this.state.cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);

    const thisItems = [...this.state.cart.items];
    const index = thisItems.findIndex((i) => i.id === newItem.id);

    thisItems.splice(index, 1);
    this.setState(
      {
        cart: {
          items: thisItems,
          total: this.state.cart.total - item.price * item.quantity,
          totalQuantity: this.state.cart.totalQuantity - item.quantity,
        },
      },
      () => Cookie.set("cart", this.state.cart.items)
    );
  };

  removeItem = (item) => {
    let { items } = this.state.cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity - 1 })
                : item
            ),
            total: this.state.cart.total - item.price,
            totalQuantity: this.state.cart.totalQuantity - 1,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    } else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      this.setState(
        {
          cart: {
            items: items,
            total: this.state.cart.total - item.price,
            totalQuantity: this.state.cart.totalQuantity - 1,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    }
  };

  addItemWishlist = (item) => {
    let { items } = this.state.wishlist;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      item.quantity = 1;
      // console.log(this.state.cart.total, item.price);
      this.setState(
        {
          wishlist: {
            items: [...items, item],
          },
        },
        () => Cookie.set("wishlist", this.state.wishlist.items)
      );

      () => console.log(this.state.wishlist.items);
    } else {
      this.setState(
        {
          wishlist: {
            items: this.state.wishlist.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
          },
        },
        () => Cookie.set("wishlist", this.state.wishlist.items)
      );
    }
  };

  deleteItemWishlist = (item) => {
    let { items } = this.state.wishlist;
    //check for item already in wishlist
    //if not in wishlist, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);

    const thisItems = [...this.state.wishlist.items];
    const index = thisItems.findIndex((i) => i.id === newItem.id);

    thisItems.splice(index, 1);
    this.setState(
      {
        wishlist: {
          items: thisItems,
        },
      },
      () => Cookie.set("wishlist", this.state.wishlist.items)
    );
  };

  render() {
    const { Component, pageProps, router } = this.props;

    const AppProps = {
      user: this.state.user,
      isAuthenticated: !!this.state.user,
      cart: this.state.cart,
      wishlist: this.state.wishlist,
      darkTheme: this.state.darkTheme,
      deviceWidth: this.state.width,
      isCartOpen: this.state.isCartOpen,
      isOrderOpen: this.isOrderOpen,
      isWishlistOpen: this.state.isWishlistOpen,
      isMenuOpen: this.state.isMenuOpen,
      modalLogin: this.state.modalLogin,
      modalSignup: this.state.modalSignup,
      setUser: this.setUser,
      addItem: this.addItem,
      removeItem: this.removeItem,
      deleteItem: this.deleteItem,
      addItemWishlist: this.addItemWishlist,
      deleteItemWishlist: this.deleteItemWishlist,
      toggleTheme: this.toggleTheme,
      setCartOpen: this.setCartOpen,
      setOrderOpen: this.setOrderOpen,
      setWishlistOpen: this.setWishlistOpen,
      setMenuOpen: this.setMenuOpen,
      setModalLogin: this.setModalLogin,
      setModalSignup: this.setModalSignup,
    };

    return (
      <AppContext.Provider value={AppProps}>
        <DefaultSeo {...SEO} />
        <NextNprogress
          options={{ easing: "ease", speed: 500, showSpinner: false }}
          color="linear-gradient(90deg, #5f3f91, #8c2483, #e4003f)"
        />
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={`app-theme ${this.state.darkTheme ? "dark" : "light"}`}>
          <ApolloProvider client={client}>
            <Layout page={router.route}>
              <Component {...pageProps} key={router.route} />
            </Layout>
          </ApolloProvider>
        </div>
      </AppContext.Provider>
    );
  }
}

export default MyApp;
