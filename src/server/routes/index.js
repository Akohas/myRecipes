const router = require('koa-router')();
const recipes = require('./recipes');
const auth = require('./auth');
const render = require('./render');

router.use('/recipes', recipes.routes());
router.use('/', auth.routes());
router.use('/', render.routes());
module.exports = router;

