import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  googoleId?: string;
  githubId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
