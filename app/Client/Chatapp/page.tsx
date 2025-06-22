"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/redux/hooks";
import { newInformation } from "@/app/redux/Mainapp/Information";
import { useRouter } from "next/navigation";
import axios from "../utils/Utilities";
import TinySidebar from "./TinySidebar";
import Content from "./Content/Content";
import MainChatArea from "./Content/Chats/MainChatArea";

const Chatapp = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const checkForAccessToken = () => {
    axios
      .get("/api/verify-user")
      .then((response) => {
        dispatch(newInformation(response.data.payload));
      })
      .catch((error) => {
        console.error(error);
        router.push("/Client/Auth/Login");
        return;
      });
  };

  const renewAccesTokenREFRESH = () => {
    axios
      .post("/api/generate-accessToken")
      .then((response) => {
        console.log(response.data);
        return response.data.accessToken;
      })
      .catch((error) => {
        console.error(error);
        router.push("/Client/Auth/Login");
        return;
      });
  };

  const Execute = async () => {
    checkForAccessToken();
    renewAccesTokenREFRESH();
  };

  useEffect(() => {
    Execute();
  }, []);

  // Main application state management
  const [activeContent, setActiveContent] = useState<"A" | "B" | "C" | "D">(
    "A"
  );

  return (
    <main className="min-h-screen grid grid-rows-[1fr_auto] max-lg:grid-rows-1 max-lg:grid-cols-[auto_1fr]">
    {/* Main Content - Top on mobile, fills right on desktop */}
    <div className="max-lg:col-start-2 overflow-auto">
      <Content>{activeContent === "A" && <MainChatArea />}</Content>
    </div>
    
    {/* Tiny Sidebar - Bottom on mobile, left on desktop */}
    <div className="h-16 max-lg:row-start-1 max-lg:h-full max-lg:w-16">
      <TinySidebar />
    </div>
  </main>
  );
};

export default Chatapp;
