const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./components/admin/adminRoute");
const {MONGODB_URI, PORT} = require("./config");

const app = express();

// app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(cors());
app.use(bodyParser.json())

app.use(authRoutes);
app.use(adminRoutes);

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
