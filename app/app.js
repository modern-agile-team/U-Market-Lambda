const express = require("serverless-express/express");
const dotenv = require("dotenv");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const cors = require("cors");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const user = require("./src/apis/user");
const home = require("./src/apis/home");
const products = require("./src/apis/products");
const communities = require("./src/apis/communities");
const major = require("./src/apis/major");
const watchlist = require("./src/apis/watchlist");
const selllist = require("./src/apis/selllist");
const buylist = require("./src/apis/buylist");
const image = require("./src/apis/image");
const comments = require("./src/apis/communities/comments");
const replies = require("./src/apis/communities/replies");
const bookmark = require("./src/apis/bookmark");
const chat = require("./src/apis/chat");
const advertisement = require("./src/apis/advertisement");
const review = require("./src/apis/review");
const search = require("./src/apis/search");

app.use("/api/user", user);
app.use("/api/home", home);
app.use("/api/pick", major);
app.use("/api/product", products);
app.use("/api/products", products);
app.use("/api/community", communities);
app.use("/api/communities", communities);
app.use("/api/watchlist", watchlist);
app.use("/api/selllist", selllist);
app.use("/api/buylist", buylist);
app.use("/api/image", image);
app.use("/api/comment", comments);
app.use("/api/comments", comments);
app.use("/api/reply", replies);
app.use("/api/replies", replies);
app.use("/api/bookmarks", bookmark);
app.use("/api/chat", chat);
app.use("/api/advertisements", advertisement);
app.use("/api/review", review);
app.use("/api/search", search);
app.use(errorMiddleware);

module.exports = app;
