import ChatArea from "./components/ChatArea"
import Sidebar from "./components/Sidebar"


const MainChatArea = () => {
  return (
    <div className="w-full h-screen grid grid-cols-18 ">
       
       {/* Sidebar */}
        <Sidebar />
      

       {/* Chat Area */}
       <ChatArea />
    </div>
  )
}

export default MainChatArea