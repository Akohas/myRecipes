const router = require('koa-router')();
const createRecipe = require('../controllers/createRecipe');
const getRecipes = require('../controllers/getRecipes');
const getRecipe = require('../controllers/getRecipe');
const queryToNumbers = require('../helpers/queryToNumbers');
const validate = require('../validate');

/**
 * @api {post} /recipes Create new Recipe
 * @apiName createRecipe
 * @apiGroup Recipes
 * @apiExample Example body
 * {
 *    title: "Title",
 *    description: "Description"
 * }
 * */


router.post('/', validate('recipe'), async (ctx) => {
  const res = await createRecipe(ctx.request.body);
  ctx.status = 201;
  ctx.body = res;
});

/**
 * @api {get} /recipes Get list of recipes
 * @apiName getRecipes
 * @apiGroup Recipes
 * @apiParam {Number} skip Start index
 * @apiParam {Number} limit limit of elements
 * @apiSuccessExample {json}
 * [
 *  {
 *  title: "Recipe title",
 *  description: "Recipe description",
 *  author: "2134567" // author id
 *  created: "Sun Jan 14 2018 14:28:31 GMT+0300 (+03)"
 * },
 *  ... other recipes
 * ]
 * */

router.get('/', async (ctx) => {
  const {
    skip = 0,
    limit = 20,
  } = queryToNumbers(ctx.request.query);

  const res = await getRecipes(skip, limit);
  ctx.status = 200;
  ctx.body = res;
});


/**
 * @api {get} /recipes/:id Get recipe by id
 * @apiName getRecipeById
 * @apiGroup Recipes
 * @apiSuccessExample
 *  {
 *  title: "Recipe title",
 *  description: "Recipe description",
 *  author: "2134567" // author id
 *  created: "Sun Jan 14 2018 14:28:31 GMT+0300 (+03)"
 * }
 * */

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  let res;

  try {
    res = await getRecipe(id);

    ctx.status = 200;
    ctx.body = res;
  } catch (error) {
    ctx.status = 404;
    ctx.body = JSON.stringify({ error });
  }
});


module.exports = router;
