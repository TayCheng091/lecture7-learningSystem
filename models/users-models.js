const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance method
userSchema.methods.isStudent = function () {
  return this.role === "student";
};

userSchema.methods.isInstructor = function () {
  return this.role === "instructor";
};

userSchema.methods.comparePassword = async function () {
  const result = await bcrypt(password, this.password);
  return cb(null, result);
};

// mongoose middleware
// 若使用者為新用戶，或是更改密碼，則進行雜湊處理
userSchema.pre("save", async function (next) {
  // this 代表 mongoDB 的 document
  if (this.isNew || this.isModified(this.password)) {
    const hashValue = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
