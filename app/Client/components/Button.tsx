import { arrowRight } from "@/app/Icons/Icons"
import { motion } from "framer-motion"

interface ButtonProps {
    text: string,
    routeFunc: () => void,
    includeIcon?: boolean
}
const Button = ({ text, routeFunc, includeIcon }: ButtonProps) => {
  return (
    <motion.button
        onClick={routeFunc}
        whileHover={{ scale: 1.09 }}
        whileTap={{ scale: 0.9 }}
        transition={{   type: "spring", damping: 9, stiffness: 100  }}
        className="w-full border border-black rounded-3xl py-3 flex items-center space-x-2 hover:cursor-pointer iphone:px-3 max-sm:px-6 sm:px-10"
    >
        <p className="text-sm iphone:text-xs md:text-md">{text}</p>
        <span className="text-xs">{includeIcon ? arrowRight : ""}</span>
   </motion.button>
  )
}

export default Button