const router = require('koa-router')();

const AuthController = require('../controllers/passport');

router.post('/auth', async (ctx, next) => {
  const res = await AuthController(ctx, next);
  console.log(res);
  ctx.body = { success: true };
});

module.exports = router;
