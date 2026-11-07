// // Import Model
// const Product = require("./models/Product");

// // Import Express
// const express = require("express");

// // Create Express application เราจะใช้กำหนด Routes และตั้งค่าต่าง ๆ ของ Server
// const app = express();

// // Define server port กำหนดหมายเลข Port ที่ Server จะใช้รับการเชื่อมต่อ
// const PORT = 3000;

require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// // Create first route
// app.get("/", (req, res) => {
//   res.send("Welcome to StockFlow API!");
// });

// // req = Request ข้อมูลที่ Client ส่งมา
// // res = Response สำหรับส่งข้อมูลกลับไปยัง Client
// // app.get() = กำหนดเส้นทางที่รองรับ HTTP GET

// // Start server สั่งให้ Server เริ่มทำงานที่ Port 3000
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// ------------------------------------------------------------------------------

// const PORT = 3000;

// // GET /
// app.get("/", (req, res) => {
//   res.send("Welcome to StockFlow API!");
// });

// // GET /api  คำสั่งนี้จะส่ง JSON กลับไปยัง Client พร้อมกำหนด HTTP Response Header ให้เหมาะสมกับ JSON โดยอัตโนมัติ
// app.get("/api", (req, res) => {
//   res.json({
//     success: true,
//     message: "StockFlow API is working!",
//     version: "1.0.0",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// ---------------------------------------------------------------------

// Middleware: allow Express to read JSON request bodies
// 1. ทำให้ Express สามารถอ่าน JSON ที่ Client ส่งมาใน Request Body และแปลงเป็น JavaScript Object ใน req.body ได้
// app.use(express.json());

// Temporary mock data
const products = [
  {
    id: 1,
    name: "Office Chair",
    quantity: 20,
    price: 2500,
  },
  {
    id: 2,
    name: "Office Desk",
    quantity: 10,
    price: 4500,
  },
];

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to StockFlow API!",
  });
});

// GET all products
// app.get("/api/products", (req, res) => {
//   res.json({
//     success: true,
//     data: products,
//   });
// });


app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// GET product by ID
// 2. เครื่องหมาย :id หมายถึงค่าที่เปลี่ยนแปลงได้ เช่น /api/products/1
// app.get("/api/products/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const product = products.find((item) => item.id === id);

//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   res.json({
//     success: true,
//     data: product,
//   });
// });



app.get("/api/products/:id", async (req, res) => {
  try {
    // ตรวจสอบรูปแบบ MongoDB ObjectId ก่อน
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});



// POST create product
// app.post("/api/products", (req, res) => {
//   const { name, quantity, price } = req.body; // 3. Request Body ใช้รับข้อมูลที่ Client ส่งมา เช่น ข้อมูลสินค้าใหม่

//   if (!name || quantity == null || price == null) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide name, quantity and price",
//     });
//   }

//   const newProduct = {
//     id: products.length + 1,
//     name,
//     quantity,
//     price,
//   };

//   products.push(newProduct);

//   res.status(201).json({
//     success: true,
//     message: "Product created successfully",
//     data: newProduct,
//   });
// });


app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


// Delete product
// app.delete("/api/products/:id", (req, res) => {
//   const id = Number(req.params.id)

//   const productIndex = products.findIndex(      // findIndex() ค้นหาตำแหน่งของสินค้าที่ต้องการลบ ถ้าได้ -1 แสดงว่าไม่พบสินค้า
//     (item) => item.id === id
//   )

//   if (productIndex === -1) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found"
//     })
//   }

//   const deleteProduct = products.splice(productIndex, 1)    // splice() ลบสินค้าออกจาก Array ส่งข้อมูลสินค้าที่ถูกลบกลับไปให้ Client

//   res.json({
//     success: true,
//     message: "Product deleted successfully",
//     data: deleteProduct[0]
//   })
// })

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
