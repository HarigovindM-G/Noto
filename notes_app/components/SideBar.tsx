"use client";

import SideBarItem from "./SideBarItem";
import { IoAddSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Note } from "@/data";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

interface SideBarProps{
    children:React.ReactNode;
}

const SideBar: React.FC<SideBarProps>=({children})=>{

    const router=useRouter()
    const [notes,setNotes]=useState<Note[]>([]);
    const { userId, setUserId } = useAuth();


    const fetchNotes = () => {
        fetch(`http://localhost:4000/notes?userId=${userId}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userId}`,
            }

        })
            .then(response => response.json())
            .then(data => {
                setNotes(data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    useEffect(()=>{  
        const storedUserId = sessionStorage.getItem('userId');
        if (!storedUserId && userId) {
            sessionStorage.setItem('userId', userId);
        } else if (!userId) {
            setUserId(storedUserId);
        }
        
    },[userId,setUserId]); 

    useEffect(()=>{
        fetchNotes();
    })



    const clickHandler = () =>{
        const noteId= uuidv4();
        const newNote: Note ={
                _id: noteId,
                title:`Untitled Note`,
                preview:"Add notes",
                userId:userId,

            }
        setNotes([...notes,newNote])
        
        fetch("http://localhost:4000/notes",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(newNote)
        }).then(()=>{
            console.log("Data added")
        }).catch(error => {
            console.error(error)
        })
        
        
        
    }

const del = (_id:string) =>{
    fetch(`http://localhost:4000/notes/${_id}`,{
        method:"DELETE"
    })
    const updatedNotes= notes.filter((note)=>note._id!==_id);
    setNotes(updatedNotes);
    
}
    return(
        <div className="flex h-screen scroll text-[#C6B0BC]">
                <div
                className="
                    flex
                    flex-col
                    h-full
                    w-[200px]
                    border-r-2
                    border-[#C6B0BC]
                ">
                    <div className="
                        flex
                        flex-col
                        h-full

                    ">
                        <div className="p-2 flex justify-between items-center border-b-2 border-[#C6B0BC]">
                            <div>
                            List of notes
                            </div>
                            <div>
                                <button onClick={clickHandler}>
                                <IoAddSharp size={20}/>
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            {notes.map((item)=>(
                                <SideBarItem 
                                    _id={item._id}
                                    title={item.title}
                                    created_on={item.created_on}
                                    preview={item.preview} 
                                    del={del}           
                                />
                            ))}
                            
                        </div>
                    </div>
                </div>
                
            <main className="p-2 w-full">
                {children}
            </main>
       </div>
    );
}

export default SideBar