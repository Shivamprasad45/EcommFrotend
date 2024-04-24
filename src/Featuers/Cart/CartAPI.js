export const UserCart = (CartData) => {
  console.log(CartData);
  return new Promise((resolve, reject) => {
    fetch("https://ecommersback-3.onrender.com/cart", {
      method: "POST",
      body: JSON.stringify(CartData),

      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const CartDataById = (id) => {
  return new Promise(async (resolve, reject) => {
    const fetchCart = await fetch(
      "https://ecommersback-3.onrender.com/CartId?id=" + id
    );
    const data = await fetchCart.json();
    console.log(data, "Cart data");
    resolve(data);
  });
};

export const RemoveProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    const RemoveCart = await fetch("https://ecommersback-3.onrender.com/" + id);
    const data = await RemoveCart.json();
    resolve(data);
  });
};

export const UpdateCartId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://ecommersback-3.onrender.com/CartId/UpdateCart",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        }
      );

      const Data = response.json();

      resolve(Data);
    } catch (error) {
      reject(error);
    }
  });
};
