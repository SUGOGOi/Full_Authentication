import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/userModel.js";
export default function configurePassport() {
    //JWT Strategy
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    }, async (jwtPayload, done) => {
        try {
            // validate user from jwt payload
            const user = await User.findById(jwtPayload._id);
            if (user) {
                return done(null, user);
            }
            return done(null, false); // invalid user
        }
        catch (error) {
            return done(error, false);
        }
    }));
    //Google Oauth Strategy
    // passport.use(
    //     new GoogleStrategy({
    //     })
    // )
}
