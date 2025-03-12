const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let savedLogin = null; // Biến để lưu thông tin đăng nhập

// API để lưu thông tin đăng nhập
app.post("/save-login", (req, res) => {
    const { email, password } = req.body;

    // Lưu thông tin đăng nhập
    savedLogin = { email, password };

    // Trả về thông báo thành công
    res.status(200).send("Thông tin đăng nhập đã được lưu!");
});

// API để lấy thông tin đăng nhập
app.get("/get-login", (req, res) => {
    if (savedLogin) {
        // Trả về thông tin đăng nhập đã lưu
        res.status(200).json(savedLogin);
    } else {
        // Trả về thông báo nếu không có thông tin đăng nhập
        res.status(404).send("Không có thông tin đăng nhập nào được lưu!");
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
