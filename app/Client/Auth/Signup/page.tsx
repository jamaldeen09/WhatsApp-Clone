"use client"
import React from "react"
import Navbar from "../../components/Navbar"
import SignupForm from "./SignupForm"
import { useAppDispatch,useAppSelector } from "@/app/redux/hooks"
import { stopped } from "@/app/redux/Authentication/Error"
import { errorIcon } from "@/app/Icons/Icons"

const Signup = () => {
    // Important variables
    const dispatch = useAppDispatch();
    const errorMsg = useAppSelector(state => state.errorMsg.errorMessage)
    const errorEnabler = useAppSelector(state => state.errorOccured.errorOccurence)
    return (
        <div className="flex flex-col h-screen">

            {/* Navbar */}
            <Navbar/>

            {/* Form Container */}
            <div className="h-full centered-flex w-full iphone:py-20 sm:py-0">
                <SignupForm />
            </div>

            {/* Error Message Container */}
            <div 
              onClick={() => dispatch(stopped())}
              className={`inset-0 absolute h-screen py-28 ${errorEnabler ? "flex justify-center" : "hidden"}`}
            >
           
              <div 
                className="w-full bg-white h-14 shadow-xl rounded-lg flex gap-6 items-center px-6 border max-w-xs iphone:max-w-60 sm:max-w-sm md:max-w-xl "
              >
                <p className="text-red-600">{errorIcon}</p>
                <p className="iphone:text-xs sm:text-md">{errorMsg}</p>
              </div>

            </div>

        </div>
    )
}

export default Signup