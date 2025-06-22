import { Input } from "@/components/ui/input"
import ChatNav from "../../../components/ChatNav"
import { grinStars, paperPlane, plus } from "@/app/Icons/Icons"
import { motion } from "framer-motion"


const ChatArea = () => {
  
  return (
    <div 
     style={{ backgroundImage: "url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)",
       
     }}
     className="hidden flex-col max-lg:flex max-lg:col-span-12 lg:col-span-13 overflow-hidden
     justify-between">
        <ChatNav />


      {/* Chat area */}
      <div className="overflow-y-auto ">
         
        
      </div>

      {/* Type area */}
      <div className="w-full min-h-16 px-4 pb-6">
       <div className="relative h-fit w-full">
          <Input 
            placeholder="Type a message"
            type="text"
            className="w-full bg-white h-full rounded-full py-4 px-36"
           />

           <motion.p 
           whileHover={{ scale: 1.1, filter: "brightness(95%)", cursor: "pointer" }}
           whileTap={{ scale: 0.9, filter: "brightness(90%)"  }}
           transition={{ duration: 0.3, damping: 10, stiffness: 100 }}
           className="absolute top-[0.85rem] left-7 text-gray-500 text-lg
            hover:bg-gray-100 rounded-full
           w-7 h-7 centered-flex">
              {plus}
           </motion.p>

           <motion.p 
            whileHover={{ scale: 1.1, filter: "brightness(95%)", cursor: "pointer" }}
            whileTap={{ scale: 0.9, filter: "brightness(90%)"  }}
            transition={{ duration: 0.3, damping: 10, stiffness: 100 }}
           className="absolute top-[0.85rem] left-18 text-gray-500 text-lg
            hover:bg-gray-100 rounded-full
           w-7 h-7  centered-flex">
            {grinStars}
          </motion.p>

          <motion.p 
            whileHover={{ scale: 1.1, filter: "brightness(95%)", cursor: "pointer" }}
            whileTap={{ scale: 0.9, filter: "brightness(90%)"  }}
            transition={{ duration: 0.3, damping: 10, stiffness: 100 }}
            className="absolute top-[0.65rem] right-7 bg-blue-500
            text-white font-extrabold w-8 h-8 rounded-full
            centered-flex
            "
          >
            {paperPlane}
          </motion.p>
       </div>
      </div>
    </div>
  )
}

export default ChatArea