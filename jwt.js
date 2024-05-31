import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";

const signModel = mongoose.model("sign");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Random string";

const auth = new JwtStrategy(opts, async (jwt_payload, done) => {
  console.log("lkajfdlsak;", jwt_payload);
  try {
    const user = await signModel.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

export default auth;
