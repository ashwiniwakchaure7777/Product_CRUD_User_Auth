import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { type } from "os";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: [3, "Minimum 3 characters required"]
    },
    lastName: {
        type: String,
        required: true,
        min: [3, "Minimum 3 characters required"]
    },
    phoneNumber: {
        type: Number,
        required: true,
        min: [10, "Minimum 10 numbers required"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide appropriate email"]
    },
    password: {
        type: String,
        required: true,
        min: [8, "Minimum 8 characters required"]
    },
    role:{
        type:String,
        required:true,
        enum:["admin","user","superadmin"]
    }
},
{
    timestamps:true
}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, "asjfhjdfd", { expiresIn: "7d" })
}
export const User = mongoose.model("User", userSchema);