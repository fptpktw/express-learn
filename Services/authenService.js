require("../.env");
//const { createSecretKey } = require("crypto");
//const jose = require("jose");
//const secretKey = createSecretKey(JWT_SECRET, "utf-8");
const permission = require("../Middleware/permission");
const data = require("../data");

// const tokenCheck = (token) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const { payload, protectedHeader } = await jose.jwtVerify(
//         token,
//         secretKey,
//         {
//           issuer: JWT_ISSUER, // issuer
//           audience: JWT_AUDIENCE, // audience
//         }
//       );
//       resolve(true);
//     } catch (error) {
//       reject("Token Expired or invalid.");
//     }
//   });
// };

const userCheck = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, name } = req.body;
      const user = data.users.findIndex((e) => e.name === name && e.id === id);
      if (!name || user < 0) {
        return res.status(401).send({ result: "failed",  message: "Invalid credentials" });
      }
      const accessToken = permission.jwtGenerate(data.users[user]);
      data.users[user].refresh = accessToken;

      resolve(accessToken);
    } catch (error) {
      reject("User not found");
    }
  });
};

module.exports = {
  userCheck
};
