"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "./AuthContext";
import { error } from "console";

const LoginComp: React.FC<{}> = () =>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPass,setShowPass]=useState(false)
    const [wrongPass,setWrongPass]=useState(false)
    const [wrongUser,setWrongUser]=useState(false);
    
    const router = useRouter()

    const { setUserId } = useAuth();

    const toggle = () =>{
        setShowPass(!showPass);
    }
    const handleLogin = (e) =>{
        e.preventDefault()
        fetch("http://localhost:4000/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:email,password:password}),
        }).then((response)=>{
            if(response.ok){
                return response.json();
            }
            else if(response.status==400){
                throw new Error("Incorrect Password")
            }
            else{
                throw new Error("User not found")
            }
            

        })
        .then((data)=>{
            const userId = data.userId
            setUserId(userId)
            console.log("user id :",userId)
            router.push("/note");
            sessionStorage.setItem('userId', userId);
        })
        .catch((error)=>{
            if(error.message=="Incorrect Password"){
                setWrongPass(true);
                setWrongUser(false);
            }
            else{
                setWrongUser(true);
            }
        })

    }
    
    return(
        <div className="rounded-xl bg-white py-10 p-8 text-[#C6B0BC] border-2 border-[#C6B0BC]">
            <div className="text-4xl justify-center flex mb-6 font-bold ">Login</div>
            <div className="mt-8 text-lg">
                <form className="">
                {wrongUser && <div className="text-red-500 text-xs pl-1 pb-1 font-semibold">This email is not registered</div>}
                    <input className=" focus:border-sky-500 w-full text-[#8f647b] py-1 px-2 rounded mb-8 border-2 placeholder:text-[#dbccd4] focus:outline-none " placeholder="Enter your Email: " type="email" id="mail" onChange={(e)=>setEmail(e.target.value)}/><br/>

                    {wrongPass && <div className="text-red-500 text-xs pl-1 pb-1 font-semibold">Wrong Password</div>}
                    <div className="flex flex-row relative">
                    <input className="focus:border-sky-500 w-full text-[#8f647b] py-1 px-2 rounded border-2  placeholder:text-[#dbccd4] focus:outline-none "  type={showPass? "text":"password"} placeholder="Enter your Password: " id="pword" onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2" onClick={toggle}>{showPass ? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}</button>
                    <br/>
                    </div>


                    <p className="text-sm pl-4 mt-1 hover:opacity-50">Forgot password ?</p>
                </form>
            </div>
            <div className="mt-4 flex justify-center ">
                <button className="font-bold mt-4  bg-[#C6B0BC] py-2 px-10 rounded-lg text-[white] text-lg border-2 border-[#C6B0BC] hover:opacity-50" onClick={handleLogin}>Log in</button>
            </div>
            <div className="mt-4 flex text-sm justify-center">
                <button onClick={()=>{router.push("http://localhost:3000/signup")}}>Dont have an account ?</button>
            </div>
        </div>
    
    )
}
export default LoginComp;