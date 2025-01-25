import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
// use to verify access token and to protect api routes
//JWT Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY,
}, async (jwtPayload, done) => {
    try {
        // validate user from jwt payload
        const user = await User.findOne({ _id: jwtPayload._id }, "-password");
        if (user) {
            return done(null, user);
        }
        return done(null, false); // invalid user
    }
    catch (error) {
        return done(error, false);
    }
}));
