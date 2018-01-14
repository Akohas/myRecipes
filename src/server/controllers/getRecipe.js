const Recipe = require('../models/Recipe');

const getRecipe = id => Recipe.find({ _id: id });

module.exports = getRecipe;
