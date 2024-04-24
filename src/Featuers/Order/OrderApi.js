export const OrderApi = (Orderdata) => {
  return new Promise((resolve, reject) => {
    fetch(`https://ecommersback-3.onrender.com/Order/${Orderdata.UserId}`, {
      method: "POST",
      body: JSON.stringify(Orderdata),
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

export const FetchOrder = (Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Response = await fetch(
        `https://ecommersback-3.onrender.com/Order/${Id}`
      );

      const Data = await Response.json();

      resolve(Data);
    } catch (error) {
      reject(error);
    }
  });
};
