export const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
});

export const camelToNormal = (text) => {
  if (text) {
    var result = text.replace(/([A-Z])/g, " $1");
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }
};

export const makeTitle = (slug) => {
  if (slug) {
    var words = slug.split("-");

    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(" ");
  }
};

export const arrayRemove = (arr, value) => {
  if ((arr, value)) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }
};

export const imgUrlCheck = (url) => {
  if (url) {
    if (url.startsWith("http")) {
      return url;
    } else {
      return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    }
  }
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const checkOutDataFormater = (data, cart) => {
  if (data && cart) {
    const cartItems = [];

    cart.items.map((items) => {
      var tempItem = {
        id: items.id,
        name: items.name,
        price: items.price,
        slug: items.slug,
        quantity: items.quantity,
      };
      cartItems.push(tempItem);
    });

    var dataTemplate = {
      cartItems: cartItems,
      address: {
        city: data.City,
        country: data.country,
        line1: data.Address,
        postal_code: data.PINcode,
        state: data.region,
      },
      name: `${data.FirstName} ${data.LastName}`,
      email: data.Email,
      phone: data.Phone,
      saveMe: data.saveMe,
      discount: data.discount,
      useRedeemPoints: data.useRedeemPoints,
      paymentGateway: data.paymentGateway?.name,
    };

    return dataTemplate;
  } else {
    return null;
  }
};

export const buyBtnDataFormater = (cart) => {
  if (cart) {
    const cartItems = [];

    cart.items.map((items) => {
      var tempItem = {
        id: items.id,
        name: items.name,
        price: items.price,
        slug: items.slug,
        quantity: items.quantity,
      };
      cartItems.push(tempItem);
    });

    var dataTemplate = {
      cartItems: cartItems,
    };

    return dataTemplate;
  } else {
    return null;
  }
};

export const sortByProperty = (property) => {
  if (!property) {
    return null;
  }
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
};

export default function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "...." : str;
}
