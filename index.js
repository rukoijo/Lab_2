const PORT = process.env.PORT || 3000;
const express = require("express");
const connection = require("./Scripts/connection");
const Recipe = require("./Scripts/recipe");
const app = express();
exports.app = app;
require("dotenv").config();

connection();
app.use(express.static('public'));
app.use(express.json());

//Sends the 'index.html' file as a default response to a call to the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

console.log("Listening to the port " + PORT);