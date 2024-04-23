const jwt = require("jsonwebtoken");
require("../.env");

const jwtGenerate = (user) => {
  const accessToken = jwt.sign({ name: user.name }, JWT_SECRET, {
    expiresIn: "30s",
    algorithm: "HS256",
  });

  return accessToken;
};

const jwtValidate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send({ message: 'Unauthorized' });

    const token = req.headers.authorization.replace("Bearer ", "");

    await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
    next();
    return true;
  } catch (error) {
    //return res.sendStatus(403);
    return res.status(403).send({
      message: error,
    });
  }
};

module.exports = { jwtGenerate, jwtValidate };
