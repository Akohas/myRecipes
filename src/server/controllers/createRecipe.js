const Recipe = require('../models/Recipe');

const createRecipe = data => new Recipe(data).save();

module.exports = createRecipe;
