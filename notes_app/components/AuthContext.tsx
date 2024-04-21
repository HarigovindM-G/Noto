"use client";

import React,{createContext,useContext,useState} from "react";
interface AuthContextProps{
    children:React.ReactNode;
}

const AuthContext = createContext<{
    userId: string | null ;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    userId: "",
    setUserId: () => {},
});

export const AuthProvider : React.FC<AuthContextProps>=({children})=>{
    const [userId, setUserId]= useState(null);
    return(
        <AuthContext.Provider value={{userId,setUserId}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);