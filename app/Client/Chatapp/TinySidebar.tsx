import {
  aiIcon,
  settings,
  statusIcon,
  message,
  defaultProfile,
} from "@/app/Icons/Icons";
import React, { useState } from "react";

type Props = {
  onToggleSidebar: () => void;
};


const TinySidebar = ({ onToggleSidebar }: Props) => {
  return (
    <>
      
      <div
        className="bg-[#F0F2F5] h-full w-full flex
        max-lg:flex-col justify-between items-center iphone:px-6 m:px-8 md:px-10 max-lg:py-4 max-lg:px-0"
      >
        {/* Main Icons */}

        {/* Chat */}
        <div
          className={` flex iphone:gap-4 sm:gap-10 md:gap-20 max-lg:gap-0 max-lg:flex-col`}
        >
          <div className="relative chat w-fit ">
            <p
              className={`hover:bg-gray-300 hover:cursor-pointer p-2 rounded-full hover:scale-105 duration-200 `}
            >
              {message}
            </p>
            <p
              className={`bg-black h-8 w-18 absolute  rounded-full text-white font-extrabold text-[0.9rem]
            popup centered-flex z-10 bottom-18 -left-2 max-lg:top-2 max-lg:left-15`}
            >
              Chats
            </p>

            {/* Number of messages */}
            <p
              className="text-[0.6rem] text-white bg-blue-500 rounded-full absolute top-0 left-10 min-w-4 min-h-4 px-[0.2rem]
            centered-flex font-extrabold hidden "
            ></p>
          </div>

          {/* Status */}
          <div className="relative status w-fit">
            <p className="hover:bg-gray-300 hover:cursor-pointer p-2 rounded-full hover:scale-105 duration-200">
              {statusIcon}
            </p>

            {/* status */}
            <p
              className="text-[0.6rem] text-white bg-blue-500 rounded-full absolute top-0 left-10 min-w-4 min-h-4 px-[0.2rem]
            centered-flex font-extrabold hidden"
            ></p>

            <p
              className={`bg-black h-8 w-18 absolute rounded-full text-white font-extrabold text-[0.9rem]
            popup centered-flex z-10 statuspopup bottom-18 -left-2 max-lg:top-2 max-lg:left-15`}
            >
              Videos
            </p>
          </div>

          {/* Ai  */}
          <div className="relative img w-fit">
            <p className="hover:bg-gray-300 hover:cursor-pointer p-2 rounded-full hover:scale-105 duration-200">
              {aiIcon}
            </p>

            <p
              className={`bg-black h-8 w-18 absolute rounded-full text-white font-extrabold text-[0.9rem]
            popup centered-flex z-10 imgpopup bottom-18 -left-2 max-lg:top-2 max-lg:left-15`}
            >
              Ai
            </p>

            {/* Number of messages */}
            <p
              className="text-[0.6rem] text-white bg-blue-500 rounded-full absolute top-0 left-10 min-w-4 min-h-4 px-[0.2rem]
            centered-flex font-extrabold hidden"
            ></p>
          </div>
        </div>

        {/* Settings and Profile Icons */}
        <div
          className="flex iphone:gap-4 sm:gap-10 md:gap-20 max-lg:gap-0 max-lg:flex-col"
        >
          <div className="relative settings w-fit">
            <p className="hover:bg-gray-300 hover:cursor-pointer p-2 rounded-full hover:scale-105 duration-200">
              {settings}
            </p>

            <p
              className={`bg-black h-8 w-18 absolute rounded-full text-white font-extrabold text-[0.9rem]
            popup centered-flex z-10 settingspopup bottom-18 -left-2 max-lg:top-2 max-lg:left-15`}
            >
              Settings
            </p>
          </div>

          <div className="relative user">
            <p className="hover:bg-gray-300 hover:cursor-pointer p-2 rounded-full hover:scale-105 duration-200">
              {defaultProfile}
            </p>

            <p
              className={`bg-black h-8 w-18 absolute rounded-full text-white font-extrabold text-[0.9rem]
            popup centered-flex z-10 userpopup bottom-18 -left-2  max-lg:top-2 max-lg:left-15`}
            >
              Profile
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TinySidebar;
