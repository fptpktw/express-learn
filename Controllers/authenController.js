const authenService = require("../Services/authenService");

const login = async (req, res) => {
  try {
    const accessToken = await authenService.userCheck(req);

    return res.status(200).send({
      message: "success",
      result: {
        accessToken: accessToken,
      },
    });
  } catch (error) {
    const errInfo = "ERROR ! " + req.path + " - " + error;
    return res.status(500).send({
      result: "failed",
      message: errInfo,
    });
  }
};

module.exports = {
  login,
};
