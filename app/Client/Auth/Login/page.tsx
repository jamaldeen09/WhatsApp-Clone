import LoginForm from "./LoginForm"
import Navbar from "../../components/Navbar"


const page = () => {
  return (
    <div className="flex flex-col h-screen">

            {/* Navbar */}
            <Navbar/>

            {/* Form Container */}
        <div className="h-full centered-flex w-full">
            <LoginForm />
        </div>
    </div>
  )
}

export default page