"use client"
import React from "react";
import Navbar from "../../components/Navbar";
import ForgotPass from "./ForgotPass";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { stopped } from "@/app/redux/Authentication/Error";
import { errorIcon } from "@/app/Icons/Icons";

const page = () => {
  // Important variables
  const dispatch = useAppDispatch();
  const errorMsg = useAppSelector((state) => state.errorMsg.errorMessage);
  const errorEnabler = useAppSelector(
    (state) => state.errorOccured.errorOccurence
  );
  return (
    <div className="basic border col">

      {/* Navbar */}
      <Navbar />

      {/* Forgot password component */}
      <div className="centered-flex-full">
          <ForgotPass />
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
    </div>
  );
};

export default page;
