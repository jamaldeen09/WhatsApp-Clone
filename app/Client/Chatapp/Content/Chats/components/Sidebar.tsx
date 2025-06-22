"use client";
import { categories } from "@/app/Client/utils/Utilities";
import {
  arrowLeft,
  ellipse,
  searchIcon,
  squaresPlus,
  userGroup,
  userGroup2,
  userPlus,
} from "@/app/Icons/Icons";
import { Input } from "@/components/ui/input";
import Categories from "./Categories";
import Person from "./Person";
import Dropdown from "./Dropdown";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {
  triggerEllipse,
  untriggerEllipse,
} from "@/app/redux/Mainapp/Dropdowns/EllipseDropdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  triggerAddSideBar,
  untriggerAddSideBar,
} from "@/app/redux/Mainapp/Sidebars/AddSidebar";
import SidebarPerson from "./SidebarPerson";
import {
  triggerNewGroup,
  untriggerNewGroup,
} from "@/app/redux/Mainapp/Sidebars/Newgroup";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);

  // Ellipse Dropdown
  const ellipseDropdown = selector.ellipse.ellpiseDropdown;

  // SideBar Triggers
  const mainSidebar = selector.sidebarAdd.addSidebar;
  const newGroupSidebar = selector.newGroupAdd.newGroup;
  return (
    <>
      {/* Desktop */}

      <div
        className="max-lg:col-span-6 lg:col-span-5 sm:hidden max-lg:flex bg-white border-gray-400 border-2 flex-col
        overflow-auto relative"
      >
        {/* Header */}
        <div className="w-full flex justify-between px-3 py-4 items-center">
          <h1 className="font-extrabold text-blue-500 text-2xl">Chatapp</h1>

          <div className="flex items-center gap-2 lg:gap-4 ">
            <p
              onClick={() => dispatch(triggerAddSideBar())}
              className={`hover:bg-gray-300 hover:cursor-pointer p-1 rounded-full duration-200 
             active:scale-90 ${
               mainSidebar
                 ? "bg-gray-300 hover:scale-105 hover:bg-gray-300"
                 : "bg-transparent"
             }`}
            >
              {squaresPlus}
            </p>
            <div className="relative">
              <p
                onClick={() => dispatch(triggerEllipse())}
                className={`hover:cursor-pointer p-1 rounded-full hover:scale-105 duration-200 
               active:scale-90 ${
                 ellipseDropdown
                   ? "bg-gray-300"
                   : "bg-transparent hover:bg-gray-300"
               }`}
              >
                {ellipse}
              </p>
            </div>

            {/* Side Bar For adding new contact and new group */}

            <AnimatePresence>
              {mainSidebar && (
                <>
                  {/* Sidebar */}
                  <motion.div
                    key="sidebar"
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100vw" }}
                    transition={{ duration: 0.2 }}
                    className="inset-0 absolute bg-white shadow-xl z-10
                    overflow-hidden
                    flex flex-col gap-4"
                  >
                    {/* Header */}
                    <div className="w-full flex items-center gap-4 p-4">
                      <p
                        onClick={() => dispatch(untriggerAddSideBar())}
                        className="hover:bg-gray-300 
                        hover:cursor-pointer hover:scale-105 rounded-full p-2 hover:brightness-90
                        transition-all duration-300
                        "
                      >
                        {arrowLeft}
                      </p>
                      <p>New Chat</p>
                    </div>

                    {/* Main Search bar */}
                    <div className="w-full">
                      {/* Input Field */}
                      <div className="w-full relative px-4">
                        <Input
                          className="w-full bg-gray-100 rounded-full h-12 px-20"
                          placeholder="Search for someone"
                          type="text"
                        />
                        <p className="absolute top-3 left-12 text-gray-500">
                          {searchIcon}
                        </p>
                      </div>
                    </div>
                    {/* Main Add */}

                    <div className="w-full h-fit p-2 flex flex-col">
                      {/* Add new group */}

                      <div
                        onClick={() => dispatch(triggerNewGroup())}
                        className="flex items-center gap-6 hover:bg-gray-300 transition-all p-4 rounded-lg hover:cursor-pointer"
                      >
                        <motion.button
                          className="bg-blue-500 text-white font-extrabold
                          rounded-full p-2"
                        >
                          {userGroup2}
                        </motion.button>
                        <p className="text-lg">New Group</p>
                      </div>

                      {/* Add new contact */}
                      <div className="flex items-center gap-6 hover:bg-gray-300 transition-all p-4 rounded-lg hover:cursor-pointer">
                        <motion.button
                          className="bg-blue-500 text-white font-extrabold
                          rounded-full p-2"
                        >
                          {userPlus}
                        </motion.button>
                        <p className="text-lg">New Contact</p>
                      </div>
                    </div>

                    {/* All contacts */}
                    <div className="h-full px-6 overflow-y-auto overflow-x-hidden">
                      <SidebarPerson />
                    </div>

                    {/* New Group Sidebar */}
                    <AnimatePresence>
                      {newGroupSidebar && (
                        <motion.div
                          key="sidebar"
                          initial={{ x: "-100vw" }}
                          animate={{ x: 0 }}
                          exit={{ x: "-100vw" }}
                          transition={{ duration: 0.2 }}
                          className="inset-0 absolute bg-white shadow-xl z-20
                          overflow-hidden
                          "
                        >
                          {/* Header */}
                          <div className="w-full flex items-center gap-4 p-4">
                            <p
                              onClick={() => dispatch(untriggerNewGroup())}
                              className="hover:bg-gray-300 
                        hover:cursor-pointer hover:scale-105 rounded-full p-2 hover:brightness-90
                        transition-all duration-300
                        "
                            >
                              {arrowLeft}
                            </p>
                            <p>Add Group Members</p>
                          </div>

                          {/* Main Body */}
                          <div className="w-full px-2 flex flex-col gap-6">
                            {/* Search area */}
                            <input
                              placeholder="Search by name"
                              className="border-b border-gray-500 w-full focus:outline-none p-2"
                            />

                            {/* Display area */}
                            <div className="flex flex-col">
                              <SidebarPerson showTick={true} />
                              <SidebarPerson showTick={true} />
                            </div>

                            
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* New Contact Sidebar */}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full px-3 flex flex-col gap-4">
          <div className="w-full relative ">
            <Input
              className="w-full bg-gray-100 rounded-full h-12 px-12"
              placeholder="Search for someone"
              type="text"
            />
            <p className="absolute top-3 left-4 text-gray-500">{searchIcon}</p>
          </div>

          {/* Categories */}
          <div className="flex gap-4 flex-wrap lg:flex-nowrap py-2">
            {categories.map((category: string, index: number) => {
              return <Categories category={category} key={index} />;
            })}
          </div>

          {/* A */}
        </div>

        {/* People */}
        <div className="w-full h-full px-2 py-6 overflow-y-auto">
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
        </div>
      </div>

      {/* Dropdown */}
      <div
        onClick={() => dispatch(untriggerEllipse())}
        className={`inset-0 w-full absolute
                ${ellipseDropdown ? "flex" : "hidden"} flex-col `}
      >
        <div className="w-full  h-fit relative grid grid-cols-9 py-18">
          <div className=""></div>
          <div className=""></div>

          <Dropdown />

          <div className=""></div>
          <div className=""></div>
        </div>
      </div>

      {/* Mobile */}
      <div className="col-span-28 max-lg:hidden">Sidebar</div>
    </>
  );
};

export default Sidebar;
