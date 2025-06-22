"use client"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import FormButton from "../../components/FormButton"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/app/redux/hooks"
import axios, { emailValidation, passwordValidation, fullNameValidation } from "../../utils/Utilities"
import { useState } from "react" 
import { occured, stopped } from "@/app/redux/Authentication/Error"
import { newErrorMsg, refreshError } from "@/app/redux/Authentication/ErrorMessage"


const SignupForm = () => {
    // Important Variables
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [ loading,setLoading ] = useState<boolean>(false);


    // State management
    const [ fullname,setFullName ] = useState<string>("");
    const [ email,setEmail ] = useState<string>("");
    const [ password,setPassword] = useState<string>("");

    // Utility Function
    const refresh = () => {
      setFullName("")
      setEmail("")
      setPassword("")
    }

    const validationFunc = (msg: string): void => {
      dispatch(occured())
      dispatch(newErrorMsg(msg))
      refresh();
    }
    // User Creation
    const register = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const emailValidity = emailValidation(email);
      const passwordValidity = passwordValidation(password);
      const fullnameValidity = fullNameValidation(fullname);


      if (emailValidity && passwordValidity && fullnameValidity) {
        setLoading(true)
        axios.post("/api/register" ,{
          fullname: fullname,
          email: email,
          password: password,
        }).then((response) => {
          if (response.status === 200){
   
            dispatch(stopped());
            refresh();
            dispatch(refreshError());
         
            router.push("/Client/Chatapp");
            return;
          }
        }).catch((error) => {
          if (error.response?.status === 401) {
            setLoading(false);
            validationFunc("Input provided is not valid")
            return;
          } else if (error.response?.status === 400) {
            setLoading(false);
            validationFunc("Account already exists. Please log in.")
            return;
          } else {
            setLoading(false);
            validationFunc("Error occured. Please try again")
            return;
          }
        })
      }
      if (!emailValidity) {
        setLoading(false);
        validationFunc("Email Address is not valid")
        return;
      } else if (!passwordValidity) {
        setLoading(false);
        validationFunc("Password must be at least 5 characters")
        return;
      } else if (!fullnameValidity) {
        setLoading(false);
        validationFunc("Fullname must be at least 5 characters")
        return;
      }
    }
  return (
    <motion.form
      onSubmit={register}
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
                  value={fullname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full max-w-lg px-4 text-sm h-11 sm:text-md sm:h-14"
                />
                <p
                  className="text-red-600"
                >
                   
                </p>
            </div>

            {/* Email Address */}
            <div className="w-full col-centered">
               
                <Input 
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full max-w-lg px-4 text-sm h-11 sm:text-md sm:h-14"
                />
                <p className="text-red-600"></p>
            </div>

            {/* Password */}
            <div className="w-full col-centered">
               
                <Input 
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full max-w-lg px-4 text-sm h-11 sm:text-md sm:h-14"
                />
                <p className="text-red-600"></p>
            </div>


            {/* Sign up Button */}
            <div className="w-full centered-flex">
                <FormButton 
                  buttonText="Sign Up"
                  addSpinner={loading}
                />
            </div>
        </div>

        {/* Already have an account */}
        <div className="w-full centered-flex">
            <p className="text-md iphone:text-[0.6rem] sm:text-[0.9rem]">
                Already have an account? <span onClick={() => setTimeout(() => {router.push("/Client/Auth/Login")}, 100)}
                className="hover:cursor-pointer underline text-blue-500 hover:brightness-90">Login here</span>
            </p>
        </div>
    </motion.form>
  )
}

export default SignupForm