"use client"
import React from 'react'
import { motion } from "framer-motion"
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import FormButton from '../../components/FormButton'
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/app/redux/hooks"
import { occured } from "@/app/redux/Authentication/Error"
import { newErrorMsg  } from "@/app/redux/Authentication/ErrorMessage"
import { emailValidation } from '../../utils/Utilities'
import axios from "../../utils/Utilities"


const ForgotPass = () => {
  // Important variables
  const router = useRouter()
  const dispatch = useAppDispatch()

  // State management
  const [ email,setEmail ] = useState<string>("")
  const [ loading,setLoading ] = useState<boolean>(false);



  // Reset Password
  const resetPass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    if (!emailValidation(email)) {
      dispatch(occured());
      dispatch(newErrorMsg("Please enter a valid email address"));
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post("/api/forgot-password", { 
        email: email 
      });

     
      if (response.data.success) {
        // Store email for OTP verification
        localStorage.setItem("resetEmail", email);
        router.push("/Client/Auth/OTP");
      } else {
        dispatch(occured());
        dispatch(newErrorMsg(response.data.msg || "Error occurred"));
      }
    } catch (error: any) {
      console.error(error);
      const errorMsg = error.response?.data?.msg || "Server error";
      dispatch(occured());
      dispatch(newErrorMsg("Server Error. Try again later"));
      setLoading(false);
    }
  }
    return (
    <motion.form
      onSubmit={resetPass}
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
      className="formWidth formSpacing"
    >
        {/* Form title */}
        <div className="basic-fit centered-flex">
            <h1 className="font-extrabold text-2xl iphone:text-xl sm:text-3xl">
                Forgot password
            </h1>
        </div>

        {/* Form body */}
        <div className="basic-fit centered-flex">
          <Input 
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="w-full max-w-lg px-4 text-sm h-11 sm:text-md sm:h-14"
            placeholder="Email"

          />
        </div>

        {/* Submit Btn */}
        <div className="centered-flex">
          <FormButton 
            buttonText="Change Password"
            addSpinner={loading}
          />
        </div>
    </motion.form>
  )
}

export default ForgotPass