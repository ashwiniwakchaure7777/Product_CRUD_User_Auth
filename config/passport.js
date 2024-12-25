import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();



passport.use(
  new GoogleStrategy(
    {
      clientID: "936037877756-96q3pv1qlbf12nb901uvvc6no55o48ep.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            fullName: profile.displayName,
            email: profile.emails[0].value,
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

//searlize the data into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//retriving the data
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;