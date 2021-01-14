const mongoose = require("mongoose"); //getting Mongoose
const Schema = mongoose.Schema; //getting Schema of Mongoose

//creating schema
/*Recipe Schema: acts as model to create a recipe record in database */
const recipeSchema = new Schema(
  {
    //picture url of a recipe
    category: {
      type: String,
      required: true,
    },
    //name of a recipe
    name: {
      type: String,
      required: true,
    },
    //time of a recipe
    time: {
      type: String,
      required: true,
    },
    //ingredients
    ingredients: {
      type: String,
      required: true,
    },
    //directions
    directions: {
      type: String,
      required: true,
    },
    //owner of a recipe
    owner: {
      type: String,
      required: true,
    },
    // //votes of a recipe
    // vote: {
    //   type: Number,
    //   required: true,
    // },
  },
  { timestamps: true } //for keeping track of created/updated time
);
//creating Recipe model
//the names (const name and parameter name) must be the same collection name without plural <s>
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe; //export module to use recipe in express
