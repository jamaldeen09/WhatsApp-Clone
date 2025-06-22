"use client"
import { motion } from "framer-motion"
import Spinner from "../utils/Spinner"

interface FormButtonProps {
    buttonText: string,
    addSpinner?: boolean
}

const FormButton = ({ buttonText,addSpinner }: FormButtonProps) => {
  return (
    <motion.button
      whileHover={{ filter: "brightness(95%)", cursor: "pointer" }}
      whileTap={{ filter: "brightness(90%) "}}
      transition={{ duration: 0.3 }}
      type="submit"
      className="w-full bg-blue-500 text-white font-bold  rounded-sm max-w-lg centered-flex gap-6 py-2 sm:py-3"
    >
        {buttonText}
        {addSpinner ? <Spinner /> : ""}
    </motion.button>
  )
}

export default FormButton