
"use client"
import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { archive, logout, star, userGroup } from '@/app/Icons/Icons'
import { useAppSelector } from '@/app/redux/hooks'


const Dropdown = () => {
    const ellipseDropdown = useAppSelector(state => state.ellipse.ellpiseDropdown)
    
  return (

    ellipseDropdown &&  
    <motion.div 
    key="dropdown"
    initial={{ opacity: 0, y: -40 }}
    animate={{ 
        opacity: 1, 
        y: 0, 
        transition: { type: "spring", damping: 25, stiffness: 300 }
    }}
      className="z-50 rounded-xl shadow-2xl
        min-h-16 bg-white border border-gray-400 w-fit
      ">

        <div className="border-b border-gray-400 w-fit px-4 py-2">
         <p
          className="flex items-center p-4 w-60  gap-4 text-sm hover:bg-gray-100 rounded-lg hover:cursor-pointer transition-all"><span>{userGroup}</span>New group</p>
          <p className="flex items-center p-4 gap-4 text-sm hover:bg-gray-100 rounded-lg hover:cursor-pointer transition-all"><span>{archive}</span>Archived</p>
          <p className="flex items-center p-4  gap-4 text-sm hover:bg-gray-100 rounded-lg hover:cursor-pointer transition-all"><span>{star}</span>Starred Messages</p>
        </div>

        <div className="px-4 py-2">
          <p className="flex items-center py-4 gap-4 text-sm px-4 hover:bg-red-200 hover:text-red-500 rounded-lg hover:cursor-pointer transition-all"><span>{logout}</span> Log out</p>
        </div>
    </motion.div>
     
  )
}

export default Dropdown