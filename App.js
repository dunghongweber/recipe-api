const express = require("express"); //get express
const mongoose = require("mongoose"); //get mongoose

const recipeController = require("./controllers/recipesController");

const cors = require("cors");

//create express app (as server)
const app = express();

//middleware of express for HTML body
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.use(cors());

//create PORT for Heroku deployment and/or localhost
let PORT = process.env.PORT || 3001;
//connect to database (MongoDB)
const dbURI =
  "mongodb+srv://dunghong123:pass123word456@cluster0.kv48y.mongodb.net/dhRecipes?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
    app.listen(PORT);
    //use port 3001 for server
    //because the react front-end runs on port 3000
  })
  .catch((err) => console.log(err));

// avoid CORS problem when accessing API from same origin source
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

//handle CORS preflight request for DELETE
app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.send(200);
});

//API: general intro page about the API
app.get("/", (req, res) => {
  res.render("index");
});

//API: get all recipes
app.get("/all", recipeController.recipe_index);

//API: get recipe details
app.get("/detail/:id", recipeController.recipe_details);

//API: create new recipe
app.post("/new", recipeController.recipe_add_post);

//API: delete a recipe
app.delete("/delete/:id", recipeController.recipe_delete);

//API: update a recipe
app.put("/edit/:id", recipeController.recipe_update);
