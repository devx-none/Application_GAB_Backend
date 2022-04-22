import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  cardNumber : number;
  pin: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cardNumber: { type: Number,unique: true ,required: true},
    pin: { type: String, required: true },
    balance: { type: Number, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("pin")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.pin, salt);

  // Replace the password with the hash
  user.pin = hash;

  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.pin).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
