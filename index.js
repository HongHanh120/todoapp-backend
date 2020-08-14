const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// generate app object
const app = express();

const PORT = process.env.PORT || 5000;

// telling the app that we are going to use json to handle incoming payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const todo = require('./routes/todo');

app.use('/api/v1/todos', todo);

app.use("/ping", (req, res) => {
    res.send("pong");
});

mongoose.connect("mongodb://localhost:27017/todo", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        });
    })
    .catch((err) => console.error(err.message));

