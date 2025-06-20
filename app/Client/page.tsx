"use client"

import Button from "./components/Button"
import Navbar from "./components/Navbar"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"


const MainApp = () => {
  // Important variables
  const router = useRouter()
  return (
    <header className="flex flex-col h-screen">

      {/* Navigation Bar */}
        <Navbar />

        {/* Promo Section */}
        <motion.section
          initial={{ opacity: 0, x: "-20vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", damping: 7, stiffness: 100 }}
          className="h-full centered-flex"
        >
          {/* Image + text container */}
          <div className="w-full max-w-2xl col-centered space-y-8">
              
              {/* Image */}
              <div className="basic-fit centered-flex w-fit">
                <img 
                  src="https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg?semt=ais_hybrid&w=740" 
                  alt="Robot Image" 
                  className="w-48 h-52 sm:w-56 sm:h-60 md:w-64 md:h-72"
                />
              </div>

              {/* Text */}
              <div className="text-center col-centered space-y-6">
                <div className="col-centered space-y-4 w-full">
                  <h3 className="font-bold text-lg iphone:text-md sm:text-2xl md:text-2xl">Hey Developer! 👋🏽</h3>
                  <h1 className="font-extrabold text-2xl iphone:text-xl sm:text-4xl">Welcome to my app</h1>
                </div>
                <div className="centered-flex">
                   <p className="text-xs iphone:text-[0.6rem] sm:text-sm md:text-lg">Let's start with a quick tour and i will have you up and <br /> running in no time</p>
                </div>
              </div>

              {/* Get Started Button */}
              <div className="w-fit centered-flex">
                 <Button 
                   text="Get Started"
                   routeFunc={() => setTimeout(() => {router.push("Client/Auth/Signup")}, 300)}
                  />
              </div>
          </div>
        </motion.section>
    </header>
  )
}

export default MainApp