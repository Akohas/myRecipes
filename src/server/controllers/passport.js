const passport = require('koa-passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/server');

const { ExtractJwt } = require('passport-jwt');

function generateJWT(username) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    username,
    exp: parseInt(exp.getTime() / 1000, 10),
  }, secret);
}

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  },
  ((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
      }
      return done(null, user);
    });
  }),
));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};


const localAuthHandler = (ctx, next) => passport.authenticate(
  'local',
  async (err, user, info) => {
    let token;
    if (user === false) {
      ctx.throw(info.message, 401);
    }
    try {
      token = await generateJWT(user.username);
    } catch (error) {
      ctx.throw(error, 500);
    }

    ctx.status = 200;
    ctx.body = { token };
  },
)(ctx, next);


const registrationController = async (body) => {
  const { username, password } = body;
  const user = await User.findOne({ username });
  let token;
  if (user) {
    return {
      error: 'User already exists',
      status: 401,
    };
  }
  try {
    token = await generateJWT(username);
  } catch (e) {
    return {
      error: e,
      status: 500,
    };
  }

  const newuser = new User({ username, password });

  await newuser.save();
  return { token };
};
module.exports = { localAuthHandler, registrationController };
