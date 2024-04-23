const jwt = require("jsonwebtoken");
require("../.env");

const jwtGenerate = (user) => {
  const accessToken = jwt.sign({ name: user.name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
    algorithm: "HS256",
  });
  return accessToken;
};

const jwtValidate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send({ result: 'failed', message: 'Unauthorized' });

    const token = req.headers.authorization.replace("Bearer ", "");

    await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
    next();
    //return true;
  } catch (error) {
    //return res.sendStatus(403);
    return res.status(403).send({
      result: "failed",
      message: error
    });
  }
};

module.exports = { jwtGenerate, jwtValidate };
// const { tokenCheck } = require("../Services/authenService");
// module.exports = async function (req, res, next) {
//   try {
//     const reqToken = req.header("Authorization");
//     if (req.method == "OPTIONS") {
//         next();
//         return true;
//     }
//     console.log(req.method);
//     console.log("reqToken - ", reqToken);

//     if (reqToken == "" || reqToken == null || reqToken == "null" || reqToken == undefined) {
//         return res.status(400).send({
//         message: "Token Header Required.",
//       });
//     }

//     const token = reqToken.replace("Bearer ", "");
//     const tokenStatus = await tokenCheck(token);

//     if (tokenStatus) {
//       console.log("Token Pass.");
//       next();
//     } else {
//         return res.status(400).send({
//         message: "Token Header Required.",
//       });
//     }
//   } catch (error) {
//     console.log(req.path + " - " + error);
//     res.status(500).send({
//       message: error,
//     });
//   }
// };
