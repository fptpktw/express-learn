const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 3002;
const ip = "127.0.0.1";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["*"], // ระบุโดเมนที่อนุญาตให้เข้าถึง
    methods: "POST", // ระบุ HTTP methods ที่อนุญาต
    credentials: true, // ระบุถึงการใช้งาน credentials (cookies, headers) จากโดเมนอื่น
  })
);

app.use("/learn", require("./Routes/learnRoute"));
app.use("/auth", require("./Routes/authenRoute"));

app.listen(port, () => {
  console.log(`Listening at http://${ip}:${port}`);
});
