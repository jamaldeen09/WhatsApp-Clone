"use client"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import FormButton from "../../components/FormButton"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/app/redux/hooks"
import axios, { emailValidation, passwordValidation } from "../../utils/Utilities"
import { useState } from "react" 
import { occured, stopped } from "@/app/redux/Authentication/Error"
import { newErrorMsg, refreshError } from "@/app/redux/Authentication/ErrorMessage"


const LoginForm = () => {
    // Important variables
  const router = useRouter()
  const dispatch = useAppDispatch()

  // State management
  const [ email,setEmail ] = useState<string>("");
  const [ password,setPassword] = useState<string>("");
  const [ loading,setLoading ] = useState<boolean>(false);
 
  // Utility Function
  const refresh = () => {
    setEmail("")
    setPassword("")
  }

  const validationFunc = (msg: string): void => {
    dispatch(occured())
    dispatch(newErrorMsg(msg))
    refresh();
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    const emailValidity = emailValidation(email);
    const passwordValidity = passwordValidation(password);

    setLoading(true)
    if (emailValidity && passwordValidity) {
      axios.post("/api/login", {
        email: email,
        password: password

      }).then((response) => {
        if (response.status === 200){
          dispatch(stopped())
          dispatch(refreshError())
          refresh();
          router.push("/Client/Chatapp")
          return;
        }
      }).catch((error) => {
        if (error?.response.status === 401) {
          setLoading(false);
          validationFunc("Input provided is not valid")
          return;

        } else if (error?.response.status == 404) {
          setLoading(false);
          validationFunc("Account was not found. Please sign in")
          return;

        } else if (error?.response.status === 400) {
          setLoading(false);
          validationFunc("Invalid credentials")
      
          return;
        } else {    
          setLoading(false);
          validationFunc("Error occurred. Please try again")
          return;
        }
      })
    }
    if (!emailValidity) {
      validationFunc("Email Address is not valid")
      setLoading(false);
      return;
    } else if (!passwordValidity) {
      validationFunc("Password must be at least 5 characters");
      setLoading(false);
      return;
    }
  }
  return (
    <motion.form
      onSubmit={login}
      initial={{ y: "-40vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
      className="formWidth formSpacing"
    >
        {/* Form header */}
        <div className="w-full centered-flex">
            <h1 className="font-extrabold text-2xl iphone:text-xl sm:text-3xl">Login</h1>
        </div>

        {/* Form body */}
        <div className="w-full flex flex-col space-y-8">

            {/* Email Address */}
            <div className="w-full col-centered">
                <Input 
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full max-w-lg  px-4 text-sm h-11 sm:text-md sm:h-14"
                />
            </div>

            {/* Password */}
            <div className="w-full col-centered">
                <Input 
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  className="w-full max-w-lg px-4 text-sm h-11 sm:text-md sm:h-14"
                />
            </div>

            {/* Forgot Password */}
            <div className="w-full flex centered-flex">
                <div className="max-w-lg w-full flex items-start">
                  <p 
                    onClick={() => router.push("/Client/Auth/ForgotPass")}
                    className="text-blue-500 hover:cursor-pointer hover:brightness-80 transition-all duration-300
                    hover:scale-105 text-md iphone:text-xs sm:text-sm md:text-[0.9rem]"
                  >
                    Forgot password?
                  </p>
                </div>
            </div>

            {/* Login Button */}
            <div className="w-full centered-flex">
                <FormButton 
                  buttonText="Login"
                  addSpinner={loading}
                />
            </div>
        </div>

        {/* Already have an account */}
        <div className="w-full centered-flex">
            <p className="text-md iphone:text-xs sm:text-[0.9rem]">
               Dont have an account? <span onClick={() => setTimeout(() => {router.push("/Client/Auth/Signup")}, 100)}
            className="hover:cursor-pointer underline text-blue-500 hover:brightness-90">Signup here</span>
            </p>
        </div>
    </motion.form>
  )
}

export default LoginForm