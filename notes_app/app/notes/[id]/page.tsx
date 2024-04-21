"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import Router from "next/router";
import SideBar from "@/components/SideBar";

export default function Notes() {
  const pathname = usePathname();
  const _id = pathname.split("/")[2];
  const [note,setNote]= useState("");
  // const [prev,setPrev]= useState("");
 
  const router = useRouter();
  const handleLogOut = () =>{
    router.push("http://localhost:3000/")
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSave = () =>{
    const firstTwentyChars = note.substring(0, 20);
    const newLineIndex = note.indexOf("\n");
    const nextTwentyChars = newLineIndex !== -1 ? note.substring(newLineIndex + 1, newLineIndex + 21) : note.substring(20, 40);

    fetch(`http://localhost:4000/notes/${_id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({title:firstTwentyChars,preview:nextTwentyChars+'...',data:note})
        }).then(()=>{
            console.log("Data added")
        }).catch(error => {
            console.error(error)
        })
      
      
  }

  useEffect(()=>{
    fetch(`http://localhost:4000/notes/${_id}`).then(
        response => response.json()
    ).then(
        data => {
            setNote(data.data)
    }).catch(error => {
        console.error(error)
    })
},[])


  return (
    <SideBar>
    <div className="h-screen p-2 flex flex-row ">
        <textarea 
          className="w-full h-full outline-none" 
          placeholder="Enter the Title of the note to begin with ...."
          value={note}
          onChange={handleNoteChange} 
          />
      <div className="flex flex-row gap-5 w-2/12">
        <div>
          <button className="border-2 p-2 w-full hover:opacity-50 rounded-xl font-bold" onClick={handleSave}>Save</button>
        </div>
        <div>
          <button className="border-2 p-2 w-full hover:opacity-50 rounded-xl font-bold " onClick={handleLogOut}><p className="inline">Log out</p></button>
        </div>
      </div>
    </div>
    </SideBar>
    );
  }