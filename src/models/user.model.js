import mongoose, { Model } from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    age: {
        type: Number,
        required:true,

    },
    accessToken: {
        type:String,
    },
    forgotPasswordOtp: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,

    },
    role: {
        type: String,
        enum: ['DIETITIANT', "USER"]
    },
    gender: {
        type: String,
        required:true,
        enum: ["MALE", "FEMALE"]
    },
    password: {
        type: String,
        required: true
    }
})




const User = new mongoose.model("User", userSchema)

export default User;