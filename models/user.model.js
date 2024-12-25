import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: [3, "Minimum 3 characters required"]
    },
    lastName: {
        type: String,
        min: [3, "Minimum 3 characters required"]
    },
    phoneNumber: {
        type: Number,
        min: [10, "Minimum 10 numbers required"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Provide appropriate email"]
    },
    googleId:{
        type:String,
    },
    password: {
        type: String,
        min: [8, "Minimum 8 characters required"]
    },
    role:{
        type:String,
        enum:["admin","user","superadmin"]
    },
    licenseDetails:{
        taxStatus: {
            type: String,
            trim: true,
            default: "exempt",
            enum: ["taxation", "exempt"],
          },
          taxId: {
            type: String,
            trim: true,
            default: "",
          },
          taxLicenseImage: {
            type: String,
            trim: true,
            default: "",
          },
    },
    accountNo:{
        type:Number,
    },
    deviceDetails:{
        systemIp:{
            type:String,

        },
        deviceInfo:{
            type:String,
            default:"Lenovo laptop"
        },
        ipLocation:{
            type:String
        }
    },
    rememberToken:{
        type:String
    },
    fcmToken:{
        type:String
    },
    shippingAddress:{
        type:String,
    },
    billingAddress:{
        type:String,
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