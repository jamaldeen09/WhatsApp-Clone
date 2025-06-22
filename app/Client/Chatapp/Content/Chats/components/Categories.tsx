import { motion } from "framer-motion"

interface CategoryProps {
    category: string
}

const Categories = ({ category }: CategoryProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 , cursor: "pointer" }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3, type: "spring", damping: 8, stiffness: 100 }}
      className="centered-flex rounded-full py-1 w-fit px-2 shadow-xl text-gray-500  border-2  border-gray-400
      text-sm hover:bg-blue-500 hover:text-white font-extrabold hover:border-blue-500 "
    >
        <p>{category}</p>
    </motion.div>
  )
}

export default Categories