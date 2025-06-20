"use client"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import FormButton from "../../components/FormButton"
import { useRouter } from "next/navigation"

const SignupForm = () => {
    // Important Variables
    const router = useRouter();
  return (
    <motion.form
      initial={{ y: "40vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
      className="formWidth formSpacing"
    >
        {/* Form header */}
        <div className="w-full centered-flex">
            <h1 className="font-extrabold text-2xl iphone:text-xl sm:text-3xl">Create Account</h1>
        </div>

        {/* Form body */}
        <div className="w-full flex flex-col space-y-8">

            {/* Full Name */}
            <div className="w-full col-centered">
               
                <Input 
                  placeholder="Full Name"
                  className="w-full max-w-lg h-14 px-4"
                />
                <p className="text-red-600"></p>
            </div>

            {/* Email Address */}
            <div className="w-full col-centered">
               
                <Input 
                  placeholder="Email Address"
                  className="w-full max-w-lg h-14 px-4"
                />
                <p className="text-red-600"></p>
            </div>

            {/* Password */}
            <div className="w-full col-centered">
               
                <Input 
                  placeholder="Password"
                  className="w-full max-w-lg h-14 px-4"
                />
                <p className="text-red-600"></p>
            </div>


            {/* Sign up Button */}
            <div className="w-full centered-flex">
                <FormButton 
                  buttonText="Sign Up"
                />
            </div>
        </div>

        {/* Already have an account */}
        <div className="w-full centered-flex">
            <p className="text-md iphone:text-xs sm:text-md md:text-[0.9rem]">
                Already have an account? <span onClick={() => setTimeout(() => {router.push("/Client/Auth/Login")}, 100)}
                className="hover:cursor-pointer underline text-blue-500 hover:brightness-90">Login here</span>
            </p>
        </div>
    </motion.form>
  )
}

export default SignupForm