const { selectACItemListAsync } = require("../Services/learnService");

const selectProductList = async (req, res) => {
  try {
    const result = await selectACItemListAsync();
    return res.status(200).send({
      message: "success",
      result: {
        ACItemList: result,
      },
    });
  } catch (error) {
    const errInfo = "ERROR ! " + req.path + " - " + error;
    return res.status(500).send({
      message: "failed",
      result: errInfo
    });
  }
};

module.exports = {
  selectProductList,
};
