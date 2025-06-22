"use client";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FormButton from "../../components/FormButton";
import { useState } from "react";
import { passwordValidation } from "../../utils/Utilities";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { occured, stopped } from "@/app/redux/Authentication/Error";
import { errorIcon } from "@/app/Icons/Icons";
import { newErrorMsg } from "@/app/redux/Authentication/ErrorMessage";
import Spinner from "../../utils/Spinner";
import axios from "../../utils/Utilities"
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  useEffect(() => {
    const resetToken = localStorage.getItem("resetToken");
    if (!resetToken) {
      router.push("/Client/Auth/Login");
      return;
    }
    if (!resetToken.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)) {
        localStorage.removeItem("resetToken");
        router.push("/Client/Auth/Forgotpassword");
      }
  }, []);

  const [password, setPassword] = useState<string>("");

  const [ loading,setLoading ] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const errorMsg = useAppSelector((state) => state.errorMsg.errorMessage);
  const errorEnabler = useAppSelector(
    (state) => state.errorOccured.errorOccurence
  );

  const refresh = () => {
    setPassword("")
  }

  const validationFunc = (msg: string): void => {
    dispatch(occured())
    dispatch(newErrorMsg(msg))
    setLoading(false)
    refresh()
  }

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    if (!passwordValidation(password)) {
        validationFunc("Password must be at least 5 characters")
        return;
    } else{         
        axios.patch("/api/reset-password", {
            email: localStorage.getItem("resetEmail"),
            otp: localStorage.getItem("resetToken"),
            newPassword: password,
        }, { headers: { "Authorization" : `Bearer ${localStorage.getItem("resetToken")}`} })
        .then((response) => {
            toast("Password Reset Successful")
            router.push("/Client/Auth/Login")
            setLoading(false)
        }).catch((error) => {
            console.error(error)
            validationFunc("Error Occured")
            return;
        })
    }
  };
  return (
    <div className="col">
      <Navbar />

      <div className="centered-flex-full">
        <motion.form
          onSubmit={changePassword}
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.3,
            damping: 10,
            stiffness: 100,
            type: "spring",
          }}
          className="formWidth formSpacing"
        >
         
          <Input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full max-w-lg h-14 px-4"
            placeholder="New password"
            type="password"
          />
          <div className="basic-fit">
            <FormButton buttonText="Change" addSpinner={loading}/>
          </div>
        </motion.form>
        {/* Error Message Container */}
        <div
          onClick={() => dispatch(stopped())}
          className={`inset-0 absolute h-screen py-28 ${
            errorEnabler ? "flex justify-center" : "hidden"
          }`}
        >
          <div className="w-full bg-white h-14 shadow-xl rounded-lg flex gap-6 items-center px-6 border max-w-xs iphone:max-w-60 sm:max-w-sm md:max-w-xl ">
            <p className="text-red-600">{errorIcon}</p>
            <p className="iphone:text-xs sm:text-md">{errorMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
