import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({

    // Who sent the the message
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Who received the message
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // What was said
    text: {
        type: String,
        required: true
    },

    // When it was sent
    timeStamp: {
        type: Date,
        default: Date.now,
    },

    // Has the message been seen?
    status: {
        type: String,
        enum: ["sent", "delivered", "seen"],
        default: "sent"
    }
})

export const Message = mongoose.model("Message", messageSchema)
