import React from "react"
import Navbar from "../../components/Navbar"
import SignupForm from "./SignupForm"

const Signup = () => {

    return (
        <div className="flex flex-col h-screen">

            {/* Navbar */}
            <Navbar/>

            {/* Form Container */}
            <div className="h-full centered-flex w-full">
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup