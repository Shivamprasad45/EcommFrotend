export const BrowserSave = (UserHistory) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://ecommersback-3.onrender.com/Browser/HistorySave",
        {
          method: "POST",
          body: JSON.stringify(UserHistory),

          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const FetchHistory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://ecommersback-3.onrender.com/Browser/" + id
      );

      const data = response.json();

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const UserCommentsSave = (UsersComment) => {
  return new Promise(async (resolve, reject) => {
    console.log(UsersComment, "User comments");
    try {
      const response = await fetch(
        "https://ecommersback-3.onrender.com/Comment/CommentSave",
        {
          method: "POST",
          body: JSON.stringify(UsersComment),

          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const FetchComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://ecommersback-3.onrender.com/Comment/" + id
      );

      const data = response.json();

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
