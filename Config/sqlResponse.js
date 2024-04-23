const { sqlConfig } = require("../Config/databaseConnect");
const sql = require("mssql");
//const sql = require("mssql/msnodesqlv8");

const sqlResponseAsync = async (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        sql.connect(sqlConfig, (err) => {
          if (err) {
            console.log(err);
          }
  
          var request = new sql.Request();
          //console.log(query.substring(0, 100), "- Begin SQL");
          request.query(query, function (err, data) {
            resolve(data);
            //console.log(query.substring(0, 100), "- End SQL");
            setTimeout(() => {
              sql.close(); // just close the connection and it will exit !
            }, 60000);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  
module.exports = {
    sqlResponseAsync
  };