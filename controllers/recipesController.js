//getting Recipe model for db access
const Recipe = require("../models/recipe");

//all Recipes
const recipe_index = (req, res) => {
  Recipe.find()
    .sort({ createdAt: -1 }) //newest recipes
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

//Recipe details
const recipe_details = (req, res) => {
  const id = req.params.id; //getting id from url
  console.log(id); //check if correct id

  Recipe.findById(id)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
};

//add Recipe
const recipe_add_post = (req, res) => {
  console.log(req.body); //log to check if HTML body has correct data

  const recipe = new Recipe(req.body); //create new Recipe using HTML body data

  //check if the Recipe name is already existed
  Recipe.exists({ name: recipe.name.toUpperCase() }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      //prevent duplicate Recipe name
      if (docs === true) {
        res.json({
          addRecipeResult:
            "Recipe already existed, give a different name if you want to add this Recipe",
        });
      }
      //add new Recipe if Recipe name is different
      else {
        recipe
          .save()
          .then((result) => {
            res.json({ addRecipeResult: "YES" });
          }) //send json result of newly created Recipe
          .catch((err) => console.log(err)); //log out error
      }
    }
  });
};

//delete Recipe
const recipe_delete = (req, res) => {
  const id = req.params.id; //getting id from url

  Recipe.findByIdAndDelete(id)
    .then((result) => {
      res.json({ deleteSucess: "yes" }); //return json as response
    })
    .catch((err) => {
      console.log(err); //log out error
      res.json({ deleteSucess: "no" }); //return json as response
    });
};

//update or edit a Recipe
const recipe_update = (req, res) => {
  const id = req.params.id; //getting id from url

  Recipe.findByIdAndUpdate(id, req.body, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated Recipe: ", result);
    }
  })
    .then((result) => {
      res.json({ updateSucess: "yes" }); //return json as response
    })
    .catch((err) => {
      console.log(err); //log out error
      res.json({ updateSucess: "no" }); //return json as response
    });
};

//export all methods of Recipe Controller
module.exports = {
  recipe_index,
  recipe_details,
  recipe_add_post,
  recipe_delete,
  recipe_update,
};
