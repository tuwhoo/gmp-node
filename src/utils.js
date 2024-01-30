export const parseRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(JSON.parse(body));
    });

    req.on("error", (error) => {
      reject(error);
    });
  });

export const prepareUser = (user) => ({
  user,
  links: {
    self: `/api/users/${user?.id}`,
    hobbies: `/api/users/${user?.id}/hobbies`,
  },
});

export const prepareHobbies = (userId, hobbies) => ({
  hobbies,
  links: {
    self: `/api/users/${userId}/hobbies`,
    user: `/api/users/${userId}`,
  },
});

export const sendResponse = (res, status, data, headers = {}) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  Object.keys(headers).forEach((key) => res.setHeader(key, headers[key]));

  const response = JSON.stringify(data);
  res.end(response);
};
