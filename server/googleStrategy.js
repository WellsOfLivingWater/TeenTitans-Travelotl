const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../server/models/User.js')

require('dotenv').config();

//change for env variable
passport.use(new GoogleStrategy({
    clientID: '43681020146-0meph9rujaamhmpqfeu7m21ir3ha47bd.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5173/api/auth/google/callback",
    passReqToCallback   : true
  },
  
  //change code to be able to query from db
  async function(request, accessToken, refreshToken, profile, done) {
    console.log('access Token', accessToken)
    const user = await User.findOne({email: profile.email});
    // console.log('testing', profile.given_name, "profile ====> ", profile);
    if(user === null){
        await User.create({
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email, 
            password: 'oauth'        
            }
      );
      return done(null, user, { profile: profile });
    } else {
        return done(null, user, { profile: profile });
    }
}
));
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
})