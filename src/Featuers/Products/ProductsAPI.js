export const fetchProductServices = () => {
  return new Promise((resolve, reject) => {
    fetch("https://ecommersback-3.onrender.com/Services")
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

export const fetchServicesList = (catoryName) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(
      "https://ecommersback-3.onrender.com/ServicesList?category=" + catoryName
    );

    const res = await data.json();
    if (res) {
      resolve(res);
    }
  });
};

export const SearchProducts = (SearchData) => {
 
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://ecommersback-3.onrender.com/Search?SearchData=${SearchData}`
      );

      const data = await response.json();

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
export const ProductDetails = async (id) => {
  try {
    const response = await fetch(
      "https://ecommersback-3.onrender.com/ServicesListDetails?id=" + id
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const AllProducts = async () => {
  try {
    const response = await fetch(
      "https://ecommersback-3.onrender.com/ServicesListDetails/Products"
    );
    const data = await response.json();
    console.log(data, "data");
    return data;
  } catch (error) {
    throw error;
  }
};
