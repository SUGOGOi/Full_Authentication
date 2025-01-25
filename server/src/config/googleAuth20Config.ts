import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
import { generateTokens } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //   console.log(profile);
      try {
        let userFound = await User.findOne({ email: profile._json.email });
        if (!userFound) {
          //generate unique password
          const last6DigitsID = profile.id.substring(profile.id.length - 6);
          const last2DigitsName = profile._json.name!.substring(
            profile._json.name!.length - 2
          );

          const newPass = last2DigitsName + last6DigitsID;

          //generate hash password
          const salt = await bcrypt.genSalt(Number(process.env.SALT));
          const hashedPassword = await bcrypt.hash(newPass, salt);

          userFound = await User.create({
            name: profile._json.name,
            email: profile._json.email,
            password: hashedPassword,
            is_verified: true,
          });
        }

        //generate JWT token
        const { accessToken, refreshToken } = await generateTokens({
          _id: userFound._id,
          role: userFound.role!,
        });

        return done(null, { userFound, accessToken, refreshToken });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
