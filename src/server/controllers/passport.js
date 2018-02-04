const passport = require('koa-passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/server');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  ((email, password, done) => {
    User.findOne({ email }, (err, user) => {
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
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: jwtsecret,
};

passport.use(new JwtStrategy(jwtOptions, ((payload, done) => {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
})));

const localAuthHandler = (ctx, next) => passport.authenticate(
  'local',
  async (err, user, info) => {
    let token;
    if (user === false) {
      ctx.status = 401;
      ctx.body = info.message;
    } else {
      try {
        token = await generateJWT(user.username);
      } catch (e) {
        ctx.throw(500, e);
      }
    }
    return { token };
  },
)(ctx, next);

module.exports = localAuthHandler;
