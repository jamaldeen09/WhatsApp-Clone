import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" },
    passwordResetToken: String,  
    passwordResetExpires: Date          
}, { timestamps: true });    


export const User = mongoose.model("User", userSchema)

