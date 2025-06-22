"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation'; 
import Button from "./Button"
import { usePathname } from 'next/navigation';



const Navbar = () => {
    // Important Variables
    const router = useRouter();
    const pathname = usePathname();
    // State management for verification
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
  return (
    isLoggedIn ? null :
    <nav 
      className="flex justify-between items-center px-4 py-4 iphone:py-8 sm:px-8 sm:py-4 md:px-10 lg:px-20"
    >
        {/* Logo + name */}
        <div className="flex items-center space-x-4 iphone:space-x-2 sm:space-x-4 ">
            <img 
              src="https://img.icons8.com/m_outlined/512/228BE6/whatsapp.png"
              alt="Blue whatsapp logo"
              className="w-10 h-10 iphone:w-8 iphone:h-8 sm:w-12 sm:h-12"
            />
            <h1 className="font-extrabold text-md iphone:text-sm sm:text-xl">
                Chatapp
            </h1>
        </div>

        {/* Button */}
        <div className={`w-fit centered-flex`}>
            <Button 
              text={pathname === "/" ? "login" : "Go back"}
              routeFunc={pathname === "/" ? () => router.push("/Client/Auth/Login") : () => router.push("/")}
              includeIcon={true}
            />
        </div>
    </nav>
  )
}

export default Navbar