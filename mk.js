const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let savedLogin = null;

// Route cho đường dẫn gốc
app.get("/", (req, res) => {
    res.send("Welcome to the login server!");
});

// API để lưu thông tin đăng nhập
app.post("/save-login", (req, res) => {
    const { email, password } = req.body;
    savedLogin = { email, password };
    res.status(200).send("Login information has been saved!");
});

// API để lấy thông tin đăng nhập
app.get("/get-login", (req, res) => {
    if (savedLogin) {
        res.status(200).json(savedLogin);
    } else {
        res.status(404).send("No login information has been saved!");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
