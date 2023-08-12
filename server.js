const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDbStore = require("connect-mongodb-session")(session);

const authRoutes = require("./components/auth/authRoute");
const adminRoutes = require("./components/admin/adminRoute");
const homeRoutes = require("./components/home/homeRoute");
const {MONGODB_URI, PORT} = require("./config");

const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: "sessions",
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat my session',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false }
}));
app.use(flash());  
app.use(homeRoutes);
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
