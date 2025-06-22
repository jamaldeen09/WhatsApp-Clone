import { ellipse, navElipse } from '@/app/Icons/Icons';
import React from 'react'

interface ChatProps {
    profilePic: string,
    username: string,
    showProfile: () => void;
}
const ChatNav = ({ profilePic,username, showProfile }: ChatProps) => {
  return (
    <nav
      className="bg-white py-3 px-4 flex justify-between items-center shadow-md"
    >
        {/* Image and name */}
        <div className="flex items-center gap-4"
        >
            <img 
              onClick={showProfile}
              src={profilePic ||  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
              alt={`${username}'s profile picture`}
              className="w-10 h-10 rounded-full hover:cursor-pointer hover:scale-105 hover:brightness-90
              transition-all"
            />

            <h1 className="font-extrabold text-xl">{username || "Jamaldeen"}</h1>
        </div>

        <div className="">
            <p 
            className={`
            hover:cursor-pointer hover:bg-gray-100 p-2 rounded-full 
            centered-flex transition-all hover:scale-105 active:scale-100 
            active:brightness-90`
          }
            >
                {navElipse}
            </p>
        </div>
    </nav>
  )
}

export default ChatNav