const Router = require('koa-router');

const router = new Router();
const createRecipe = require('../controllers/createRecipe');
const getRecipes = require('../controllers/getRecipes');

function queryToNumbers(object) {
  const obj = {};
  Object.keys(obj).forEach((item) => {
    obj[item] = parseInt(object[item], 10);
  });

  return obj;
}

router.post('/recipes', async (ctx) => {
  const res = await createRecipe(ctx.request.body);
  ctx.status = 201;
  ctx.body = res;
});

router.get('/recipes', async (ctx) => {
  const {
    skip,
    limit,
  } = queryToNumbers(ctx.request.query);

  const res = await getRecipes(skip, limit);
  ctx.status = 200;
  ctx.body = res;
});

module.exports = router;
