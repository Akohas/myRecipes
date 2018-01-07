const router = require('koa-router')();
const createRecipe = require('../controllers/createRecipe');
const getRecipes = require('../controllers/getRecipes');
const queryToNumbers = require('../helpers/queryToNumbers');
const validate = require('../validate');

router.post('/', validate('recipe'), async (ctx) => {
  const res = await createRecipe(ctx.request.body);
  ctx.status = 201;
  ctx.body = res;
});

router.get('/', async (ctx) => {
  const {
    skip,
    limit,
  } = queryToNumbers(ctx.request.query);

  const res = await getRecipes(skip, limit);
  ctx.status = 200;
  ctx.body = res;
});

module.exports = router;
