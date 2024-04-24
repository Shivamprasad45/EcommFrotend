export const UserSignUpdata = (SignUpdata) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8000/user", {
      method: "POST",
      body: JSON.stringify(SignUpdata),

      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === 1) {
          console.log(data.message);

          return reject({
            message: "try another email or email already exist",
          });
        }
        if (data.message === 2) {
          console.log(data.message);
          return reject({
            message: "try another password or password already exist",
          });
        }
        if (data.message === 3) {
          console.log(data.data);

          return resolve({ data: data.data });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const UserLogindata = (Logindata) => {
  return new Promise(async (resolve, reject) => {
    console.log(Logindata);
    try {
      const res = await fetch("https://ecommersback-3.onrender.com/Login", {
        method: "POST",
        body: JSON.stringify(Logindata),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();

      if (data && data.message) {
        reject({ message: data.message });
      } else {
        resolve(data); // Resolve with the received data
      }
    } catch (error) {
      reject(error); // Reject with any caught errors
    }
  });
};

export const UserAddresedata = (Userdata) => {
  return new Promise(async (resolve, reject) => {
    console.log(Userdata, "userdatata");
    try {
      const res = await fetch(
        `https://ecommersback-3.onrender.com/Login/${Userdata.UserId}`,
        {
          method: "PATCH",
          body: JSON.stringify(Userdata),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data);

      if (data && data.message) {
        reject({ message: data.message });
      } else {
        resolve(data); // Resolve with the received data
      }
    } catch (error) {
      reject(error); // Reject with any caught errors
    }
  });
};

export const UserAddresedataRemove = (Userdata) => {
  return new Promise(async (resolve, reject) => {
    console.log(Userdata, "userdatata");
    try {
      const res = await fetch(
        `https://ecommersback-3.onrender.com/Login/${Userdata.UserId}`,
        {
          method: "DELETE",
          body: JSON.stringify(Userdata),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data);

      if (data && data.message) {
        reject({ message: data.message });
      } else {
        resolve(data); // Resolve with the received data
      }
    } catch (error) {
      reject(error); // Reject with any caught errors
    }
  });
};
export const UserUpdateAddrese = (Userdata) => {
  return new Promise(async (resolve, reject) => {
    console.log(Userdata, "userdatata");
    try {
      const res = await fetch(
        `https://ecommersback-3.onrender.com/Login/Update`,
        {
          method: "PUT",
          body: JSON.stringify(Userdata),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await res.json();

      resolve(data); // Resolve with the received data
    } catch (error) {
      reject(error); // Reject with any caught errors
    }
  });
};
