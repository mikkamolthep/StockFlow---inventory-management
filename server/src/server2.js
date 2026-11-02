
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to StockFlow API!"
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

// เราใช้ await connectDB() ก่อน app.listen() เพื่อให้ Database เชื่อมต่อสำเร็จก่อนเปิด Server รับ Request