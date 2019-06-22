
const express = require('express');

const router = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Presenter = require('../models/Presenter');

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  Presenter.findOne({ email }, (err, authUser) => {
    done(null, authUser._doc);
  });
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = new Presenter();
    newUser.email = profile.emails[0].value;
    newUser.name = profile.displayName;
    newUser.picture = profile.photos[0].value;

    Presenter.findOne({ email: newUser.email }, async (err, existUser) => {
      if (existUser) {
        done(null, existUser._doc);
      } else {
        await newUser.save();
        done(null, newUser._doc);
      }
    });
  },
));

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/google/failure',
  }),
  (req, res) => {
    const { email, name, picture } = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/login/success?email=${email}&name=${name}&picture=${picture}`);
  });

router.get('/google/failure', (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/login`);
});

router.get('/logout', (req, res, next) => {
  req.logout();

  req.session.save((err) => {
    if (err) { return next(err); }

    return res.send({ authenticated: req.isAuthenticated() });
  });
});

module.exports = router;
