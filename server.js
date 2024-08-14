const mongoose = require("mongoose");
const express = require("express");
const app = express();
const todoRouter = require("./routes/todo");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRouter = require("./routes/user");
const MongoStore = require("connect-mongo");

require("dotenv").config();

const main = async (dbUrl) => {
  await mongoose.connect(dbUrl);
};

// const dbUrl = "mongodb://127.0.0.1:27017/myreacttodo";
const dbUrl = process.env.MONGO_DB_URL;

main(dbUrl)
  .then(() => console.log("DB Connected!"))
  .catch((e) => console.log(e));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
  crypto: {
    secret: "secretString",
  },
});

store.on("error",(err) => {
  console.log("Error in MONGO SESSION STORE",err)
})

const sessionOptions = {
  store,
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 1000 * 3600 * 24 * 7,
    maxAge: 1000 * 3600 * 24 * 7,
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use("/todos", todoRouter);
app.use("/", userRouter);

app.use((err, req, res, next) => {  // Include the 'next' parameter
  console.error(err.stack);         // Optionally log the error stack for debugging
  res.status(500).json({ message: "Something went wrong" });  // Send a proper JSON response
});


app.listen(8000, () => {
  console.log("server is started on http://localhost:8000");
});
