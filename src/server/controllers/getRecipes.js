const Recipe = require('../models/Recipe');

const getRecipes = (skip = 0, limit = 10) => Recipe.find().skip(skip).limit(limit);

module.exports = getRecipes;
