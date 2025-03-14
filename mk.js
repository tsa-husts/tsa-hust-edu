const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if available

app.use(bodyParser.json());

let savedLogin = null; // Variable to save login information

// API to save login information
app.post("/save-login", (req, res) => {
    const { email, password } = req.body;

    // Save login information
    savedLogin = { email, password };

    // Return success message
    res.status(200).send("Login information has been saved!");
});

// API to get login information
app.get("/get-login", (req, res) => {
    if (savedLogin) {
        // Return saved login information
        res.status(200).json(savedLogin);
    } else {
        // Return message if no login information is saved
        res.status(404).send("No login information has been saved!");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
