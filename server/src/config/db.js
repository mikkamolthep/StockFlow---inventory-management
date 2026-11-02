
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


// require("mongoose") เรียกใช้งาน Mongoose
// connectDB เป็นฟังก์ชันสำหรับเชื่อมต่อ Database
// mongoose.connect() ใช้เชื่อมต่อ MongoDB ผ่าน Connection String
// process.env.MONGODB_URI อ่าน Connection String จาก Environment Variable

// try...catch ใช้ตรวจจับข้อผิดพลาดในการเชื่อมต่อ

// process.exit(1) สั่งหยุด Backend เมื่อเชื่อมต่อไม่สำเร็จ