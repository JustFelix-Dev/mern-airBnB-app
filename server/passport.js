const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;

// Google
const GOOGLE_CLIENT_ID = '189603413224-v2asu2r2onph2aer3c9l5kqfnemop424.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// GitHub 
const GITHUB_CLIENT_ID = '263c7a8a5a758db87e78';
const GITHUB_CLIENT_SECRET = 'e0e50b88299eef50f97ac8990747715836e1f2ad';

// Facebook
// const FACEBOOK_APP_ID='';
// const FACEBOOK_APP_SECRET ='';


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done){
    done(null,profile)
  }
));

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done){
    done(null,profile)
  }
));

// passport.use(new FacebookStrategy({
//   clientID: FACEBOOK_APP_ID,
//   clientSecret: FACEBOOK_APP_SECRET,
//   callbackURL: "/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, done){
//   done(null,profile)
// }
// ));

passport.serializeUser((user,done)=>{
      done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})