const express = require("express");
const router = require("./app/routes/forms.routes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "http://localhost:5173");
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/v1/", router);

app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
