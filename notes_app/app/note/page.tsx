"use client";

import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";

export default function Note() {

  const router = useRouter();
  const handleLogOut = () =>{
    router.push("http://localhost:3000/")
  }

      
    return (
      <SideBar>
      <div className="h-screen p-2 flex flex-row justify-between">
        <div className="opacity-40">
          Select a Note to continue 
        </div>
        <div>
          <button className="border-2 p-2 w-full hover:opacity-50 rounded-xl font-bold " onClick={handleLogOut}><p className="inline">Log out</p></button>
        </div>

      </div>
      </SideBar>
      );
    }