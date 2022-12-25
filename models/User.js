const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true, select: false, minlength: 8 },
    confirmEmail: { type: Boolean, default: false },
    profilePic: { type: String, default: "" },
    phoneNumber: String,
    role: {
      type: String,
      default: "user",
      enum: ["admin", "guide", "user", "lead-guide"],
    },
    active: { type: Boolean, default: true, select: false },
    passwordResetToken: String,
    passwordResetExpire: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getEmailJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EMAIL_TOKEN_EXPIRE),
  });
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.hashPassword = async function (inputPassword) {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  return await bcrypt.hash(inputPassword, salt);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getDate() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
