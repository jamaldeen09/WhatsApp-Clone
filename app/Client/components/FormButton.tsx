"use client"
import { motion } from "framer-motion"

interface FormButtonProps {
    buttonText: string,
    funcExecuted: () => void;
}

const FormButton = ({ buttonText, funcExecuted }: FormButtonProps) => {
  return (
    <motion.button
      whileHover={{ filter: "brightness(95%)", cursor: "pointer" }}
      whileTap={{ filter: "brightness(90%) "}}
      transition={{ duration: 0.3 }}
      type="submit"
      onClick={funcExecuted} 
      className="w-full bg-blue-500 text-white font-bold py-3 rounded-sm max-w-lg"
    >
        {buttonText}
    </motion.button>
  )
}

export default FormButton