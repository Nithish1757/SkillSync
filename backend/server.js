// 🔥 VERY IMPORTANT: Load env FIRST
require("dns").setDefaultResultOrder("ipv4first");
require("dotenv").config();

const express = require("express");
const app = express();

// packages
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// connection to DB and cloudinary
const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*", // you can restrict later
    credentials: true,
  }),
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }),
);

// ✅ Debug (optional - remove later)
console.log("MongoDB URL:", process.env.MONGODB_URL);

// connections
connectDB();
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// default route
app.get("/", (req, res) => {
  res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
});

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:5173/`);
});
