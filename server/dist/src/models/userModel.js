import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false, // for social auth users
    },
    googoleId: {
        type: String,
        required: false,
    },
    githubId: {
        type: String,
        required: false,
    },
}, { timestamps: true });
export default mongoose.model("User", UserSchema);
