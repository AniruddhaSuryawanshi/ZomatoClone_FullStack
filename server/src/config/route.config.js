import { Router } from "express";
import JWTPassport from "passport-jwt";
import { UserModel } from "../database/allModels";

const JWTStrategy = JWTPassport.Strategy;
const ExtractJWT = JWTPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoJapan",
};

export default (passport) => {
  passport.use(
    new JWTStrategy(options, async (jwt__payload, done) => {
      try {
        const doesUserExist = await UserModel.findById(jwt__payload.user);
        if (!doesUserExist) return done(null, false);
        return done(null, doesUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};

