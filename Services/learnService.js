const { queryStringSelector } = require("../Models/leaenModel");
//const sql = require("mssql/msnodesqlv8");
const sql = require("../Config/sqlResponse");

const selectACItemListAsync = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const selectQuery = queryStringSelector.listOfACItem.bodyQuery;
      const result = await sql.sqlResponseAsync(selectQuery);
      resolve(result.recordset);
    } catch (error) {
      reject("'selectACItemList' - " + error);
    }
  });
};

module.exports = {
  selectACItemListAsync,
};
