"use client"
import { useState } from "react"
import { arrowDown } from "@/app/Icons/Icons"
import { AnimatePresence, motion } from "framer-motion"

interface PersonProps {
    profilePic: string,
    username: string,
    TimeOflastSentMessage: string,
    previousText: string,


}

const Person = ({ profilePic,username,TimeOflastSentMessage,previousText }: PersonProps ) => {

    const [isHovered, setIsHovered] = useState(false);
    
  return (
   

    <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-20 flex justify-between items-center hover:cursor-pointer
         transition-all duration-300 py-2 px-4 rounded-lg
         group hover:bg-gray-100">

    {/* Image name and last seen message */}
    <div className="flex gap-4 items-center">
        <img 
          src={profilePic || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} 
          alt={`${username}'s Profile Picture`}
          className="max-lg:w-10 max-lg:h-10 lg:w-12 lg:h-12 rounded-full"
        />

        <div className="">
            <h1 className="font-extrabold max-lg:text-lg lg:text-xl">{username || "Jamaldeen"}</h1>
            <p className="max-lg:text-xs lg:text-sm">{previousText || "Hello Bro how are you"}</p>
        </div>
    </div>

    <div className="col-centered gap-2 ">
        <p className="max-lg:text-xs lg:text-sm">{TimeOflastSentMessage || "17:45"}</p>


        {isHovered ? 
        <AnimatePresence>
         <motion.p
          exit={{ x: 20, opacity:0 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.1, type: "spring", damping: 9, stiffness: 100 }}
          className="text-gray-400 w-fit"
        >
            {arrowDown}
        </motion.p> 
        </AnimatePresence>: <p
          className="text-gray-400 opacity-0"
        >
            {arrowDown}
        </p>}
    </div>
    </div>
  )
}

export default Person