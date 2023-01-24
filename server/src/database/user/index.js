import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [
      {
        detail: { type: String },
        for: { type: String },
      },
    ],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      user: this._id.toString(),
    },
    "ZomatoJapan"
  );
};
UserSchema.statics.findByEmailAndPhone = async (email, phoneNumber) => {
  const checkuserByEmail = await UserModel.findOne({ email });
  const checkuserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkuserByEmail || checkuserByPhone) {
    throw new Error("User Already Exists!");
  }
  return false;
};
UserSchema.statics.findByEmailAndPassword = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User does not Exist");

  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) throw new Error("Invalid Credentials");

  return user;
};

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("users", UserSchema);
