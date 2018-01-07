const router = require('koa-router')();
const recipes = require('./recipes');
const auth = require('./auth');

router.use('/recipes', recipes.routes());
router.use('/', auth.routes());

module.exports = router;

