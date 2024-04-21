"use client";

import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
const SignupComp: React.FC<{}> = () =>{

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [repass,setRepass]=useState("");
    const [showPass,setShowPass]=useState(false)
    const [suc,setSuc]=useState(false);


    const toggle = () =>{
        setShowPass(!showPass);
    }
    
    const router = useRouter()
    const handleSignup = (e) =>{
        e.preventDefault()
        
        fetch("http://localhost:4000/user",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({u_name:name,email:email,password:password})
        }).then(()=>{
            console.log("user data added")
            setSuc(true)
            setTimeout(() => {
                router.push("/login");
              }, 3000); 
        }).catch((error)=>{
            console.log(error)
        })

    }
    
    
    return(
        <div className="rounded-xl bg-[white] py-8 px-10 text-[#C6B0BC] border-2 border-[#C6B0BC]">
            <div className="text-4xl justify-center flex font-bold  ">Sign up</div>
            <div className="mt-4 text-lg">
                <form className="">
                    <input className="focus:border-sky-500 w-full text-[#8f647b] py-1 px-2 rounded mt-6 border-2 placeholder:text-[#C6B0BC] focus:outline-none " placeholder="Enter your email adress: " type="email" id="uname" onChange={(e)=>setEmail(e.target.value)}/><br/>
                    <input className="focus:border-sky-500 w-full text-[#8f647b] py-1 px-2 rounded  mt-6 border-2 placeholder:text-[#C6B0BC] focus:outline-none " placeholder="Enter a username: " type="text" id="uname" onChange={(e)=>setName(e.target.value )}/><br/>


                    <div className="flex flex-row relative">
                    <input className="focus:border-sky-500 w-full text-[#8f647b] py-1 px-2 rounded mt-6 border-2  placeholder:text-[#C6B0BC] focus:outline-none "  type={showPass? "text":"password"} placeholder="Enter your Password: " id="pword" onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="button" className="absolute top-1/2 right-3 transform translate-y-0.5" onClick={toggle}>{showPass ? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}</button>
                    <br/>
                    </div>

                    {/* <input className="focus:border-sky-500 w-full text-[#8f647b] py-1 px-2 rounded mt-6 border-2  placeholder:text-[#C6B0BC] focus:outline-none "  type="password" placeholder="Re Enter your Password: " id="pword" onChange={(e)=>setRepass(e.target.value)}/><br/> */}
                </form>
            </div>
            <div className="mt-6 flex justify-center ">
                <button className=" mt-4  bg-[#C6B0BC] py-2 px-5 rounded-lg text-[white] text-xl border-2 border-[#C6B0BC] hover:opacity-50 font-bold" onClick={handleSignup}>Sign up</button>
            </div>
            <div className="mt-4 flex text-sm justify-center">
                <button onClick={()=>{router.push("http://localhost:3000/login")}}>Already have an account ?</button>
            </div>
            {suc && <div className="justify-center text-green-500">You have Succefully Signed up  , please wait while we redirect you to the login page</div>}
        </div>
    
    )
}
export default SignupComp;