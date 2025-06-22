"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "../../utils/Utilities";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { occured, stopped } from "@/app/redux/Authentication/Error";
import { errorIcon } from "@/app/Icons/Icons";
import { newErrorMsg } from "@/app/redux/Authentication/ErrorMessage";
import Spinner from "../../utils/Spinner";

const page = () => {
  // Important variables
  const dispatch = useAppDispatch();
  const errorMsg = useAppSelector((state) => state.errorMsg.errorMessage);
  const errorEnabler = useAppSelector(
    (state) => state.errorOccured.errorOccurence
  );

  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const emailStored = localStorage.getItem("resetEmail");

    if (!emailStored) {
      router.push("/Client/Auth/Login");
      return;
    } else {
      setLoading(false);
    }
  }, []);

  const verifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setVerifying(true);
    const emailStored = localStorage.getItem("resetEmail");
    console.log(emailStored)
    const parsedOTP = parseInt(otp);
    if (otp.length < 6 || isNaN(parsedOTP)) {
      dispatch(occured());
      dispatch(newErrorMsg("Invalid OTP"));
      setVerifying(false);
      return;
    }
    axios
      .post("/api/verify-reset-otp", {
        email: emailStored,
        otp: otp,
      })
      .then((response) => {
        
        router.push("/Client/Auth/Newpassword");
        setVerifying(false);
        setOtp("")
        localStorage.setItem("resetToken", response.data.resetToken)
        return;
      })
      .catch((error) => {
        console.error(error);
        if (error?.response.status === 400) {
            dispatch(occured());
            dispatch(newErrorMsg("Invalid OTP or OTP has expired"));
            setVerifying(false)
            setOtp("")
            return;
        }
        setVerifying(false);
        setOtp("")
        return;
      });
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="centered-flex-full">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={verifyOTP} className="col">
          <div className="centered-flex h-[90vh] flex-col gap-10">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              pattern="[0-9]*" // Only allow numbers
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <div className="basic-fit centered flex centered-flex">
              {!verifying ? (
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.09,
                    filter: "brightness(95%)",
                    cursor: "pointer",
                  }}
                  whileTap={{ scale: 0.9, filter: "brightness(90%)" }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                  }}
                  className="bg-blue-500 text-white font-extrabold rounded-md shadow-xl px-3 py-2"
                >
                  Submit OTP
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.09,
                    filter: "brightness(95%)",
                    cursor: "pointer",
                  }}
                  whileTap={{ scale: 0.9, filter: "brightness(90%)" }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                  }}
                  className="bg-blue-500 text-white font-extrabold rounded-md shadow-xl px-6 py-2 centered-flex gap-8"
                >
                  Verifying OTP
                  <Spinner />
                </motion.button>
              )}
            </div>
          </div>
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
        </form>
      )}
    </>
  );
};

export default page;
