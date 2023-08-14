const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const MongoDbStore = require("connect-mongodb-session")(session);
const User = require("./models/user");

const routes = require("./routes");
const {MONGODB_URI, PORT} = require("./config");

const csrfProtection = csrf();

const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: "sessions",
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

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
app.use(csrfProtection);

app.use(async(req, res, next) => {
    try {
        if (!req.session.user) {
            return next();
        }
        const user = await User.findById(req.session.user._id);
        if (!user) {
            return next();
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.userId = req.session.user._id;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(routes);

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
