const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

let savedLogin = null; // Lưu thông tin đăng nhập tạm thời

// API để lưu thông tin đăng nhập
app.post("/save-login", (req, res) => {
    const { email, password } = req.body;
    savedLogin = { email, password }; // Lưu thông tin
    res.status(200).send("Thông tin đăng nhập đã được lưu!");
});

// API để lấy thông tin đăng nhập
app.get("/get-login", (req, res) => {
    if (savedLogin) {
        res.status(200).json(savedLogin);
    } else {
        res.status(404).send("Không có thông tin đăng nhập nào được lưu!");
    }
});

// Khởi động server
app.listen(3000, () => {
    console.log("Server đang chạy tại http://localhost:3000");
});
