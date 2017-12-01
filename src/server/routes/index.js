const Router = require('koa-router');

const router = new Router();


// render index page
router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

module.exports = router;
