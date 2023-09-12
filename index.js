const express = require("express");
const Url = require("./models/url");
const { connectMongoDB } = require("./connect");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkForAuth, Authorization } = require("./middleware/auth");
const path = require("path"); //ejs
const app = express();
const PORT = 3000;

//connection, url/database-name
connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json()); //middleware to take input as json
app.use(express.urlencoded({ extended: false })); //support form data
app.use(cookieParser());
app.use(checkForAuth);


//routes
app.use("/url", Authorization(["NORMAL", "ADMIN"]), urlRouter); //middleware for routes, user needs to be logged in
app.use("/user", userRouter);
app.use("/", staticRouter); //for frontend rendering

app.get("/url/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;

  //findOneAndUpdate(filter, update)
  const entry = await Url.findOneAndUpdate(
    {
      shortUrl,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  return res.redirect(entry.redirectUrl); //redirects to url provided by user
});

app.listen(PORT, () => console.log(` Server started at PORT : ${PORT}`));
