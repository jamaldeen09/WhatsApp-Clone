import mongoose from "mongoose"

const chatRoomSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
}, { timestamps: true })

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema)