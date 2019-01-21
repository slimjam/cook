var express = require('express');
var router = express.Router();
const {Category, Ingredient, Recipe, UserRecipe, RecipeIngredient} = require('../models/recipe');

router.post('/category', function(req, res, next) {
    var lang = req.body.lang ? req.body.lang : "by";
    var i18n = require('../i18n')(lang);
    var categoriesList = [];
    Category.findAll().then( categories => {
        categories.forEach( category => {
            categoriesList.push(i18n.__(category.name));
        })
    }).then( () => {
        res.json(categoriesList);
    })
});

router.post('/ingredient', function(req, res, next) {
    var lang = req.body.lang ? req.body.lang : "by";
    var i18n = require('../i18n')(lang);
    var categoriesList = [];
    Ingredient.findAll().then( ingredients => {
        ingredients.forEach( ingredient => {
            categoriesList.push(ingredient.name);   // aftr translat low implmntation
            //categoriesList.push(i18n.__(ingredient.name));
        })
    }).then( () => {
        res.json(categoriesList);
    })
});
module.exports = router;
