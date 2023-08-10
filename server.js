const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const cors = require("cors");
const {MONGODB_URI, PORT} = require("./config");
const app = express();

// app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(cors());
app.use(bodyParser.json())
app.use(authRouter);

mongoose
    .connect(MONGODB_URI)
    .then(async (result) => {
        app.listen(PORT, () => {
            console.log("connected at localhost:3000");
        });
    })
    .catch((error) => {
        console.log(error)
    }
);
